---
title: "SparkNet 400M v2: The Eval Was Lying to Me"
description: "How a wikitext-only validation set made a working model look broken, and reshaped how I evaluate every run since."
date: "2026-06-01"
category: "technology"
tags:
  [
    "ai",
    "machine learning",
    "dgx spark",
    "home lab",
    "llm",
    "sparknet",
  ]
titleImage: "trixy-evalses.png"
featured: true
---


## Previously, on SparkNet

My prior post in the SparkNet series, [Scaling Sparknet](scaling-sparknet.md) ended with an ambiguous result from the 6b and 10b checkpoints on my SparkNet 400m v1 model, along with a promise of training a v2 that would answer certain questions about the model's quality. I've since completed the v2 run, along with a *subsequent* run. Models are training faster than I'm blogging! The DGX Spark might not be blazing fast, but there's an old adage out there about turtles and hares. 

So let's take a minute to discuss SparkNet 400m v2 - this pretraining run actually provided some fascinating (and hillarious!) results.

Before we get into a wall of text, let's take a look at tensorboard: there are two crucial graphs to share that shape much of the discussion to come:


<BlogImage
  src="sparknet-400mv2-eval-loss.png"
  alt="eval/loss - how the model scored against the validation data set (closed book test)"
  max-height="400px">
</BlogImage>


<BlogImage
  src="sparknet-400mv2-train-loss.png"
  alt="train/loss - how the model scored against the training data set (open book test)"
  max-height="400px">
</BlogImage>

The SparkNet 400m v2 run exhibits a divergence in these two charge. The first, **eval/loss**, tracks how the model is scoring against a hidden, validation-only dataset. The model never trains on this set directly, so like a closed book test, it must genuinely learn and generalize to score well. The second, **train/loss**, scores the model against the training-only dataset. This is content the model has already seen, and can therefore be thought of like an open-book test.

The eval/loss chart curls upwards, starting around halfway through the training run. It is here, around the 6bn token mark, that the model begins to score worse - and worse - on the evaluation dataset. However, its score against the training dataset continues to improve. When I tested various checkpoints after training completed, the checkpoints around the 6bn token mark proved to be the best. Half of this 18 day training run, therefore, failed to improve the model. 

<BlogImage
  src="tricksy-wikitext.png"
  alt="I just want my precious eval/loss graph!"
  max-height="300px">
</BlogImage>

The v1 run exibited a similiar pattern, with the eval/loss metric slowly trending upwards towards the end of the run. However, it was less pronounced than this v2 run demonstrated. Before any future training run could be attempted, I would need to get to the bottom of this. What made this v2 run so much worse? 


## Train as you Fight

In my postmortun of the v1 run, one of my conclusions was that I needed to increase the diversity and quality of datasets used. To that effect, the 400m v2 run looked like this:


| Source Name                        |    Composition |
| ------------------                 | ------:        |
| HuggingFaceFW/fineweb-edu          |  60%           |
| mlfoundations/dclm-baseline-1.0    |  20%           |
| HuggingFaceFW/finepdfs             |  10%           |
| HuggingFaceFW/finewiki             |  5%            |
| HuggingFaceTB/smollm-corpus        |  5%            |

This is a fine collection of datasources. Like a balanced breakfast, it has a diverse sampling of high-quality datasets from which to consume. However, there is one tiiiiny little problem. The Eval sources looked like this:


| Source Name                        |    Composition |
| ------------------                 | ------:        |
| wikitext-2-raw-v1                  |  100%          |


.... and that's it.


<BlogImage
  src="insufficent.png"
  alt="Seven is *not* impressed"
  max-height="300px">
</BlogImage>

The SparkNet series of models has been the result of organic exploration in LLM training. This project dates back to my first blog post in the series, the [One Billion Token Challenge](one-billion-token-challenge.md). In it, I tried to build a small GPT-2 model, utilizing a handful of data sources, and evaluating the model's performance against predicting Wikipedia-derived text. Despite the evolution of the project, some of the original script elements still exist. This eval dataset source is one of them.

The 400m v2 model was evaluated on a totally different rubric compared to its training material. This divergence in training and eval materials worked, up to a point. The model *was* learning for a while. It learned grammar, syntax, the meaning of words. It was able to generalize from its training material, and improve its score against the evaluation dataset.

However, this mismatch could only get so far before falling apart. Past the ~6bn token mark, the model began performing worse against that eval dataset. It would never recover. There's a saying that's applicable to this kind of scenario: Train as you fight. Like an army training to win yesteryear's war, my model never trained on the material that it would actually be judged against. The result is a catastrophic divergence halfway through the run.

As I set up for my next training run, this lesson would stick with me. The training and eval datasources must be at least broadly comparable. If they diverge, so too will your tensorgraph charts!

<BlogImage
  src="two-roads-meme.jpg"
  alt="Actually yea - it's exactly like this"
  max-height="300px">
</BlogImage>


## Cutting the Diamond

