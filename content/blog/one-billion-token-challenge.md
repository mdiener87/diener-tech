---
title: "The One Billion Token Challenge"
description: "The Making of SparkNet GPT-2 70m"
date: "2025-11-17"
category: "technology"
tags:
  [
    "ai",
    "machine learning",
    "dgx spark",
    "home lab",
    "llm",
    "sparknet",
    "gpt-2",
  ]
titleImage: "one-billion-token-challenge.png"
readingTime: "10"
featured: true
---

## The DGX Spark as an AI Laboratory

When I first introduced the DGX Spark in [Sparking the Future](sparking-the-future.md), many of initial use cases focused around AI inference. That is to say, running an existing AI model, in a process very similiar to running any available, off-the-shelf software. However, the DGX Spark is capable of far more than just inference - it's mixture of powerful processors, fast storage and memory, and a powerful graphics card make it ideal for training models from scratch. I've had my sights on training a GPT-2 era model, after inspirational GitHub repos from Kaparthy outlined an easy to implement training process for building exactly that. These posts include [nanoGPT](link) and [nanoChat](link). These provide a full, start-to-finish repository that can train GPT-2 all on its own.

GPT-2 makes an ideal training target for AI research. This was the second major model that OpenAI trained, before ChatGPT (running GPT-3) made OpenAI a household name. At the time (circa 2018), GPT-2 represented a major research effort in OpenAI's attempt to scale up transformer architecutre. Today, GPT-2 style models can be readily trained on consumer hardware - such as the DGX Spark.

The training plans Kaparthy outline involve a large training dataset. The Spark is totally capable of handling such a task, but it would probably take several days worth of training to work through that many tokens. I was considering this limitation, when I came across this post by CodeLion on HuggingFace: The One Billion Token Challenge. In it, CodeLion outlines their research group's effort to produce a GPT-2 style model, while 'only' using 1 Billion training tokens. This represents a tenth of the original training set that GPT-2 utilized. CodeLion's research focused on a quality over quantity approach: by utilizing very high quality training texts, they hoped to maximize the impact of every single token. The original GPT-2 was definitley a quantity over quality effort. Large, high-quality datasets were harder to access in 2018, and so GPT-2 was trained on a mix of Wikipedia and scraped internet posts and websites. CodeLion's mix, by contrast, emphasized academic textbooks and other high-quality writing samples.

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

| Model              |    Loss | Perplexity |
| ------------------ | ------: | ---------: |
| SparkNet 70M v1    | 10.5697 | 38937.7836 |
| GPT-2              |  3.9407 |    51.4545 |
| CodeLion GPT-2 70M |  5.0129 |   150.3469 |

_Note - GPT-2 has an advantage in this comparison, as it was directly trained on WikiText_

With a Perplexity of almost 39,000, SparkNet v1 is **dramatically** worse than CodeLion's result. Perplexity provides a log-scale number to compare models with; as such, SparkNet's Perplexity marks it as several orders of magnitude worse than CodeLion's. SparkNet was trained on the same dataset, so what happened?

As it turns out, there's many different aspects to consider when training a model. The learning rate, for instance, defines how quickly a model can update its individual tensor weights as it responds to new information. Weight decay and warmup ratio can adjust how the learning rate decreases, or how long it takes to get to full strength. While our core hyperparameters are the same as CodeLion's, there's a number of secondary model parameters that can likewise be tweaked. The training script did succeed in producing a valid model - and that's a win of its own! - but the exact training parameters were clearly in need of further fine tuning.

One positive result from this v1 run - we benchmarked the Spark's training throughput. The Spark managed a steady ~20k tokens/second in the training pipeline, which amounts to 72 million tokens per hour. With a set training budget of 1 billion tokens, the DGX Spark could finish the entire training run in about 14 hours time. All of the training runs would make use of [Tensorboard](link), which records statistics and provides an easy web-based reporting interface.

