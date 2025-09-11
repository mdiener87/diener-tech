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

As summer begins its slow fade into fall, it feels good to return to some personal projects and blogging. This summer was full of camping, adventures, and the conclusion of a recent re-watch of Star Trek: Voyager [link]. ST:V is one of my favorite sci-fi shows. I was a kid when it was airing on UPN, and it was definitley the millienal's star trek. Star Trek: The Next Generation is of course a classic, but it belonged more to my Dad than I. Deep Space Nine had the most world-building of any Trek, but it was a bit too dense for a kid to parse. Voyager, meanwhile, was the perfect blend of advancing CGI, an instantly accessible plot, and unhinged Captain Janeway doing whatever it takes to get her crew home (short of, you know, actually *getting her crew home*).

I have a personal bit of fan head cannon involving Voyager. It begins in a late Season 5 episode - *Think Tank* ([link]). An enigmatic collection of brilliant aliens go around solving intractable problems for others - but for a price. Turns out, many of the problems they solve were caused by their group, so as to engineer a desired payment. with a little Borg-inspired cheating, Voyager manages to out-think the think tank, and escape the episode's quandry. 

As part of the cast of the think tank, one in particular always stood out to me. This little guy right here - the so called 'Artificial Intelligence':

<BlogImage
  src="artificial-intelligence.png"
  alt="It's giving 'naming your Squirtle, Squirtle' energy"
  max-height="500px">
</BlogImage>

One of the think tank's members, this Artificial Intelligence named... 'Artificial Intelligence', would have very little screen time. It also proved to be a bit of a security threat, as a download from Seven would lead to the think tank's downfall. Here is where this get's interesting - the Artificial Intelligence would show up several more times throughout the series. Apparently someone in the props department was fond of their work here, and it became a recuring background prop found in several other episodes. Voyager was a bit notorious for this sort of prop reuse - good CGI was still expensive at the time of the show's production.

## The Conspiracy Theory

So here's where I get out my red ball of twine and start to make a mess of my office wall. My head cannon goes something like this: The Artificial Intelligence, having lost its home amongst the think tank, swore itself to vengeance. It would seek out Voyager, and ensure its destruction! As it is what amounts to an alien server rack, the Artificial Intelligence is entirely immobile. In fact, it doesn't even appear to be able to speak - a bit of a miss in a world with a universal translator. If it is to seek out its vengance, it will have to manipulate others to this effect. Perhaps it hacks into shipping manifests, ensuring its delivery to the next ship or port of call. Maybe it sends out large quantities of spam emails, seeking out the naive and gulliable in this most dangerous quadrant of space. Whatever the case, it is clearly succesful - the Artificial Intelligence can be found again and again in the background of Voyager episodes. While it's final vengeance will prove elusive, the Artificial Intelligence proves determined in its cause.

<BlogImage
  src="conspiracy-theory-guy-meme.jpg"
  alt="I haven't even mentioned the Vidiians yet"
  max-height="300px">
</BlogImage>

There's just one flaw in my headcannon - I don't *actually* have a listing of which episodes the Artificial Intelligence appears in. I know it appears in the background as an unnamed prop in several episodes following *Think Tank*. However, memory alpha has no catalog of its appearances. If the official Fandom doesn't have it, you know you're in deep!

So, one way to solve this problem would just be to scan the episodes on like, 2-4x speed. It might take a few hours of semi-attentive watching, but it would be fairly straightforward to find all of the uses of this prop. There are 56 episodes total to search. This includes 6 episodes following Think Tank (season 5, episodes 21-26), 26 episodes in Season 6, and 24 episodes in season 7. That's a reasonable amount of episodes to search through by hand. 

Or... we could take an entirely unreasonable approach. In our search for the Artificial Intelligence, we could employ our own, modern, AI. This would elevate our quest from mere fan-theory to ironical overkill, and that's the best kind of fandom! A Trekkie, looking to prove his obscure fan theory involving AIs, *with* AI? Beam me on up!

<BlogImage
  src="tuvix.jpg"
  alt="Just don't beam up poor Tuvix"
  max-height="500px">
</BlogImage>

## Set a New Course

This ultra-conspiritorial fan theory has led me to create Frame Finder [link]. The objective? To build an analysis engine that could take a reference image, and search the extracted frames of provided video content for a match. With such a project, I can quickly scan the Voyager episodes for instances where the Artificial Intelligence - or any other selected prop - might appear in. All of the involved machine learning libraries are in Python, and so a Python-based solution is the natural fit. While the involved search could be done entirely in the terminal, I thought a simple web interface would make for a more pleasent experience, and so I chose Flask to serve as the web framework. With these simple selections made, I let the AI build my AI detector.

