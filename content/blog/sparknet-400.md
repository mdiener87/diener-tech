---
title: "SparkNet 400"
description: "Scaling the SparkNet Model"
date: "2026-4-04"
category: "technology"
tags:
  [
    "ai",
    "machine learning",
    "dgx spark",
    "home lab",
    "llm",
    "sparknet",
    "llama",
  ]
titleImage: ""
featured: true
---

## Size Does Matter

My prior post, [The One Billion Token Challenge](one-billion-token-challenge.md), introduced the SparkNet series of SLMs (small language models). SparkNet 70m represents my first go at training language models from scratch. The final iteration, Sparknet 70m v5, scored impressively well. It nearly tied the best result from CodeLion[link], an AI researcher whom devised the post's namesake challenge. Despite the efficacy of the final iteration in training, a 70m parameter model is inherently limited. For my next iteration of SparkNet models, I wanted to follow in the footsteps of the AI industry and scale up to a larger model!

The desire for scale has led to SparkNet 400m v1. It features modern advancements in language model architecture, and will have almost four times as many parameters as the Sparknet 70m model! However, there are challenges when scaling up model sizes: model training effort does not scale linearly with a model's parameters. Increasing the number of parameters inherently increases the number of computations required for each training pass. Those additional parameters will also require additional training tokens, compared to a smaller model. More computations x more tokens = an exponential increase in training effort!

The (Chinchila Ratio)[https://mbrenndoerfer.com/writing/chinchilla-scaling-laws-compute-optimal-llm-training], devised by the namesame LLM model from Google Deepmind, states that a model will need ~20x its parameter count in training tokens, as its optimal training budget target. Following this rule, SparkNet 70m model had an optimal training target of around 1.4bil tokens, and probably left some gains on the table in the name of following the strict training budget rules. 

That strict training budget also helped enable a fast training cadence - My DGX Spark was able to complete a training run in ~13 hours. I could leave it running overnight, and evaluate the results the next day!

SparkNet 400m, meanwhile, will require at least *8 billion* tokens to reach the Chinchila Ratio. This is a massive jump in project complexity - one I did not fully appreciate when I set out on this scaling journey.

I trained Sparknet 400m was to two checkpoints: the first to 6 billion tokens, and the final iteration to a full 10 billion tokens. The full 10bn checkpointed amounted to three weeks of effort! 

## Designing the Training Environment

As I began work on SparkNet 400m, the prior lessons from the One Billion Challenge loomed large. To wit, the initial design of the datasets and tokenizer are *instrumental* to the quality of the final model. With this in mind, I focused on strongly optimizing these two qualities before any training began.

SparkNet 400m made use of the following datasets:

| Data source | % of total |
|---|---:|
| codelion/fineweb-edu-1B | 52% |
| codelion/dclm-baseline-1B | 22% |
| codelion/finepdfs-1B | 12% |
| eli5 | 13% |
| data/diener_blog.jsonl | 1% |

I once again made heavy use of CodeLion's high-quality training datasets. I also sprinkled in a fair portion of the ELI5 (Explain Like I'm 5) dataset. I also included an up-to-date copy of my blog posts, adding a small personal touch.

With the data sources sourced, I worked on building a new tokenizer for the project. Tokenizer quality is truly *critical* - it is the bridge between the world of language, and the model's inner world of hyper-dimensional learnings. SparkNet 70m v5 made use of a custom [GPT-2-style BPE tokenizer](https://huggingface.co/learn/llm-course/chapter6/5). For SparkNet 400m, I wanted to modernize everything to the latest and greatest in LLM development. That meant switching to a [SentencePiece Unigram](https://github.com/google/sentencepiece) tokenizer. 

The SentencePiece Unigram is a fascinating mathematical project to determine the optimal way to break a corpus of text into an optimized tokenizer. This is a far more modern apporach than that of the GPT-2 era BPE tokenizer used in SparkNet 70m. However, when I compared the two tokenizers head to head, the original Sparknet 70m v5 tokenizer came within 99% of the efficacy of the new v6 tokenizer. This demonstrates how good BPE tokenization is for smaller datasets! 

[if it ain't broke - don't fix it]

## Smoketesting and Performance Bencharmks

Given the long expected training time for SparkNet 400m, I first ran several 'smoketest' script runs to ensure initial training stability. These ran succesfully, revealing no problems with the training script or the DGX Spark's sustained performance. I then ran a series of benchmark scripts overnight, seeking to find the optimal combination of grad checkpointing, batch size, and gradient accumulation training arguments. This table demonstrates the combination of these arguments, and how the Spark's throughput changed with each combination:


| Configuration | Grad Checkpointing | Batch Size | Grad Accum | Throughput (tok/s) | 
|---|---|---|---|---|---|
| Test 1 | On | 8 | 64 | ~6,157 | 
| Test 2 | Off | 8 | 64 | ~7,770 | 
| Test 3 | Off | 16 | 32 | ~5,916 |
| Test 4 | Off | 32 | 16 | ~7,942 |

Gradient checkpointing is often enabled in training runs, as it saves a good deal of memory. The DGX Spark has a ton of memory, but its tepid memory bandwidth proves the limiting factor. By disabling gradient accumulation, the Spark can trade more memory stored for less calculation overhead, eeking out a few hundred extra tokens per second! When racing towards 10 billion, every incremental advantage helps. The optimal configuration proved ~29% faster than the first test case!


## Hurry Up and Wait

With the script optimized and tested, it was time to let it rip. The DGX Spark was officially off to the races! With 10billion training tokens to process, there wasn't much to do besides let it do its thing.

Or was there?

