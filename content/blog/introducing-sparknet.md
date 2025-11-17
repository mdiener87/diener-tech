---
title: "Introducing SparkNet"
description: "Taking on the 'One Billion Token' Challenge"
date: "2025-11-09"
category: "technology"
tags:
  ["ai", "machine learning", "dgx spark", "home lab", "llm", "sparknet"]
titleImage: ""
readingTime: "10"
featured: true

---

## The DGX Spark as an AI Laboratory

When I first introduced the DGX Spark in [Sparking the Future](sparking-the-future.md), many of initial use cases focused around AI inference. That is to say, running an existing AI model, in a process very similiar to running any available, off-the-shelf software. However, the DGX Spark is capable of far more than just inference - it's mixture of powerful processors, fast storage and memory, and a powerful graphics card make it ideal for training models from scratch. I've had my sights on training a GPT-2 era model, after inspirational GitHub repos from Kaparthy outlined an easy to implement training process for building exactly that. These posts include [nanoGPT](link) and [nanoChat](link). These provide a full, start-to-finish repository that can train GPT-2 all on its own.

GPT-2 makes an ideal training target for AI research. This was the second major model that OpenAI trained, before ChatGPT (running GPT-3) made OpenAI a household name. At the time (circa 2018), GPT-2 represented a major research effort in OpenAI's attempt to scale up transformer architecutre. Today, GPT-2 style models can be readily trained on consumer hardware - such as the DGX Spark.

The training plans Kaparthy outline involve a large training dataset. The Spark is totally capable of handling such a task, but it would probably take several days worth of training to work through that many tokens. I was considering this limitation,  when I came across this post by CodeLion on HuggingFace: The One Billion Token Challenge. In it, CodeLion outlines their research group's effort to produce a GPT-2 style model, while 'only' using 1 Billion training tokens. This represents a tenth of the original training set that GPT-2 utilized. CodeLion's research focused on a quality over quantity approach: by utilizing very high quality training texts, they hoped to maximize the impact of every single token. The original GPT-2 was definitley a quantity over quality effort. Large, high-quality datasets were harder to access in 2018, and so GPT-2 was trained on a mix of Wikipedia and scraped internet posts and websites. CodeLion's mix, by contrast, emphasized academic textbooks and other high-quality writing samples. 

According to CodeLion's blog post, across 50 different training attempts, they found the optimal mix of different types of training data - settling on a 50:30:20 ratio of of academic textbook PDFs, educational web content, and high-quality web posts. With a total of 1 billion training tokens, they claimed to have trained a model that is extremely similiar to the official GPT-2 model in terms of quality. With a low-token, high-impact result, I was inspired to take up the same challenge: Can I train a GPT-2 model with 1 billion tokens?

## The One Billion Token Challenge

CodeLion's blogpost and HuggingFace profile provides all of the training data used to make up their best model, CodeLion GPT-2. The finished model is also available for review. However, while their blogpost goes into great detail regarding how they found the optimal training data mix for the challenge, it does _not_ provide any of the code to actually train the finished model. This is like having the list of ingredients for a meal, but none of the instructions on how to prepare or cook them into something edible. This felt like a great challenge to undertake: It allows the DGX Spark to train a GPT-2 style model like Kaparthy's GitHubs, but the small token budget means we can rapidly iterate. Rapid iteration will be needed, because we also don't know exactly how to train the model. Figuring out the full training pipeline is something that will require experimentation!

With the challenge parameters outlined, I spun up project "SparkNet" - [SparkNet GPT-2 70m Project](link). I would use the same exact dataset and hyperparameters as CodeLion's best result, with one minor tweak - I also included all of the blog posts to-date from DienerTech! These blog posts are miniscule compared to the rest of the dataset, but it's a fun little bit of spice to add that further personalizes this project.

## SparkNet v1 

The v1 run for SparNet invovled two critical steps - preparing my blog posts for use as a training source, and writing the training script itself. Once the pipeline was set up, I ran a smoke-test run on 200 million tokens. When that inititial run completed, I set the script for the full 1 billion training tokens budget, and the DGX Spark did it's thing!

Approximatley 13 hours later, SparkNet v1 came out of the oven. With 1 billion training tokens consumed, I was eager to compare it's performance to the two baseline models: OpenAI's GPT-2, and CodeLion's GPT-2 model. How well would SparkNet compare? I wrote a simple script to provide an evaluation of the three models, comparing their Loss and Perplixity against Wikipedia. 

Before examining the final results, let's briefly define these two terms. They get to the heart of how an LLM works:

- **Loss**: The training objective value (lower is better).
- **Perplexity**: Exponential of the loss; measures how well the model predicts the data (lower is better).

With our definitions so defined, let's see how the v1 model stacks up:

Dataset: WikiText-2 Raw v1 — Samples: 2000

| Model                     | Loss     | Perplexity   |
|--------------------------|---------:|-------------:|
| SparkNet 70M v1          | 10.5697  | 38937.7836   |
| GPT-2                    | 3.9407   | 51.4545      |
| CodeLion GPT-2 70M       | 5.0129   | 150.3469     |

*Note - GPT-2 has an advantage in this comparison, as it was directly trained on WikiText*


With a Perplexity of almost 39,000, SparkNet v1 is **dramatically** worse than CodeLion's result. Perplexity provides a log-scale number to compare models with; as such, SparkNet's Perplexity marks it as several orders of magnitude worse than CodeLion's. SparkNet was trained on the same dataset, so what happened?

As it turns out, there's many different aspects to consider when training a model. The learning rate, for instance, defines how quickly a model can update its individual tensor weights as it responds to new information. Weight decay and warmup ratio can adjust how the learning rate decreases, or how long it takes to get to full strength. While our core hyperparameters are the same as CodeLion's, there's a number of secondary model parameters that can likewise be tweaked. While the training script did produce a valid model - and that's a win of its own! - the exact training parameters were clearly in need of fine tuning. 

One positive result from this v1 run - we benchmarked the Spark's training throughput. The Spark managed a steady ~21k tokens/second in the training pipeline, which amounts to 75.6 million tokens per hour. With a set training budget of 1 billion tokens, the DGX Spark could finish the training run in a little over 13 hours time. This throughput proved very steady in every training run attempted - the Spark never exibited signs of thermal throttling or I/O bottlenecks. CodeLion trained their model on an A100 GPU in ~8 hours; the Spark's 13 hour training run therefore compares very favorably here, as that A100 is an expensive enterprise-class GPU used in datacenters! With ~13 hours to complete a full 1 billion training run, it was easy to run overnight and analyze results the next morning.

## SparkNet v2
