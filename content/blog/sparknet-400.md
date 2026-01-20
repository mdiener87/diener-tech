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

My prior post, [The One Billion Token Challenge](one-billion-token-challenge.md), introduced the SparkNet series of SLMs (small language models). SparkNet 70m represents my first go at training language models from scratch. The final iteration, Sparknet 70m v5, scored impressively well. It nearly tied the best result from CodeLion, an AI researcher whom devised the post's namesake challenge. Despite the efficacy of the final iteration in training, a 70m parameter model is inherently limited. No matter how well you train it, no matter the quality of your dataset to feed it - 70 million parameters can only take you so far. Training models has been rewarding and highly educational; for my next model, I wanted to take the SparkNet concept, and scale it up. 

This led to the development of SparkNet 400m v1. This model has almost four times as many parameters, and it was trained to checkpoints: one for 6 billion tokens, and the final iteration to a full 10 billion tokens. SparkNet 70m benefited from fast iteration speed - my DGX Spark was able to complete that training loop in around 13 hours. SparkNet 400m, by contrast, would require far more time to complete. 

Model training time does not scale linearly with a model's parameters. Going from 70m to 400m is not a simple ~4x increase in time. The larger neural net will require many more tokens to effectively train it. The rule of thumb is that a model will need 20x the parameter count as its training tokens target [name, link]. SparkNet 70m would have an 'optimal' target of around 1.4bil tokens (the One Billion Token Challenge, therefore, might have left additional model learning room on the table). SparkNet 400m, meanwhile, will require at least *8 billion* tokens to fully converge. To make matters even worse - all of those extra tensor parameters will mean more work to do per training loop.

Scaling a model from 70m to 400m parameters is therefore not a simple exercise. I began training work on this this project December 13th, and it took until January 4th for all training work to complete. This amounted to three weeks of effort. Not all of this was pure training throughput; failures, delays, and scope creep were all part of the process. 

## Designing the Training Environment

When approaching this project, it was immediately clear that the lessons from Sparknet 70m would prove instrumental to this project. To wit, the way the datasets and tokenizer are constructed are *instrumental* to the quality of the final model. With this in mind, I focused on strongly optimizing these two qualities before any training began.

For dataset sources, SparkNet 400m made use of the following:


| Data source | % of total |
|---|---:|
| codelion/fineweb-edu-1B | 52% |
| codelion/dclm-baseline-1B | 22% |
| codelion/finepdfs-1B | 12% |
| eli5 | 13% |
| data/diener_blog.jsonl | 1% |