<BlogImage
  src="v1-throughput-chart.png"
  alt="The first training run maintained a steady 20,600 tokens/sec processing speed"
  max-height="200px">
</BlogImage>

## SparkNet v2

With a completed - if poorly performing - v1 model, I quickly set my sights on a v2 training run. While a variety of tweaks were made to this script (including the addition of custom Tensorboard logging metrics), the most impactful was the doubling of the learning rate. The original v1 script would utilize a `value` training rate; v2 doubled this to `valuex2`. The hope was that the model would learn more quickly from its relatively limited training token budget.

That... didn't really work out.

| Model              |    Loss | Perplexity |
| ------------------ | ------: | ---------: |
| SparkNet 70M v2    | 11.4190 | 91033.4041 |
| GPT-2              |  3.9407 |    51.4545 |
| CodeLion GPT-2 70M |  5.0129 |   150.3469 |

The good news - from v2 onwards, improvements to the training script would upgrade our sustained throughput to ~21,500 tokens/second, or 77.4 million tokens/hour. This shaves our total 1 billion training run down to ~13 hours start to finish. CodeLion trained their models on an A100 GPU in ~8 hours; the Spark compares very favorably here, as that A100 is an expensive enterprise-class GPU used in datacenters! With ~13 hours to complete a full 1 billion training run, it was easy to set up a run overnight and analyze the completed results the next morning.

It's good that the runs could complete so rapidly, as further iteration was clearly needed. With a Perplexity over **90,000**, this v2 model was clearly a step in the wrong direction. I think this image really sums up the situation -

<BlogImage
  src="over-90000.png"
  alt="It's an older meme sir, but I was about to clear it."
  max-height="400px">
</BlogImage>

I think the training process had some sort of issue during the v2 run - the Tensorboard graphs are somewhat confused when compared to v1. It's like the model just gave up training partway through, which would explain the disasterous final result.

<BlogImage
  src="v1-vs-v2-grad-norm.png"
  alt="Comparing v1 and v2 gradient normalization"
  max-height="200px">
</BlogImage>

"Gradient normalizaiton" is a metric which analyzes how large a change in vector values the tensors experienced per training step. A larger grad-norm indicates a bigger update was made to the tensor weights. The v1 training run clearly experienced a sawtooth looking pattern, which likely means the tensors never really converged. Instead, they kept being surprised by new data, making large updates to their values, even late into the training run. The v2 graph, meanwhile, seems to just drop out after 4 hours. Other charts from this run do go the full 13 hours, so I'm really not sure what happened here. Nothing good came from this run, time to try v3.

## SparkNet v3

Entering my third attempt at training, I thought I'd try a different tactic. With v2 feeling a bit under-cooked, I thought I'd try a second round of training on the v2 checkpoint. This would utilize the same 1 billion learning tokens, and let the model get a second attempt at learning from their data, for a total of 2 billion training tokens. The total time spent training v3 would therefore be 26 hours start-to-finish.

| Model              |    Loss |   Perplexity |
| ------------------ | ------: | -----------: |
| SparkNet 70M v3    | 14.3165 | 1650392.2805 |
| GPT-2              |  3.9407 |      51.4545 |
| CodeLion GPT-2 70M |  5.0129 |     150.3469 |


*Oh no*

<BlogImage
  src="v2-v3-grad-norm.png"
  alt="Whatever it's learning, it's not learning it well"
  max-height="200px">
</BlogImage>

Now I'm surely moving in the wrong direciton with this project. The grad-norm graph here doesn't show the model settling down with additional token exposure - it's making rapid and large changes to its vectors. v2 was a bust, and v3 built on a bad foundation.

## SparkNet v4

I'm starting to wonder at this point if I'm not doing something fundementally wrong here. Our Perplexity scores keep going up, up, up! Which is entirely the wrong direction. 

<BlogImage
  src="down-not-up.png"
  alt="I'm something of a prequel memer myself"
  max-height="400px">
</BlogImage>

