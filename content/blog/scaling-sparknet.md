---
title: "Scaling SparkNet"
description: "SparkNet 70M Trained Overnight. SparkNet 400M Took Weeks - and Broke My Power Strip"
date: "2026-04-04"
category: "technology"
tags:
  [
    "ai",
    "machine learning",
    "dgx spark",
    "home lab",
    "llm",
    "sparknet",
    "career",
  ]
titleImage: "scaling-sparknet.webp"
featured: true
---

## More Parameters, More Problems

My prior post, [The One Billion Token Challenge](one-billion-token-challenge.md), introduced the SparkNet series of language models. The final iteration, SparkNet 70m v5, scored impressively well! It nearly tied the best result from CodeLion (Asankhaya Sharma), who devised the post's namesake challenge. For my next iteration of SparkNet models, I wanted to follow in the footsteps of the AI industry and scale up to a larger model!

The desire for scale has led to **SparkNet 400m v1**. There are significant challenges when scaling up model sizes: model training effort doesn’t scale linearly - it compounds across both compute and data requirements. More compute x more tokens = much more effort!

The [Chinchilla Ratio](https://mbrenndoerfer.com/writing/chinchilla-scaling-laws-compute-optimal-llm-training), coined by its namesake LLM model from Google Deepmind, states that a model's optimal training token count is equal to ~20x its parameter count (optimal here is defined by cost efficiency, not maximal performance). Following this rule, SparkNet 70m model had an optimal training target of around 1.4bil tokens, and left some gains on the table in the name of following the strict training budget rules. 

<BlogImage
  src="pump-those-numbers-up.webp"
  alt="This is all an overly elaborate scheme to justify buying more DGX Sparks"
  max-height="300px">
</BlogImage>

That strict training budget also helped enable a fast training cadence - My DGX Spark was able to complete a training run in ~13 hours. I could leave it running overnight, and evaluate the results the next day!

SparkNet 400m, meanwhile, will require at least *8 billion* tokens to reach the Chinchilla Ratio. This is a massive jump in project complexity - one I did not fully appreciate when I set out on this scaling journey.

I trained SparkNet 400m v1 to two checkpoints: first to 6 billion tokens, and then a second iteration to a full 10 billion tokens. This represents -2bn/+2bn tokens from the Chinchilla ratio, respectively. This took several weeks of training effort to complete.

## Designing the Training Environment

As I began work on SparkNet 400m, the prior lessons from the One Billion Challenge loomed large. To wit, the initial design of the datasets and tokenizer are *instrumental* to the quality of the final model. With this in mind, I focused on strongly optimizing these two qualities before any training began.

SparkNet 400m made use of the following datasets:

| Data source | % of total |
|---|---:|
| codelion/fineweb-edu-1B | 52% |
| codelion/dclm-baseline-1B | 22% |
| codelion/finepdfs-1B | 12% |
| ELI5 | 13% |
| data/diener_blog.jsonl | 1% |

With the data sources sourced, I worked on building a new tokenizer for the project. Tokenizer quality is truly *critical* - it is the bridge between the world of language, and the model's inner world of hyper-dimensional learnings. SparkNet 70m v5 made use of a custom [GPT-2-style BPE tokenizer](https://huggingface.co/learn/llm-course/chapter6/5). For SparkNet 400m, I wanted to modernize everything to the latest and greatest in LLM development. That meant switching to a [SentencePiece Unigram](https://github.com/google/sentencepiece) tokenizer. 

SentencePiece Unigram is a fascinating mathematical project to determine the optimal way to break a corpus of text into a tokenizer. This is a far more modern approach than that of the GPT-2 era BPE tokenizer used in SparkNet 70m. However, when I compared the two tokenizers head to head, the original SparkNet 70m v5 tokenizer came within 99% of the efficacy of the new v6 tokenizer. While the v6 Unigram tokenizer did not prove to have any efficiency gains, it was still a worthwhile exploration of new tokenizer techniques. BPE tokenization is still excellent for smaller datasets!

<BlogImage
  src="same-picture.webp"
  alt="We need the Office back to address the era of corporate AI"
  max-height="500px">
</BlogImage>


## Smoke-testing and Performance Benchmarks

Given the long expected training time for SparkNet 400m, I first ran several 'smoke-test' script runs to ensure initial training stability. These ran successfully, revealing no problems with the training script or the DGX Spark's sustained performance. I then ran a series of benchmark scripts overnight, seeking to find the optimal combination of grad checkpointing, batch size, and gradient accumulation training arguments. This table demonstrates the combination of these arguments, and how the Spark's throughput changed with each combination:


| Configuration | Grad Checkpointing | Batch Size | Grad Accum | Throughput (tok/s) |
|---------------|--------------------|-----------:|-----------:|-------------------:|
| Test 1        | On                 | 8          | 64         | ~6,157             |
| Test 2        | Off                | 8          | 64         | ~7,770             |
| Test 3        | Off                | 16         | 32         | ~5,916             |
| Test 4        | Off                | 32         | 16         | ~7,942             |

Gradient checkpointing is often enabled in training runs, as it reduces memory use. The DGX Spark has a ton of memory, but it lacks in memory bandwidth. By disabling gradient accumulation, the Spark can trade more memory utilization for less calculation overhead, eeking out a few hundred extra tokens per second! When racing towards 10 billion tokens, every incremental advantage helps!


## Hurry Up and Wait

With the script optimized and tested, it was time to let it rip. With a few dramatic flourishes across a [tmux shell](https://github.com/tmux/tmux/wiki), The full training run began! With 6 (and later 10) billion training tokens to process, there wasn't much to do but wait.

Or was there?

As it turns out, the shift from hours long training projects to weeks long training projects introduces new concerns. Stable electricity, for instance! My home office setup already pushes the limits of a 15A circuit, and so it should have been no surprise that power stability would become an issue. While the home circuit breaker held steady, my large 'power tower' style power strip did not. Not just once - but twice! - during the training run would an internal breaker trip on that power tower, causing the DGX Spark (among other equipment) to lose power.

*Following the old adage of 'fool me twice', the offending power tower has been replaced.*

Luckily, the training script features regular checkpointing, preventing catastrophic data loss. In each circumstance, I was able to resume from the latest checkpoint. Even with this safety net, these power loss events represented a real loss of training throughput.

This highlighted how the perspective of infrastructure shifts as time horizon expands: 100% power uptime for 13 hours is a *very* different question than 100% power uptime for 3 weeks! 

<BlogImage
  src="some-form-of-electricity.webp"
  alt="At least until my breaker gives up"
  max-height="300px">
</BlogImage>


## Oh Yea and There Was DRAMA

An additional complication occurred during this training run: I was abruptly laid off. 

<BlogImage
  src="thats-all-folks.webp"
  alt="It's a good thing this isn't a gif, or you'd see my career falling right off a cliff"
  max-height="300px">
</BlogImage>

I'm now over a decade into my software engineering career, and I (finally? inevitably?) hit my first layoff. I had suspected it was coming for some time, but I was unable to land a job offer elsewhere in time to avoid the axe. Being laid off in a cold and abrupt manner was... Shocking. Painful. Dehumanizing (or at least, de-Americanizing). I was deeply concerned that between offshoring and generative AI, there would no longer be a seat for me in this industry.

I need not have feared. As it turns out, I quickly found a new and *far more exciting* role at TaxCloud! My engineering career - and engineering ego - were once again safe. Still, it represented a scary and sobering moment; the things we take for granted in life can change abruptly. My work on DienerTech had to take a backseat, as finding a new normal in 2026 took some time. The final writeup of SparkNet 400m v1 would, ironically, take much longer to complete than the training run itself!

## Across the Finish Line

Here's the part you've been waiting for! Despite complications in power (and author) reliability, SparkNet 400m v1 did complete its training run. SparkNet 70m was previously evaluated against the wikitext dataset, alongside GPT-2 and CodeLion's best 70m model. Here's how the 400m v1 model stacks up against the same competition:

 
| Model                |    Loss |   Perplexity |
| -------------------- | ------: | -----------: |
| SparkNet 70M v5      |  5.1489 |     172.2377 |
| CodeLion GPT-2 70M   |  5.0129 |     150.3469 |
| SparkNet 400M v1 6b  |  4.0147 |      55.4069 |
| SparkNet 400M v1 10b |  4.0147 |      55.4069 |
| GPT-2                |  3.9407 |      51.4545 |

*For a deeper dive into Loss and Perplexity, check out my prior post that analyzes the (training and evaluation of SparkNet 70m)[one-billion-token-challenge#sparknet-v1]*


Compared to the 70m v5 checkpoint, the 400m v1 SparkNet represents a massive improvement in Perplexity! With a score of 55.4069, it has now come within a handful of points to the original GPT-2 quality! Interestingly, the 6b and 10b checkpoints scored *identically* on the wikitext perplexity test, which is... not right. More on that point in a bit.

The Tensorboard logs for this long run are also interesting. Most of the graphs continued smoothly on the expanded 10b run, but others, such as learning rate, featured a surprising jump.

<BlogImage
  src="Tensorboard-1.webp"
  alt="Eval/loss is nice and smooth, even after continuation"
  max-height="400px">
</BlogImage>


<BlogImage
  src="Tensorboard-2.webp"
  alt="Learning rate spike on resume raises some eyebrows"
  max-height="400px">
</BlogImage>


I also benchmarked the new 400m model, running it through the same test suite the 70m model faced: HellaSwag, PIQA, ARC - Easy and ARC - Challenge.
<details>

<summary><i>Click to expand and learn more about each of the involved tests.</i></summary>

**HellaSwag**
HellaSwag is a commonsense reasoning benchmark focused on completing short narrative or instructional descriptions. Each question gives a sentence or scenario and four possible continuations; the model must pick the most realistic one. It’s deceptively difficult because the options are written to look plausible, so high scores require strong world knowledge, context understanding, and linguistic coherence.

**PIQA (Physical Interaction Question Answering)**

PIQA tests commonsense knowledge about the physical world—specifically, how objects are used and how everyday tasks work. Each question poses a goal or action (e.g., lighting a candle, cleaning a spill) and gives two possible solutions. Success requires understanding physical limitations, intuitive physics, and everyday practicality.

**ARC (AI2 Reasoning Challenge) – Easy**

ARC Easy consists of grade-school level multiple-choice science questions that rely on basic factual recall and simple reasoning. It serves as a sanity check that a model can handle straightforward academic knowledge and simple logical relationships.

**ARC (AI2 Reasoning Challenge) – Challenge**

ARC Challenge is one of the hardest reasoning benchmarks in the LLM ecosystem. These questions are crafted specifically to be difficult for both models and rule-based systems. They require multi-step reasoning, inference, knowledge transfer, and problem-solving rather than rote memory. Human test-takers find them challenging; models usually perform far below human-level.
<hr></hr>
</details>

<AccNormBenchmarkChart :include-400m="true"></AccNormBenchmarkChart>

Much like the wikitext evaluation above, the SparkNet 400m v1 model trades blows with GPT-2 in all of these tests!

<BlogImage
  src="great-success.webp"
  alt="Ahh, Victory!"
  max-height="200px">
</BlogImage>

## The Chatbot Future

Training a model like SparkNet is not just for intellectual curiosity - I do have a definite goal in mind! My long-term vision is to build, and host, a working chatbot on DienerTech. It won't be a *good* chatbot, mind you. Modern LMs use trillions of tokens in training, with sophisticated architectures well beyond the GPT-2 style employed here in these SparkNet projects. However, I do hope to train a model that is *pretty okay*. If I can pull it off, I will have built an end-to-end microcosm of the OpenAI business model, which has single-handedly defined this decade:

- train a language model
- teach it to act as a chatbot
- serve the model from the cloud
- ???
- profit!

OpenAI might still be in that murky ??? phase that precedes profit, but they are well ahead of my next step: turning that LLM into a chatbot.

The first phase of training is known as pre-training, and it is the crucial initial step where the model learns how language and information works. Once completed, the model represents a sort of raw, uncut intelligence.

Supervised fine-tuning (SFT) is the next step. Using focused pairs of questions and answers, the model can be trained to take on roles and perform more specific tasks. This includes acting as a chatbot, or taking on the demeanor of a helpful assistant. Much like cutting and polishing a diamond, it is this fine-tuning that makes a raw model truly shine!

Despite the good benchmark results from pre-training, my attempts to apply SFT training to SparkNet 400m v1 has floundered. I've attempted five different SFT runs, and *none* of them produced a model that can reasonably chat with the user, nor follow even basic instruction. 

Despite several attempts, the model would continue to suffer from:
- persistent factual hallucination
- shallow, templated answers
- fake specificity
- easily drift into nonsense or pseudo-code
- loss improving while usefulness plateaued early

Benchmarking LMs is a tricky business - a model scoring well is no guarantee that it will exhibit useful behavior!

<BlogImage
  src="sorry-dave.webp"
  alt="According to my model, pod bay doors are an optical illusion"
  max-height="400px">
</BlogImage>

Pre-training requires an immense number of training tokens, but there is a brutal simplicity to the training logic: just keep throwing tokens at the problem! SFT, by contrast, uses far fewer training tokens, but has outsized impact on the final result. My SFT training methodology might be flawed in some way, and perhaps further research and exploration here will reveal a chatbot.

An alternative explanation is that SparkNet 400m v1 is not as good a model as the above benchmarks imply. That both the 6bn and 10bn token checkpoints *scored identically* is improbable if SparkNet was actually *learning* from its training. One possibility is that the model overfit to the training data; rather than learn broadly from first principles, it instead memorized exact sequences of text. Preventing the overfitting to training sequences can be a real difficulty in LLM development, and this strange result might be a first-hand example of this challenge.

The only way to test either theory is to train a second model to serve as a control. So enters **SparkNet 400m v2**.

The training run for v2 is running as I type! The v2 model will train directly to 12b tokens (50% more than Chinchilla), which will take ~18 days on my DGX Spark. Its training corpus is composed of:


| Source Name                        |    Composition |
| ------------------                 | ------:        |
| HuggingFaceFW/fineweb-edu          |  60%           |
| mlfoundations/dclm-baseline-1.0    |  20%           |
| HuggingFaceFW/finepdfs             |  10%           |
| HuggingFaceFW/finewiki             |  5%            |
| HuggingFaceTB/smollm-corpus        |  5%            |


This corpus places a high emphasis on high-quality, published text samples. It will be interesting to see how the v2 model compares once it finishes pre-training!

## A Fresh Spring Update for DienerTech

This blog post has been a long time coming. SparkNet 400m v1 was an incredibly exciting - and frustrating - project. Scaling up models is no easy task; the impact of going from *hours* to *weeks* for your iteration speed cannot be overstated. The DGX Spark remains an amazing laboratory to experiment with AI technology - just a little patience (and robust infrastructure) is required. I look forward to sharing the results of the SparkNet 400m v2 pre-training and SFT training results!

In addition to this blog post, I've also made some updates throughout this site. This includes, most crucially, the ability to 'like' blog posts! So if you've enjoyed this post - or any of my other works - please click that little heart! I really appreciate it! ❤️

Scaling up SparkNet didn’t just make the model bigger, it also magnified every flaw in my training process. The joy of software engineering is that we can try, try again. I've got the patience! As well as a new power strip.

- Michael Diener