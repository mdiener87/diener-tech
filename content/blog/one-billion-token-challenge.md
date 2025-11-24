---
title: "The One Billion Token Challenge"
description: "The Making of SparkNet GPT-2 70m"
date: "2025-11-22"
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

When I first introduced the DGX Spark in [Sparking the Future](sparking-the-future.md), many of its initial use cases focused around AI inference. Inference is the act of running an existing AI model, in a process very similar to running any available, off-the-shelf software. However, the DGX Spark is capable of far more than just running existing models - it's also an excellent platform for training models from scratch. This post examines my first from-scratch training efforts, culminating in the creation of SparkNet GPT-2 70m.

[GPT-2](https://en.wikipedia.org/wiki/GPT-2) style-models make for an ideal early training target for AI research. GPT-2 was the second major model that OpenAI trained, before ChatGPT (running GPT-3) made OpenAI into a household name. At the time (circa 2019), GPT-2 represented a major research effort in OpenAI's attempt to scale up transformer architecture. Today, GPT-2 style models can be readily trained on consumer hardware. The legendary Karpathy has previously outlined easy to implement training processes for building these types of models. His contributions include [nanoGPT](https://github.com/karpathy/nanoGPT) and [nanoChat](https://github.com/karpathy/nanochat). 

The training plans Karpathy outline involve working through a large training dataset. The Spark is totally capable of handling such a task, but it would probably take several days per run. I was considering this limitation, when I came across a blog post by CodeLion on HuggingFace: [The One Billion Token Challenge](https://huggingface.co/blog/codelion/optimal-dataset-mixing). In it, CodeLion (Asankhaya Sharma) outlines their effort to produce a GPT-2 style model, while 'only' using one Billion training tokens; representing a tenth of the original training set that GPT-2 utilized. CodeLion's research focused on a quality over quantity approach: by utilizing only very high quality training texts, they hoped to maximize the impact of every single token. 

According to CodeLion's blog post, across 50 different training attempts, they found an optimal mix of of training data - settling on a 50:30:20 ratio of of academic textbook PDFs, educational web content, and high-quality web posts. With only one billion training tokens, CodeLion claims to have trained a model that is extremely similar to the official GPT-2 model in terms of quality. With a low-budget, high-impact result, I was inspired to take up the same challenge: Can I train a GPT-2 model with only one billion tokens?

<BlogImage
  src="challenge-accepted.jpg"
  alt="Time to lock in"
  max-height="300px">
</BlogImage>


## The One Billion Token Challenge

CodeLion's blogpost and [HuggingFace profile](https://huggingface.co/codelion) provides all of the training data used to make up their best attempt, [CodeLion GPT-2](https://huggingface.co/codelion/gpt-2-70m). However, while their blogpost goes into great detail regarding how they found the optimal training data mix for the challenge, it does _not_ provide any of the code to actually train the model itself. This is like having the list of ingredients for a meal, but none of the instructions on how to prepare or cook them. Figuring out how to reproduce this result felt like a perfect challenge to undertake. So I defined my one billion token challenge as follows:

- Train a 70m parameter GPT-2 style model
- Utilize only one billion training tokens
- Validate the finished model against CodeLion's and OpenAI's GPT-2 models

With the challenge parameters outlined, I spun up project [SparkNet](https://github.com/mdiener87/sparknet). I decided to use the same dataset and hyperparameters as CodeLion's best GPT-2 70m result, with one minor tweak - I also included all of my blog posts from DienerTech! These blog posts represent a minuscule addition compared to the rest of the dataset, but its fun to add a bit of personalization.

<GithubProject 
  name="SparkNet" 
  url="https://github.com/mdiener87/sparknet"
  description="SparkNet - a custom training pipeline for GPT-2 style LLMs"
  src="/projects/sparknet-logo.png">
</GithubProject>

## SparkNet v1

The v1 run for SparkNet involved two critical steps - preparing my blog posts for use as a training source, and writing the training script itself. Once the pipeline was set up, I ran a smoke-test run on 200 million tokens. This was a good call, as I used the opportunity to further refine the training script. Once the smoke-test result was stable, I set the script for the full one billion training tokens budget, and the DGX Spark did it's thing!

Approximately 13 hours later, SparkNet v1 came out of the oven. I was eager to compare it's performance to the two baseline models: OpenAI's GPT-2, and CodeLion's GPT-2 model. How well would SparkNet compare? I wrote a simple script to provide an evaluation of the three models, which compares their Loss and Perplexity values against 2,000 samples of Wikipedia text.

Before examining the final results, let's briefly define these two terms. They get to the heart of how an LLM works:

- **Loss**: Loss is the model’s objective function — a lower loss means the model assigned higher probability to the correct next token. It's the core measure of how well the model predicts text.
- **Perplexity**: The natural exponent of the Loss factor; again measuring how well the model predicts data (lower is better). Loss tends to work on small numbers, and small shifts of decimal values might represent meaningful change. By taking Loss to an exponent value, Perplexity becomes easier to compare and understand across models.

With our definitions so defined, let's see how my SparkNet v1 model stacks up:

Dataset: WikiText-2 Raw v1 — Samples: 2000

| Model              |    Loss | Perplexity |
| ------------------ | ------: | ---------: |
| SparkNet 70M v1    | 10.5697 | 38,937.7836 |
| CodeLion GPT-2 70M |  5.0129 |   150.3469 |
| GPT-2              |  3.9407 |    51.4545 |

_Note - GPT-2 has an advantage in this comparison, as it was directly trained on WikiText_

With a Perplexity of almost 39,000, SparkNet v1 is **dramatically** worse than CodeLion's result. SparkNet was trained on the same dataset, so what happened?

As it turns out, there's many different aspects to consider when training a model. The learning rate, for instance, defines how quickly a model can update its individual tensor weights as it responds to new information. Weight decay and warmup ratio can adjust how the learning rate decreases, or how long it takes learned changes to full apply. While our core hyperparameters are the same as CodeLion's, there's a number of secondary model parameters that can likewise be tweaked. The training script did succeed in producing a valid model - and that's a win of its own! - but the exact training parameters were clearly in need of further fine tuning.

One positive result from this v1 run - we benchmarked the Spark's training throughput. The Spark managed a steady ~20k tokens/second in the training pipeline, which amounts to 72 million tokens per hour. With the set training budget of one billion tokens, the DGX Spark could finish the entire training run in about 14 hours time. All of the training runs would make use of [Tensorboard](link), which both records statistics from the training run, and provides an easy web-based reporting interface.

<BlogImage
  src="v1-throughput-chart.png"
  alt="The first training run maintained a steady 20,600 tokens/sec processing speed"
  max-height="200px">
</BlogImage>

## SparkNet v2

With a completed - if poorly performing - v1 model, I quickly set my sights on a v2 training run. While a variety of tweaks were made to this script (including the addition of custom Tensorboard logging metrics), the most impactful was the doubling of the learning rate. The original v1 script would utilize a `1.5e-4` training rate; v2 doubled this to `3e-4`. The hope was that the model would learn more quickly from its limited training token budget. With this challenge, every token counts!

That... didn't really work out.

| Model              |    Loss | Perplexity |
| ------------------ | ------: | ---------: |
| SparkNet 70M v2    | 11.4190 | 91,033.4041 |
| CodeLion GPT-2 70M |  5.0129 |   150.3469 |
| GPT-2              |  3.9407 |    51.4545 |

The good news - from v2 onwards, improvements to the training script would upgrade our sustained throughput to ~21,500 tokens/second, or 77.4 million tokens/hour. This shaves our total 1 billion training run down to ~13 hours start to finish. CodeLion trained their models on an A100 GPU in ~8 hours; the Spark compares very favorably here, as that A100 is an expensive enterprise-class GPU used in datacenters! With ~13 hours to complete a full 1 billion training run, it was easy to set up a run overnight and analyze the completed results the next morning.

It's good that the runs could complete so rapidly, as further iteration was clearly needed. With a Perplexity over **90,000**, this v2 model was clearly a step in the wrong direction. I think this image really sums up the situation -

<BlogImage
  src="over-90000.png"
  alt="It's an older meme sir, but I was about to clear it."
  max-height="400px">
</BlogImage>

I think the training process had some sort of issue during the v2 run - the Tensorboard graphs are somewhat confused when compared to v1. It's like the model just gave up training partway through, which would explain the disastrous final result. 

Gradient normalization (grad-norm) is a metric which analyzes how large a change in vector values the tensors experienced per training step. A larger grad-norm indicates a bigger update was made to the tensor weights. The v1 training run clearly experienced a sawtooth looking pattern, which likely means the tensors never really converged. Instead, they kept being surprised by new data, making large updates to their values, even late into the training run. The v2 graph, meanwhile, seems to just drop out after 4 hours. Other charts from this run do go the full 13 hours, so I'm really not sure what happened here. Nothing good came from this run, so its time to move on.

<BlogImage
  src="v1-vs-v2-grad-norm.png"
  alt="Comparing v1 and v2 gradient normalization"
  max-height="200px">
</BlogImage>


## SparkNet v3

Entering my third attempt at training, I thought I'd try a different tactic. With v2 feeling a bit under-cooked, I thought I'd try a second round of training on the v2 checkpoint. This would utilize the same 1 billion learning tokens, and let the model get a second attempt at learning from their data, for a total of 2 billion training tokens. The total time spent training v3 would therefore be 26 hours start-to-finish, representing 2x 13 hour runs.

| Model              |    Loss |   Perplexity |
| ------------------ | ------: | -----------: |
| SparkNet 70M v3    | 14.3165 | 1,650,392.2805 |
| CodeLion GPT-2 70M |  5.0129 |     150.3469 |
| GPT-2              |  3.9407 |      51.4545 |


*Oh no*

<BlogImage
  src="v2-v3-grad-norm.png"
  alt="Whatever it's learning, it's not learning it well"
  max-height="200px">
</BlogImage>

Now I'm surely moving in the wrong direction with this project. The grad-norm graph here doesn't show the model settling down with additional token exposure - it's making rapid and large changes to its vectors. v2 was a bust, and v3 built on a bad foundation. This is catastrophic model collapse - random tensor weights might honestly do better than whatever this is.

## SparkNet v4

I'm starting to wonder at this point if I'm not doing something fundamentally wrong here. Our Perplexity scores keep going Up, Up, Up! This is not golden at all.

<BlogImage
  src="down-not-up.png"
  alt="Spark, are you listening?"
  max-height="400px">
</BlogImage>


For the fourth attempt, I started v4 as a clean run - no more initializing from an existing checkpoint. I continued with the idea of using a 2 billion token training run, utilizing one billion learning tokens seen twice. The model configuration was my best-guess blend of the v2 and v3 arguments. Given this model was trained from zero, it would take ~26 hours to complete on the Spark. This was an excellent long-term stability test for the spark, and it showed no signs of thermal throttling during the long run. When we pulled the model out of the oven, these were the results:

| Model              |    Loss |   Perplexity |
| ------------------ | ------: | -----------: |
| SparkNet 70M v4    |  8.9965 |    8,074.7054 |
| CodeLion GPT-2 70M |  5.0129 |     150.3469 |
| GPT-2              |  3.9407 |      51.4545 |


!!! Finally !!!

With a Perplexity of ~8k, v4 is now by far the best training attempt in the series. This result really boosted my confidence - suddenly the 1 billion token challenge didn't feel impossible. The Tensorboard charts tell a much better story for this training as well:


<BlogImage
  src="v4-tokens-sec.png"
  alt="At almost 22k tokens/sec, v4 had excellent sustained training"
  max-height="200px">
</BlogImage>

<BlogImage
  src="v4-grad-norm.png"
  alt="No big spikes or sawtooth behavior in grad-norm"
  max-height="200px">
</BlogImage>

<BlogImage
  src="v4-perplexity.png"
  alt="Gradual decrease in perplexity against validation data"
  max-height="200px">
</BlogImage>


While v4 represents a major improvement in the training, it is still an order of magnitude away from the CodeLion result. Furthermore, v4 utilized 2bil training tokens - double our target budget. So the question remained - how do I achieve the precision CodeLion's model demonstrates? 

## SparkNet v5

I went back to the drawing board and re-evaluated all of the underlying assumptions in the training pipeline. v4 represented a major improvement, but it also somewhat cheated the challenge by doubling the amount of training tokens available. To achieve a low-Perplexity model AND stay on-budget would require more than tweaking the learning rate.

After review, I noted a few major areas for improvement:

1) **Tokenizer** - For all previous attempts, I had made use of the original GPT-2 tokenizer. A tokenizer is a map which translates string data (such as characters, words, special tokens, etc) into a numerical value that the model can work with. GPT-2's tokenizer was built for working with relatively unrefined web text. CodeLion used their own tokenizer - and here lies a subtle distinction. CodeLion's data sources (the same data sources I'm making use of) include a lot of academic texts wit larger words and longer sentences than raw web text would likely include. The GPT-2 tokenizer, therefore, was likely needing more tokens to represent the training corpus than CodeLion's tokenizer. A more efficient tokenizer can represent the same text using fewer tokens, which effectively gives the model more learning signal within the same token budget.

    _CodeLion also provides their tokenizer along with the model - I decided it would be more fun and educational to try my hand at creating a custom tokenizer myself_

2) **Dropout** - Dropout was added to the model's hyperparameters. This has the effect of randomly zeroing tensor weights during the training process. On small models, it's easy for the training process to over-fit rather than generalize. A small amount of dropout essentially adds noise, forcing the model to generalize rather than specialize. 

3) **Dataset** - In the prior training runs, I made use of a streaming pipeline to dynamically load the training data with low overhead. For v5, I built a pre-compiled database of training tokens, which would guarantee any future runs would all result from a deterministic set of local data.

13 hours and one billion tokens later...


| Model              |    Loss |   Perplexity |
| ------------------ | ------: | -----------: |
| SparkNet 70M v3    |  5.1489 |   **172.2377** |
| CodeLion GPT-2 70M |  5.0129 |     150.3469 |
| GPT-2              |  3.9407 |      51.4545 |

!!! **172** !!!


<BlogImage
  src="its-working.png"
  alt="This is getting out of hand! Now there are two prequel memes!"
  max-height="200px">
</BlogImage>


172 is an incredibly exciting result! This is very, very close to CodeLion's official release. To better compare how v5 compares to CodeLion and GPT-2, I ran all three models through a series of benchmarks to officially test their capabilities. 




 <AccNormBenchmarkChart></AccNormBenchmarkChart>
<details>
<summary><i>Click to expand and learn more about each of the involved tests.</i></summary>

#### Benchmark Suites

**HellaSwag**
HellaSwag is a commonsense reasoning benchmark focused on completing short narrative or instructional descriptions. Each question gives a sentence or scenario and four possible continuations; the model must pick the most realistic one. It’s deceptively difficult because the options are written to look plausible, so high scores require strong world knowledge, context understanding, and linguistic coherence.

**PIQA (Physical Interaction Question Answering)**

PIQA tests commonsense knowledge about the physical world—specifically, how objects are used and how everyday tasks work. Each question poses a goal or action (e.g., lighting a candle, cleaning a spill) and gives two possible solutions. Success requires understanding physical limitations, intuitive physics, and everyday practicality.

**ARC (AI2 Reasoning Challenge) – Easy**

ARC Easy consists of grade-school level multiple-choice science questions that rely on basic factual recall and simple reasoning. It serves as a sanity check that a model can handle straightforward academic knowledge and simple logical relationships.

**ARC (AI2 Reasoning Challenge) – Challenge**

ARC Challenge is one of the hardest reasoning benchmarks in the LLM ecosystem. These questions are crafted specifically to be difficult for both models and rule-based systems. They require multi-step reasoning, inference, knowledge transfer, and problem-solving rather than rote memory. Human test-takers find them challenging; models usually perform far below human-level.
</details>


While CodeLion's model consistently scores higher, SparkNet v5 is often within the statistical error bands. I'm *very* happy with this result! Using only CodeLion's data sources, the SparkNet training script has successfully engineered the recipe to build a comparable model from scratch.


To wrap this up, let's look at the v5 grad-norm chart. The addition of the dropout value is really keeping the grad-norm values healthy!

<BlogImage
  src="v5-grad-norm.png"
  alt="The healthiest grad-norm chart of all runs"
  max-height="200px">
</BlogImage>



Finally, here is all five training run's loss validation over time. Only the v5 run (cyan line) has the value dropping over time.

<BlogImage
  src="all-runs-loss-eval.png"
  alt="v5 demonstrates a healthy loss curve - no other run comes close"
  max-height="400px">
</BlogImage>


So there you have it! It took five attempts, but the final version of SparkNet is statistically similar to CodeLion’s. The one-billion token challenge has been met! Further tweaks to the learning parameters might close the remaining gap, but for now, I'm satisfied to let this model stand.

SparkNet is the first model I've ever trained by hand, and I’m sure it won’t be the last. The journey to the v5 milestone was a mix of frustration, excitement, and deep reflection - how _does_ a collection of data and hyperparameters become something more? That question is going to stay with me.

I'm already planning the next runs, including scaling the SparkNet architecture to larger parameter sizes. My long-term goal is to train a conversational model right here on the DGX Spark - and eventually host it locally on DienerTech itself.

In the meantime, feel free to check out the final model on HuggingFace!

<HuggingFaceModel
  url="https://huggingface.co/DienerTech/sparknet-70m"
  title="SparkNet 70m"
  description="GPT-2 style model, inspired by the One Billion Token Challenge">
</HuggingFaceModel>

 - Michael Diener