As it turns out, the shift from 'hours long' training projects to 'weeks long' training projects introduces new concerns. Power stability, for instance! With my home office setup already pushing the limits of a 15A circuit, it should have been no surprise that power stability would become an issue. While the circuit breaker held steady, my large 'power tower' power strip did not. Not just once - but twice! - during the training run would I trip an internal breaker on that power tower, causing the DGX Spark (among other equipment) to lose power.

Luckily, the training script features regular checkpointing. In each circumstance, it was possible to resume from a prior checkpoint. Even with this safety net, these power loss events represent a real loss of training throughput. It also highlighted how the perspective of infrastructure shifts as one extends the time horizon under consideration: 100% power uptime for 13 hours is a very different question than 100% power uptime for 3 weeks! 

These events have made me interested in investing in a UPS battery system for my DGX Spark and networking equipment. An expense I have not yet pulled the trigger on, but one well worth considering as these longer operations become a more frequest use case.


## Oh Yea and There Was DRAMA

An additional complication occured during this training run: I was abrupty laid off. 

A decade into my career as a software engineer, and I finally hit my first layoff. It seems to be an inevitably to anyone in this career. Or really any career in America. I suspected it was coming for some time, but was unable to secure a job offer elsewhere in time to avoid the axe. Being laid off in a cold and abrupt manner was shocking. Painful. Dehumanizing (or at least, de-Americanizing). It made me question whether I had hit my limits as a software engineer. Perhaps the combination of offshoring and AI had finally pulled ahead of my own contributions.

Luckily (and somewhat ironically), I found a new and far more exciting role shortly after the layoff occured. My career - and ego! - were once again safe. Still, it represented a scary and sobering moment, and the new normal of 2026 has been slow to emerge. My work on DienerTech has had to take a backseat to job searching and role starting. The final writeup of SparkNet 400m v1 would take much more time than the training run itself would require. 

## Across the Finish Line

Sparknet 400m v1 did succesfully complete its training run. 

## The Chatbot Future

SFT Training summary, failures, and the plan to make a 'SparkChat' chatbot from a SparkNet SLM model

Tie this into Sparknet 400m v2 training run, now in progress.

==



Here’s a clean summary based on the 400m logs and scripts (no 70m data). I did not find any saved tokenizer comparison output in logs, so I’m summarizing the comparison setup from the script.

Tokenizer v6 vs v5 comparison

Script: eval_tokenizer.py
What it does: compares SparkNet v5 (custom GPT‑2 BPE) vs SparkNet v6 (SentencePiece Unigram) vs stock GPT‑2 over 10,000 streaming samples from codelion/fineweb-edu-100M, reporting mean/median/p90 token lengths and compression ratios (v5/GPT‑2, v6/GPT‑2, v6/v5).
Evidence: no tokenizer comparison results were logged under logs/, so no numeric outcomes are available to summarize from recorded runs.
Throughput benchmarks (train_throughput_test)
Source: run_throughput_tests.sh and logs in logs/.
Common setup: target_tokens=80,000,000, tokens/step=524,288, dataset sparknet-v6-pretrain (9 shards, 4,394,538 rows).

tput_gc_on_b8x64.log: GC on, batch=8, grad_accum=64 → ~6,157 tok/s (train_loss 7.2667).
tput_gc_off_b8x64.log: GC off, batch=8, grad_accum=64 → ~7,770 tok/s (train_loss 7.2722).
tput_gc_off_b16x32.log: GC off, batch=16, grad_accum=32 → ~5,916 tok/s (train_loss 7.2631).
tput_gc_off_b32x16.log: GC off, batch=32, grad_accum=16 → ~7,942 tok/s (train_loss 7.2833).
Notes:

Disabling grad checkpointing (GC off) at 8x64 improves throughput by ~26% vs GC on (~6.16k → ~7.77k tok/s).
Best throughput in these tests is GC off with 32x16 (~7.94k tok/s).
Pretraining runs (400m, v6 tokenizer/data)

train.log: pretrain on sparknet-v6-pretrain (9 shards, 4,394,538 rows), eval rows=261; target_tokens=6B, tokens/step=524,288, max_steps=11,445; resume at checkpoint‑2500. (No further metrics logged in this file.)
train.log: same data/budget; resume from checkpoint‑2500. Loss trends 3.69 → 3.47 (steps ~2,550 → 4,200). Eval loss around 4.04 → 3.92 (epochs 0.32 → 0.47). Logged throughput declines from ~414k tok/s early to ~20k tok/s by step ~4,200.
train.log: larger pretrain set (17 shards, 8,300,794 rows), target_tokens=10B, tokens/step=524,288, max_steps=19,074; resumed from checkpoint‑11,445. Eval loss ~3.91–3.93 across epochs 0.71–0.80. Throughput logs show very high initial spikes (up to ~17.5M tok/s at step 11,450) then settling down into the 65k–300k tok/s range; treat the early spikes as outliers.
Instruction-tuning runs

train.log: sft_chat_v1 (4 shards, 195,316 rows), target_tokens=200M, tokens/step=131,072, max_steps=1,526. Throughput ~8.0k tok/s. Loss 2.49 → 1.55; final train_loss 1.759.
train.log: sft_chat_v2 (4 shards, 195,316 rows), same budget/steps. Throughput ~7.3k tok/s. Loss 2.35 → 1.45; final train_loss 1.663.
train.log: sft_chat_v3 (4 shards, 195,316 rows), target_tokens=50M, max_steps=382. Throughput ~8.0k tok/s (approx). Loss 2.38 → 2.05; final train_loss 2.118 (epoch 0.25).
If you want, I can run the tokenizer comparison script to produce the v6 vs v5 stats and append them to this summary.