I've written about Vibe Coding in a previous blog entry - the ship of thesus [link]. AI powered coding agents have seen incredible development over the past few months, and just summarizing the evolving landscape of such capabilities would result in a small novel The blistering pace of AI development is simultaneously inspiring *and* intimidating. Frame Finder is the perfect opportunity to test out these new systems, and so as part of this project, I made use of the following new systems:

- **Kilo Code** [link] - A VS Code plugin, and is a fork of the Cline [link] and Roo [link] projects. Kilo code is interesting, as it provides several types of agentic coding frameworks, such as an Architect, Coding, Ask, and Debug modes. You can utilize it with any coding LLM, including locally hosted options. Kilo Code is also giving $5 in free API credits for trying out their product.

- **Qwen 3 Coder** - A Chinese model from Alibaba [link], the Qwen series of AI models have seen a ton of development over the last year. These are incredibly capable models, made all the more amazing by their release of open weights. This allows anyone to run the models locally, or to perform their own fine-tuning or further R&D of the model. Qwen 3 Coder is the coding-specialized variant of these models, and aims to take on the legendary Claude [link] in coding capability.

- **Qwen Code** - A CLI tool for Qwen 3 Coder, very similiar to Claude Code [link]. As part of the initial release of Qwen 3 Coder, Alibaba is giving away a **thousand** uses of the API per day! This free inference works both through the Qwen Code CLI tool, as well as 3rd parky links such as Kilo Code. This is an incredibly generous offer for a very powerful AI coding model. You could code all day and never hit this API limit! Of course, part of the free offer here is that they want to study your API requests to further improve their products and services. As anything in the software world - if it's free, you're the product. Privacy is a real concern when building software projects, and it's important to understand the implications of using any cloud-hosted AI model or service. For my purposes here, I'm not concerned - I always planned to open the github repo of Frame Finder to begin with! However, if you are working on something sensitive and highly proprietary - you should definitley think carefully about your AI use policy.

- **OpenAI Codex** - OpenAI has had Codex[link] out for a little while as a competitor to Claude Code. Sporting web, CLI, and VS Code plugin options, there's plenty of ways to make use of it. OpenAI has recently upgraded the coding model to GPT 5, and it really cooks! 



## AI Coding Our AI-Powered AI Finder

At the outset of this project, I made use of Qwen 3 Coder with Kilo Code plugin. I found this to be an interesting combination - Qwen 3 is a very fast coding agent, and Kilo Code helped with creating detailed PRD (product requirment documentation) that would help guide the coding process. Actually spinning up the core of Frame Finder, including the API routes and front-end, all went quite smoothly. Despite this initiall success, however, I soon started encountering a critical problem: the analysis engine, the very heart of our app, was not providing useful results.

<insert picture here of a different fork showing bad results></insert>

Using ffmpeg [link], I had extracted two short clips from the *Think Tank* episode. These would serve as a positive and negative control test for the analysis logic. Ideally, the positive test case would result in a very high confidence match, while the negative test case would result in a very low confidence test match. In practice, I was finding that the confidence values of both tests were practically identical. Scanning full episodes had similiar results - there was no meaningful differentiation between episodes that had the prop (*Think Tank*) and episodes that did not (such as *The Fight*, the episode before *Think Tank*).

It doesn't matter if the rest of the Flask app worked perfectly - if the analysis engine doesn't provide useful results, the whole project is for nought. And so, I did what any Vibe Coder would do - I asked the AI to fix the issue. Rewrite the issue. Ignore the previous implementation and start anew. I would try Qwen Code, dropping Kilo Code, to see if that made the difference (it did not). I would copy my analysis logic into ChatGPT, and ask for a code review - how can we get this to work? While Chat had lots to say on the topic, none of it proved useful.

In our search for the Artificial Intelligence, this project also underlined the danger on programming that relies on Artificial Intelligence. When I built the diener.tech website [link], I used 'vibe coding', with lowercase. As a software engineer with years of webdev experience, I already knew what libraries I wanted to use, how they should interact, and could quickly review any AI code for accuracy and completness. By contrast, the analysis logic for Frame Finder was 'Vibe Coding', with uppercase letters. I haven't written video extraction and image comparison logic before. I don't know what the fundemental principles behind such algorithims are. Each time I had the AI create a new algorithim from scratch, it all looked the same to me - plausible. We had truly entered the truth of this meme:

