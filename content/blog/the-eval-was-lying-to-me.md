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
titleImage: "trixy-evalses.webp"
featured: true
---


## Previously, on SparkNet

My prior post in the SparkNet series, [Scaling Sparknet](scaling-sparknet.md) ended with an ambiguous result from the 6b and 10b checkpoints on my SparkNet 400m v1 model, along with a promise of training a v2 that would answer certain questions about the model's quality. I've since completed the v2 run, along with a *subsequent* run. Models are training faster than I'm blogging! The DGX Spark might not be blazing fast, but there's an old adage out there about turtles and hares. 

So let's take a minute to discuss SparkNet 400m v2 - this pretraining run actually provided some fascinating (and hilarious!) results.

Before we get into a wall of text, let's take a look at tensorboard: there are two crucial graphs to share that shape much of the discussion to come:


<BlogImage
  src="sparknet-400mv2-eval-loss.webp"
  alt="eval/loss - how the model scored against the validation data set (closed book test)"
  max-height="400px">
</BlogImage>


<BlogImage
  src="sparknet-400mv2-train-loss.webp"
  alt="train/loss - how the model scored against the training data set (open book test)"
  max-height="400px">
</BlogImage>

The SparkNet 400m v2 run exhibits a divergence in these two charge. The first, **eval/loss**, tracks how the model is scoring against a hidden, validation-only dataset. The model never trains on this set directly, so like a closed book test, it must genuinely learn and generalize to score well. The second, **train/loss**, scores the model against the training-only dataset. This is content the model has already seen, and can therefore be thought of like an open-book test.

The eval/loss chart curls upwards, starting around halfway through the training run. It is here, around the 6bn token mark, that the model begins to score worse - and worse - on the evaluation dataset. However, its score against the training dataset continues to improve. When I tested various checkpoints after training completed, the checkpoints around the 6bn token mark proved to be the best. Half of this 18 day training run, therefore, failed to improve the model. 

The v1 run exhibited a similar pattern, with the eval/loss metric slowly trending upwards towards the end of the run. However, it was less pronounced than this v2 run demonstrated. Before any future training run could be attempted, I would need to get to the bottom of this. What made this v2 run so much worse? 


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
  src="insufficent.webp"
  alt="Seven is *not* impressed"
  max-height="300px">
</BlogImage>

The SparkNet series of models has been the result of organic exploration in LLM training. This project dates back to my first blog post in the series, the [One Billion Token Challenge](one-billion-token-challenge.md). In it, I tried to build a small GPT-2 model, utilizing a handful of data sources, and evaluating the model's performance against predicting Wikipedia-derived text. Despite the evolution of the project, some of the original script elements still exist. This eval dataset source is one of them.

The 400m v2 model was evaluated on a totally different rubric compared to its training material. This divergence in training and eval materials worked, up to a point. The model *was* learning for a while. It learned grammar, syntax, the meaning of words. It was able to generalize from its training material, and improve its score against the evaluation dataset.

However, this mismatch could only get so far before falling apart. Past the ~6bn token mark, the model began performing worse against that eval dataset. It would never recover. There's a saying that's applicable to this kind of scenario: Train as you fight. Like an army training to win yesteryear's war, my model never trained on the material that it would actually be judged against. The result is a catastrophic divergence halfway through the run.

As I set up for my next training run, this lesson would stick with me. The training and eval datasources must be at least broadly comparable. If they diverge, so too will your tensorgraph charts!

<BlogImage
  src="two-roads-meme.webp"
  alt="Actually yea - it's exactly like this"
  max-height="300px">
</BlogImage>


## Cutting the Diamond

Despite my dissapointment in the 400m v2 training run, the 6bn model still performed adequetly in various benchmark results. I decided to take the model a step further, and try my hand at SFT - supervised fine tuning. This is the next step in training, and its what turns a base model into an intelligence. Much like a jeweler cutting a diamond, SFT seeks to shape and direct the raw intelligence of the model into producing useful content. 

SFT is remarkably tricky to get right. The model needs to learn how to apply its newfound intelligence, and the scoring and methodology are totally different from pretraining runs. The chart below summarizes the various attempts made to turn 400m v2 into a working chatbot:


