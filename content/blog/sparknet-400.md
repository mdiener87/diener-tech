---
title: "SparkNet 400"
description: "Scaling the SparkNet Model"
date: "2026-1-19"
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

My prior post, [The One Billion Token Challenge](one-billion-token-challenge.md), introduced the SparkNet series of SLMs (small language models). SparkNet 70m represents my first go at training language models from scratch. The final iteration, Sparknet 70m v5, scored impressively well. It nearly tied the best result from CodeLion, an AI researcher whom devised the post's namesake challenge. Despite the efficacy of the final iteration in training, a 70m parameter model is inherently limited. No matter how well you train it, no matter the quality of your dataset to feed it - 70 million parameters can only take you so far. It's time to scale Sparknet up!

The desire to scale has led to the development of SparkNet 400m v1. This model has almost four times as many parameters as the Sparknet 70m model! Model training time does not scale linearly with a model's parameters. Going from 70m to 400m is not a simple ~4x increase in time. The larger neural net will require many more tokens to effectively train it. The rule of thumb is that a model will need 20x the parameter count as its training tokens target [name, link].

SparkNet 70m would have an optimal training target of around 1.4bil tokens (the One Billion Token Challenge, therefore, might have left additional model learning room on the table). SparkNet 400m, meanwhile, will require at least *8 billion* tokens to fully converge. To make matters even worse - all of those extra tensor parameters will mean more work to do per training loop. Model scaling therefore works like surface area: more parameters * more tokens = exponential time increase.

Sparknet 400 was trained to two checkpoints: one at 6 billion tokens, and the final iteration to a full 10 billion tokens. SparkNet 70m benefited from fast iteration speed - my DGX Spark was able to complete that training loop in around 13 hours. SparkNet 400m, by contrast, would require far more time to complete. I began training work on this this project December 13th, and it took until January 4th for all training work to complete. This amounted to three weeks of effort. Not all of this was pure training throughput; failures, delays, and scope creep were all part of the process. 

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

With the data sources sourced, I worked on building a new tokenizer for the project. Tokenizer quality is truly *critical* - it is the bridge between the world of language, and the model's inner world of hyper-dimensional learnings. SparkNet 70m v5 made use of a custom [GPT-2-style BPE tokenizer](link). For SparkNet 400m, I wanted to modernize everything to the latest and greatest in LLM development. That meant switching to a [SentencePiece Unigram](link) tokenizer. 

The SentencePiece Unigram is a fascinating mathematical project to determine the optimal way to break a corpus of text into an optimized tokenizer. This is far more modern that the BPE tokenizer used in SparkNet 70m. However, when I compared the two tokenizers head to head, the original Sparknet 70m v5 tokenizer came within 99% of the efficacy of the new v6 tokenizer. This demonstrates how good BPE tokenization is for smaller datasets!

## Smoketesting and Performance Bencharmks

Given the long expected training time for SparkNet 400m, I first ran several 'smoketest' script runs to ensure initial training stability. These ran succesfully, revealing no problems with the training script or the DGX Spark's sustained performance. I then ran a series of benchmark scripts overnight, seeking to find the optimal combination of grad checkpointing, batch size, and gradient accumulation training arguments. This table demonstrates the combination of these arguments, and how the Spark's throughput changed with each combination:


| Configuration | Grad Checkpointing | Batch Size | Grad Accum | Throughput (tok/s) | 
|---|---|---|---|---|---|
| Test 1 | On | 8 | 64 | ~6,157 | 
| Test 2 | Off | 8 | 64 | ~7,770 | 
| Test 3 | Off | 16 | 32 | ~5,916 |
| Test 4 | Off | 32 | 16 | ~7,942 |



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