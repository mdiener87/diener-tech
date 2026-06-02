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

This is a fine collection of datasources. A diverse corpus from which the fleding SparkNet model might learn from. However, there is one tiiiiny little problem. The Eval source looked like this:


| Source Name                        |    Composition |
| ------------------                 | ------:        |
| wikitext-2-raw-v1                  |  100%          |


.... and that's it.

The SparkNet series of models has been the result of organic exploration in LLM training. This dates back to my first blog post in the series, the [One Billion Token Challenge](one-billion-token-challenge.md). In it, I tried to build a small GPT-2 model, utilizing a handful of data sources, and evaluating the model's performance against predicting Wikipedia-derived text. Despite the evolution of the project - which now is training models over 5x the size - some of the original script elements still exist. This is one of them.

The diverse training corpus has significantly diverged from the wikitext used as the evaluation metric! The model was evaluated on a totally different rubric compared to the training material. This worked, up to a point. The v2 model was able to generalize up to a certain point. It learned grammar, syntax. The meaning of words. For a while, it was able to generalize from its training material, and improve its score against the evaluation dataset.

However, this mismatch in expectations could only go so far. Past the ~6bn token mark, the model began performing worse against that eval dataset. It would never recover. There's a saying that's applicable to this kind of scenario: Train as you fight. If your actual test of mettle diverges from the training grounds, you won't really be ready. So it goes with training an AI: Train as you eval.

As I set up for my next training run, this lesson would stick with me. The training and eval datasources must be at least broadly comparable. If they diverge, so too will your tensorgraph charts!