| Version | What it was reacting to | Key change |
|----------|------------------------|-------------|
| **(v1/2/v3)** | original attempt | packed conversations + tail token-truncation of long chats — corrupted chat conditioning |
| **v4** | v2 was incoherent | one conversation per row (no packing); long convos drop **oldest** turns instead of truncating the tail; correct `attention_mask`; **real held-out split** (`eval_fraction=0.02`); **behavioral checkpoint selection** — every eval runs a fixed prompt suite and dumps `sample_generations.jsonl` so you pick checkpoints by reading outputs, not just loss; ~300M-token budget |
| **v5** | v4 tried to be a general assistant and was mushy | narrowed the distribution to short answers / rewrites / simple plans / uncertainty; aggressive filtering of code-/JSON-/URL-heavy and repetitive outputs; structured per-checkpoint report |
| **v6** | v5 still produced junk like "Click the Next button" and off-topic itineraries | swapped UltraChat → **smol-smoltalk** (synthesized *for small models*, so a 400M can actually imitate it), 70/30 with OASST-1; switched base to the **v2 pretrain** (`checkpoint-12000`); relaxed length caps; dropped the over-eager `"user-side programming request"` filter; added `no_role_leak` + `topic_adjacent` eval checks; expanded eval suite to 23 prompts across social/persona/multi-turn/factual |
| **v7** | role headers leaked at inference because HF and llama.cpp tokenized `### Assistant:` differently | moved to **ChatML** template, utilizing special reserved tokens for denoting sequence start and end. 


After 7 distinct training attempts, the script finally started to perform, and a working chatbot emerged from the chaos! 

<BlogImage
  src="chatbots-everywhere.webp"
  alt="There's no sign of intelligent life anywhere"
  max-height="300px">
</BlogImage>


## Chatbot.exe

My model was now a trained chatbot, which meant the only remaining step was to load it into an inference engine like [vllm](https://docs.vllm.ai/en/latest/) or [llama.cpp](https://github.com/ggml-org/llama.cpp). These are powerful, open-source engines which are capable of running a model and hosting API endpoints from which to communicate with it. This is the step that turns your model into a service. I've done this dozens of times with a variety of open source models, so surely it would be no trouble at all to load up my new chatbot, right?

. . . right?

<BlogImage
  src="never-goes-smooth.webp"
  alt="Every pretraining run, he's gotta start shouting my name"
  max-height="300px">
</BlogImage>


No! If there's anything I should have learned by now, it's that working with LLMs will fight you every single step of the way! Loading up the model was easy enough. However, I immediatley encountered a new issue - the outputs were complete gibberish. I'd accidentally stumbled my way into a new class of bugs called 'train-serve skew' - the chat template the model was trained to utilize did not match the one the inference engine expected. 

Tracing the problem would take me to the earliest decisions of pretraining. SparkNet was expecting a very simple chat template that looked like this:

```
### System:\n
### User:\n
### Assistant:\n
```


Those `\n` sequences are the culprit. In many computer languages, that would represent a new line (carriage return). Turns out the inference engines were looking for a special newline token that looked like this: `<|im_start|>`. The token representation of a basic aspect of English text broke, and the entire magic decoder ring that turns an LLM's output back into text failed to function. 

Despite the failure for the engines to work, this was a fantastic test! Only by taking the model all the way to the end step was this class of bug discovered. I could now update my training to utilize the correct token sequences in the future. The v2 checkpoint wasn't particularly strong, so finding the error here was a free extra win from an otherwise mediocre run.

<BlogImage
  src="absolute-win.webp"
  alt="It's hardly something worthy of hulking out over"
  max-height="300px">
</BlogImage>

Luckily, SparkNet is a very lightweight model, and therefore relatively straightforward to host. Rather than rely on the major inference engines, I instead spun up a custom OpenAI-compatible API hosting and inference script that could cover my needs. I then pointed [OpenWebUI](https://docs.openwebui.com/) at this endpoint, and at long last, I could directly chat with SparkNet in the browser!

I had the opportunity to demo the SparkNet chatbot to my team at TaxCloud. This was an incredibly cool moment for me - my first model was saying hello and answering questions! Below are some images from the conversations that followed.

*note - in the below screenshots, the model name implies it is hosted by vLLM. That is an artifact of reusing the same port within OpenWebUI*

<BlogImage
  src="SparkChat-Hotdog.webp"
  alt="This question really divided my team when we tried to answer it.">
</BlogImage>


<BlogImage
  src="SparkChat-Strawberry.webp"
  alt="A viral test that stumped AI for a year. The best way to avoid counting wrong is to just avoid counting!">
</BlogImage>

<BlogImage
  src="SparkChat-OpenAI-Comparison.webp"
  alt="I aspire to such levels of confidence!">
</BlogImage>


A Claude competitor, this early SparkNet model is not! However, despite the rough training process, I'm actually very pleased with these answers. It's writing (mostly) coherent English. It uses complete sentences and correct punctuation. The chatbot tuning clearly worked - its taking turns, and tries to reply to the user's prompt. This is honestly not a bad result at all, and is very encouraging for the future of the SparkNet models!


## Looking Ahead to v3

While the v2 run was not a spectacular success, I learned some great lessons from it, and took another step towards my home grown, self-hosted, chatbot objective. It is fascinating to consider that early decisions made in pretraining (such as the chat template) can have massive impacts in the final inference operation. These are only things you can really learn by taking the model through the full loop. I look forward to applying many of these lessons learned to the v3 training run. 

 - Michael Diener





