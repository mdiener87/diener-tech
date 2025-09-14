---
title: "The Artificial Intelligence Conspiracy"
description: "AI, video frame analysis, and Star Trek: Voyager"
date: "2025-09-08"
category: "technology"
tags: ["ai", "automation", "programming", "philosophy", "star trek"]
titleImage: "the-artificial-intelligence-conspiracy.png"
readingTime: "10"
---

## Fall Vibes

As summer begins its slow fade into fall, it feels good to return to some personal projects and blogging. This summer was full of camping, adventures, and the conclusion of a recent re-watch of [Star Trek: Voyager](https://en.wikipedia.org/wiki/Star_Trek:_Voyager). Voyager is one of my favorite sci-fi shows; I was a kid when it was airing on UPN, and it is definitely the Millennial's Star Trek. Voyager was the perfect blend of advancing CGI, an instantly accessible plot, and unhinged Captain Janeway doing whatever it takes to get her crew home (short of, you know, actually _getting her crew home_).  

I have a personal bit of fan head cannon involving Voyager. It begins in a late Season 5 episode - [Think Tank](https://memory-alpha.fandom.com/wiki/Think_Tank). An enigmatic collection of brilliant aliens go around solving intractable problems for others - but for a price. Turns out, many of the problems they solve were actually caused by their group - it was all just elaborate extortion! With a little Borg-inspired cheating, Voyager manages to out-think the think tank, and escape the episode's quandary.

As part of the cast of the think tank, one in particular always stood out to me. This little guy right here - the so called 'Artificial Intelligence':

<BlogImage
  src="artificial-intelligence.png"
  alt="It's giving 'naming your Squirtle, Squirtle' energy"
  max-height="500px">
</BlogImage>

One of the think tank's members, this Artificial Intelligence named... 'Artificial Intelligence', would have very little screen time. It also proved to be a bit of a security threat, as a download from Seven would lead to the think tank's downfall. Here is where this get's interesting - the Artificial Intelligence would show up several more times throughout the series. Apparently someone in the props department was fond of their work here, and it became a recurring background prop found in several other episodes. Voyager was a bit notorious for this sort of prop reuse - good CGI was still expensive at the time of the show's production.

## The Conspiracy Theory

Here's where I get out my red ball of twine and start to make a mess of my office wall. My head cannon goes something like this: The Artificial Intelligence, having lost its home amongst the think tank, swore itself to vengeance. It would seek out Voyager, and ensure its destruction! As it is what amounts to an alien server rack, the Artificial Intelligence is entirely immobile. In fact, it doesn't even appear to be able to speak - a bit of a miss in a world with a universal translator. If it is to seek out its vengeance, it will have to manipulate others to this effect. Perhaps it hacks into shipping manifests, ensuring its delivery to the next ship or port of call. Maybe it sends out large quantities of spam emails, seeking out the naive and gullable in this most dangerous quadrant of space.

Whatever the case, it is clearly successful - the Artificial Intelligence can be found again and again in the background of Voyager episodes. While it's final vengeance will prove elusive, the Artificial Intelligence proves determined in its cause.

<BlogImage
  src="conspiracy-theory-guy-meme.jpg"
  alt="I haven't even mentioned the Vidiians yet"
  max-height="300px">
</BlogImage>

The MemoryAlpha fandom wiki has a catalog of its appearances. However, I was always under the impression that there were more occurrences of this prop than it (un)officially records. To prove my fan theory, I wanted to build a complete listing of all of its appearances.

One way to solve this problem would just be to scan the episodes on like, 4-8x speed. There are 56 episodes total to search. This includes 6 episodes following Think Tank (season 5, episodes 21-26), 26 episodes in Season 6, and 24 episodes in season 7. At 45 minutes per episode, that would amount to 2,520 min, or 42 hours of content to review. At 8x speed, that's reduced to around five hours of content scanning. Call this the reasonable approach.

Or... we could take an entirely unreasonable approach. In our search for the Artificial Intelligence, we could employ our own, modern, AI. This would elevate our quest from mere fan-theory to ironical overkill, and that's the best kind of fandom! A Trekkie, looking to prove his obscure fan theory involving AIs, _with_ AI? Beam me on up!

<BlogImage
  src="tuvix.jpg"
  alt="Just don't beam up poor Tuvix"
  max-height="500px">
</BlogImage>

## Set a New Course

This fan theory has led me to create [Frame Finder](https://github.com/mdiener87/frame-finder). The objective? To build an analysis engine that can take a reference image, and search the extracted frames of videos for a match. With such a project, I could quickly scan the Voyager episodes for instances where the Artificial Intelligence - or any other selected reference - might appear. A Python-based solution is the natural fit for such a project - this is the language of machine learning and data science. While the project could be done entirely as a CLI tool, I instead built it as a [Flask](https://flask.palletsprojects.com/en/stable/)-based website. This offers significantly improved user experience for working with images and media files over just the terminal.

I've written about Vibe Coding in a previous blog entry - [The Ship of Thesus](/blog/ship-of-theseus). AI-powered coding agents have seen incredible development over the past few months; Frame Finder is the perfect opportunity to test out these new and evolving systems. As part of this project, I made use of:

- [**Kilo Code**](https://github.com/Kilo-Org/kilocode) - A VS Code plugin, and is a fork of the [Cline](https://github.com/cline/cline) and [Roo](https://github.com/RooCodeInc/Roo-Code) projects. Kilo code is interesting, as it provides several types of agentic coding frameworks, such as afn Architect, Coding, Ask, and Debug modes. You can utilize it with any coding LLM, including locally hosted options.
- [**Qwen 3 Coder**](https://qwen3lm.com/) - A Chinese model from [Alibaba](https://www.alibabagroup.com/en-US/document-1853940226976645120), the Qwen series of AI models have seen a ton of development over the last year. These are incredibly capable models, made all the more amazing by their release of open model weights. Qwen 3 Coder is the coding-specialized variant of these models, and aims to take its place among the best of the coding LLMs available.
- [**Qwen Code**](https://github.com/QwenLM/qwen-code) - A CLI tool for Qwen 3 Coder, very similar to [Claude Code](https://www.anthropic.com/claude-code). As part of the initial release of Qwen 3 Coder, Alibaba is giving away a **thousand** uses of the API per day! This free inference works both through the Qwen Code CLI tool, as well as 3rd party applications (such as Kilo Code). You could code all day and never hit this API limit!
- [**OpenAI Codex**](https://github.com/openai/codex) - OpenAI released Codex as a competitor to Claude Code. Sporting web, CLI, and VS Code plugin options, there's plenty of ways to make use of it. OpenAI has recently upgraded the coding model to GPT 5, and it really cooks! I was very pleased with both the ease of use, and powerful development results, that Codex provided for the project.
- [**Claude Code**](https://www.anthropic.com/claude-code) - A powerful CLI tool for utilizing [Claude](https://claude.ai) as a coding agent. Claude is one of, if not the best, coding agents presently available. I had previously utilized Claude to accelerate my development of [DienerTech](diener.tech). I wanted to try out the above coding systems for this project, and so only sparingly made use of Claude.

## AI Coding Our AI-Powered AI Finder

At the outset of this project, I made use of Qwen 3 Coder with Kilo Code plugin. I found this to be an interesting combination - Qwen 3 is a very fast coding agent, and Kilo Code helped with creating detailed PRD (product requirement documentation) that would help guide the coding process. Actually spinning up the core of Frame Finder, including the API routes and front-end, all went quite smoothly. Despite this initial success, however, I soon started encountering a critical problem: the analysis engine, the very heart of our app, was not providing useful results.

Using [ffmpeg](https://ffmpeg.org/) (a powerful utility for working with video files), I had extracted two short clips from the _Think Tank_ episode. These would serve as a positive and negative control test for the analysis logic. Ideally, the positive test case would result in a very high confidence match, while the negative test case would result in a very low confidence test match. In practice, I was finding that the confidence values of both tests were practically identical:

<BlogImage
  src="frame-finder-ambiguous-analysis.png"
  alt="These results aren't very useful at all"
  max-height="500px">
</BlogImage>

It doesn't matter if the rest of the Flask app worked perfectly - if the analysis engine doesn't provide useful results, the whole project is for nought. And so, I did what any Vibe Coder would do - I asked the AI to fix the issue. Rewrite the issue. Ignore the previous implementation and start anew. I would try Qwen Code, dropping Kilo Code, to see if that made the difference (it did not). I would copy my analysis logic into ChatGPT, and ask for a code review - how can we get this to work? While Chat had lots to say on the topic, none of it proved useful.

In our search for the Artificial Intelligence, this project also underlined the danger on programming that relies on Artificial Intelligence. When I built [DienerTech](diener.tech) website, I in part made use of 'vibe coding'. As a software engineer with years of web dev experience, I already knew what libraries I wanted to use, how they should interact, and could quickly review any AI code for accuracy and completeness. By contrast, the analysis logic for Frame Finder was **Vibe Coding**. I haven't written feature extraction and image comparison logic before. I don't know what the fundamental principles behind such algorithms are. Each time I had the AI create a new algorithm from scratch, it all looked the same to me: plausible. We had truly entered the truth of this meme:

<BlogImage
  src="my-code-works.jpg"
  alt="Until observed, the code both works and doesn't work simultaneously"
  max-height="300px">
</BlogImage>

Sometimes, a negative result is how a project works out. It wouldn't be very satisfying, but I could have made this blog post about exactly this failure: That Vibe Coding had taken me down a blind alley it couldn't escape from. Perhaps the only way to get my desired results would be to roll up my sleeves, and actually study the involved libraries. For a fun meme project built around a niche fan theory, that seemed like a bit too much effort.

So, I channeled my inner Janeway, and made an appeal to a different LLM. Rather than utilize Qwen 3 Coder, I swapped to OpenAI's Codex with GPT-5.

<BlogImage
  src="appeal-to-the-devil.jpg"
  alt="If OpenAI is the Borg, does that make Anthropic the Dominion?"
  max-height="500px">
</BlogImage>

I tasked Codex with the purpose of the project, and the desire to scrap and re-implement the analysis logic (now on the third such branch of engine rewrites). Then I let it do its thing. To my great surprise, Codex quickly one-shot the implementation, and built an analysis engine that was producing useful results right away! The improvement was all down to a change in our analysis framework: all prior attempts made use of [CLIP](https://opencv.org/blog/clip/), which is a method to describe an image with natural language. Instead, the Codex code would make use of [ORB](https://docs.opencv.org/3.4/d1/d89/tutorial_py_orb.html), which is a method to compare the features of one image to that of another. This is exactly what I had intended all along in the project! However, none of the prior AI coding attempts chose the right tool. Not being intimately versed in the subject matter of image comparison, I couldn't spot that our prior attempts were approaching the task from the wrong angle.

Powered with this new ORB based approach, we quickly got very distinct results between positive and negative test cases:

<BlogImage
  src="frame-finder-working-analysis.png"
  alt="Now that's a clear result!"
  max-height="500px">
</BlogImage>

## The Devil in the Details

So is the lesson here that OpenAI Codex is better than Qwen Coder? Or that GPT-5 is a better coding model than Qwen 3 Coder? That if one just used the super-best AI coding agent, all things work out? I'm not so sure. While I _am_ very impressed with the speed and efficacy of OpenAI Codex (and I would go on to make several other improvements to the project using this tool), I'm not convinced this example alone is enough to issue any kind of final verdict.

I had asked ChatGPT several times about the analysis engine for Frame Finder, even before writing a single line of code. In all of our conversations, ORB never came up. And yet, GPT-5 is the same underlying model that Codex currently employs, and that one-shot our working analysis logic! The unsettling truth is, these coding agents are all non-deterministic. Maybe I just phrased the prompt in a slightly different way, and Codex finally got the robotic 'aha!' moment needed to swap implementation approaches. Maybe the existing code, used as part of the prompt context, subtly influenced the final result. Who can say? If I had prompted Qwen 3 Coder for an ORB-based approach, I have no doubt it could have implemented one. But I didn't know to ask, and my prompt didn't lead to that result.

Finally, I also made brief use of Claude Code to upgrade the analysis engine, which would now offer three levels of search: Fast, Balanced, and Thorough. These offer tradeoffs between speed, accuracy, and precision. The more in-depth search can find small details the other modes might miss, but at increasing time-complexity, and higher likelihoods of false positives. 

## Tracking the Artificial Intelligence

With Frame Finder now producing useful results, we can let it rip on Voyager's episodes. Frame Finer found the Artificial Intelligence in the following episodes:

- Season 5, Episode 20: Think Tank
- Season 6, Episode 9: The Voyager Conspiracy
- Season 7, Episode 9: Flesh and Blood

This exactly matches Memory Alpha's listing. I could have *sworn* that there were more uses of the prop than just one per season. While that's enough to make for a fun pet theory, it's not quite the grandiose conspiracy as I had imagined it.

## Finding The Blue Sun

As a bit of a final test, let's test Frame Finder out on a new target. I thought finding [The Blue Sun](https://firefly.fandom.com/wiki/Blue_Sun_Corporation) from [Firefly](https://www.imdb.com/title/tt0303461/) would make for another interesting test. The Blue Sun logo can be found throughout the Firefly universe, often hiding in plain sight. This makes for an interesting test of Frame Finder's capabilities. The (un)official wiki has this list of [appearances](https://firefly.fandom.com/wiki/Blue_Sun_Corporation#Appearances). Focusing on just the pilot episode, can we find any others?

<BlogImage
  src="frame-finder-firefly.png"
  alt="Now that's hiding in plain sight!"
  max-height="500px">
</BlogImage>

Utilizing the Balanced preset, Frame Finder found a Blue Sun logo not in the official wiki! This is an exciting result, and proves the project has some real utility. The reference the Wiki does mention - a logo on the 'cry baby' satellite - can also be located using Frame Finder's Thorough setting. However, the confidence interval here is lower - the logo is heavily obscured. 

While Frame Finder failed to prove my own theory involving the Artificial Intelligence, it has still been an interesting project to work on! Please feel free to try out [Frame Finder](https://github.com/mdiener87/frame-finder) for yourself, and watch this space for further projects and experiments!

 - Michael