Despite my dissapointment in the 400m v2 training run, the 6bn model still performed adequetly in various benchmark results. I decided to take the model a step further, and try my hand at SFT - supervised fine tuning. This is the next step in training, and its what turns a base model into an intelligence. Much like a jeweler cutting a diamond, SFT seeks to shape and direct the raw intelligence of the model into producing useful content. 

SFT is remarkably tricky. I tried this with the v1 model as well, and never managed to produce a working chatbot. I tried a variety of approaches; changing out the datasets, the scoring methodology, and starting from various base checkpoints from the 400m v2 run. Remarkably, after 7 attempts, I managed to sharped the SparkNet model into something approaching a chatbot!

<BlogImage
  src="chatbots-everywhere.png"
  alt="Single chatbots in your area!"
  max-height="300px">
</BlogImage>


It was around this point of time that my cross-posted Blog entries on Linkedin caught the attention of my team. I was invited to speak at a "Lunch and Learn" meeting, where speakers can demonstrate some bit of knowledge or project they are pursuing. The SparkNet chronichles were not only excellent material to draw from, but I now could cap the presentation with a live demonstration!


## Lock and Load

My model was trained into a chatbot, which meant the final step was to load it into an inference engine like [vllm](link) or [llamacpp](link). These are powerful, open-source engines which are capable of running a model and hosting API endpoints from which to communicate with it. This is the step that turns your model into a service. I've done this dozens of times with a variety of open source models, so surely it would be no trouble at all to load up my new chatbot, right?

. . . right?

<BlogImage
  src="never-goes-smooth.png"
  alt="Every pretraining run, he's gotta start shouting my name"
  max-height="300px">
</BlogImage>


No! If there's anything I should have learned by now, it's that working with LLMs will fight you every single step of the way! Loading up the model was easy enough. However, I immediatley encountered a new issue - the outputs were complete gibberish. I'd accidentally stumbled my way into a class of bugs called 'serve skew' - the chat template the model was trained to utilize did not match the one the inference engine expected. 

Tracing the problem would take me to the earliest decisions of pretraining. SparkNet was expecting a very simple chat template that looked like this:

```
### System:\n
### User:\n
### Assistant:\n
```


Those `\n` sequences are the culprit. In many computer languages, that would represent a new line (carriage return). Turns out the inference engine was looking for a special newline token that looked like this: `<|im_start|>`. The token representation of a basic aspect of English text broke, and the entire magic decoder ring that turns an LLM's output back into text failed to function. 

Despite the failure for the engines to work, this was a fantastic test. Only by taking the model all the way to the end step was this class of bug discovered. I could now update my training to utilize the correct token sequences in the future. The v2 checkpoint wasn't particularly strong, so finding the error here was a free extra win from an otherwise mediocre run.

<BlogImage
  src="absolute-win.png"
  alt="It's hardly something worthy of hulking out over"
  max-height="300px">
</BlogImage>

Luckily, SparkNet is a very lightweight model, and therefore relatievely straightfoward to host. Rather than rely on the major inference engines, I instead spun up a custom OpenAI-compatible API hosting and inference script that could cover my needs. I then pointed [OpenWebUI](link) at this endpoint, and at long last, I could directly chat with SparkNet in the browser!

After my "Lunch and Learn" presentation was completed, I turned the hosted SparkNet chatbot over to the audience. This was the first public testing of SparkNet, and it was an incredibly cool moment! The crowd immediatley subjected it to some fun questions. Here are a few examples of the resulting conversation:


*note - in the below screenshots, the model name implies it is hosted by vLLM. That is an artifact of reusing the same port  within OpenWebUI*


<BlogImage
  src="SparkChat-Hotdog.png"
  alt="This question really divided my team when we tried to answer it.">
</BlogImage>


<BlogImage
  src="SparkChat-Strawberry.png"
  alt="A viral test that stumped AI for a year. The best way to avoid counting wrong is to just avoid counting!">
</BlogImage>

<BlogImage
  src="SparkChat-OpenAI-Comparison.png"
  alt="I aspire to such levels of confidence!">
</BlogImage>


A Claude competitor, this early SparkNet model is not! However, despite the rough training process, I'm actually very pleased with these answers. It's writing (mostly) coherent English. It uses complete sentences and correct punctuation. The chatbot tuning clearly worked - its taking turns, and tries to reply to the user's prompt. This is honestly not a bad result at all, and is very encouraging for the future of the SparkNet models!


## Looking Ahead to v3

While the v2 run was not a spectacular success, I learned some great lessons from it, and took another step towards my chatbot objective. It is fascinating to consider that early decisions made in pretraining (such as the chat template) can have massive impacts in the final inference operation. These are only things you can really learn by taking the model through the full loop. 

In addition to the improved eval dataset and chat template, the v3 run is going to have a full analysis of the involved hyperparamters. Some of these key values, such as learning rate, have not been critically evaluated since the original 70m run. I think there is a lot of room for improvement here. Combine that with the better eval set and, well, who knows!

 - Michael Diener