<BlogImage
  src="my-code-works.jpg"
  alt="Until observed, the code both works and doesn't work simultaneously"
  max-height="500px">
</BlogImage>

Sometimes, a negative result is how a project works out. It wouldn't be very satisifying, but I could have made this blog post about exactly this failure: That Vibe Coding had taken me down a blind alley it couldn't escape from. Certianally, this is a result that many Vibe Coded projects have resulted in - if the generated code is not understood and carefully reviewed, then you fundementally don't know how it works. You won't know how it might break, nor how it might be improved. Organically sourced code can have bugs and gotchas of course, but the very act of writing code by hand forces a certain familiarity with its implementation. If I wanted to understand how this image analysis and comparison logic worked, I'd have to study the involved libraries, understand how they worked, and make my own opinion on the matter. 

Which, would be a lot of work! For a fun meme project around a niche fandom conspiracy, that seemed like too much effort. 

So, I switched gears slightly, and changed out the underlying LLM. Rather than utilize Qwen 3 Coder, I swapped to OpenAI Codex (VS Code plugin) and GPT 5.

<BlogImage
  src="appeal-to-the-devil.jpg"
  alt="Would this analogy make Claude the Dominion?"
  max-height="500px">
</BlogImage>

I tasked Codex with the purpose of the project, and the desire to scrap and re-implement the analysis logic (now on the third such branch). Then I let it do its thing. To my great surprise, Codex quickly one-shot the implementation, and built an analysis engine that was producing useful results right away! The improvement was all down to a change in our analysis framework: all prior attempts made use of CLIP [link], which is a method to classifiy or describe an image. Instead, the Codex code would make use of ORB [link], which is a method to compare pixels of one image to the pixels of another. This is exactly what I had intended all along in the project! However, none of the prior AI coding attempts chose the right tool. Not being intimatley versed in the subject matter of image comparison, I couldn't spot that our prior attempts were approaching the task from the wrong angle.

Powered with this new ORB based approach, we quickly got very distinct results between positive and negative test cases:
 
<insert image of the test results></insert>

## The Devil in the Details

So is the lesson here that OpenAI Codex is better than Qwen Coder? Or that GPT-5 is a better coding model than Qwen 3 Coder? That if one just used the super-best AI coding agent, all things work out? I'm not so sure. While I *am* very impressed with the speed and efficacy of OpenAI Codex (and I would go on to make several other improvements to the project using this tool), I'm not convinced this example alone is enough to issue any kind of final verdict. 

I had asked ChatGPT several times about the analysis engine for Frame Finder, even before writing a single line of code. In all of our conversations, ORB never came up. And yet, GPT-5 is the same underlying model that Codex currently employs, and that one-shot our working analysis logic! The unsettling truth is, these coding agents are all non-deterministic. Maybe I just phrased the prompt in a slightly different way, and Codex finally got the robotic 'aha!' moment needed to swap implementation approaches. Maybe the existing code, used as part of the prompt context, subtly influenced the final result. Maybe the date and time parameter, silently injected in the context, led to a butterfly effect cascade through its various weights that finally led us to the ORB-based algorithim. Who can say? If I had prompted Qwen 3 Coder for an ORB-based approach, I have no doubt it could have implemented one. But I didn't know to ask, and my prompt didn't lead to that result.

This is the true limitation and danger of 'Vibe Coding'. When we rely on the auto-pilot of code generation - espicially in domains with which we aren't already familiar - it becomes impossible to verify our results one way or another. Even using other LLMs to code review the resulting code might not meaningufly lead to any new insights. Results like these give me confidence that the age of the software engineer is far from over. And yet, without knowing how to build something very specific, I was able to prod the AI to build the thing without any meaningful technical oversight on my part. The scifi future of coding truly is here - whatever that means in practice.


## Tracking the Artificial Intelligence

With Frame Finder now producing useful results, we can let it rip on the various Voyager episodes. Based on our new algorithm, we can find the Artifical Intelligence in the following episodes:

- Think Tank
-....

Is this listing complete and accurate? Who can say! I'll have to do a double check the next time I find myself rewatching Star Trek: Voyager. Until then, feel free to use Frame Finder, and empower your own obscure fandom conspiracy theories!

