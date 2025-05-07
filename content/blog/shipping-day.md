---
title: "Shipping Day"
description: "Taking DienerTech from Localhost to Launch"
date: "2025-06-05"
category: "DienerTech"
tags: ["blogging", "webdev", "career", "productivity", "programming"]
titleImage: "shipping-day.png"
readingTime: "5"
---

## One Month Live

I want to start this post with a huge thank you for everyone that has visited my website so far! The response to DienerTech has been far more than I dared to hope for. Feedback from family, friends, and colleagues alike has been exceptionally positive. I'm very grateful for the warm reception this website has received! I also posted my first-ever Linkedin post advertising the launch of the site. This also blew me away in its response. Thank you all for taking the time to check out my work, read my blog, and especially leave a comment or two!

#### Everyone loves metrics

Here’s the scoreboard from the first 30 days

| Metric                         | Value (Est.)                         | Notes                                                                          |
| ------------------------------ | ------------------------------------ | ------------------------------------------------------------------------------ |
| 🧠 **LinkedIn Impressions**    | 1,176                                | My first-ever post - got more reach than I expected!                             |
| 👤 **Unique LinkedIn Viewers** | 534                                  | Mostly senior engineers in dev roles (hi, friends 👋)                          |
| 💬 **Engagement**              | 32 reactions, 14 comments, 2 reposts | \~9% engagement rate. Big thanks to everyone who showed up with support ❤️     |
| 🌐 **Estimated Site Visitors** | \~1,300                              | Based on 10% Cloudflare sample - people really clicked!                          |
| 📄 **Estimated Page Views**    | \~2,300                              | Visitors averaged \~1.8 pages - folks stuck around to explore                    |
| 🔗 **From LinkedIn**           | \~100 visitors                       | \~19% click-through from unique viewers - shockingly high!                       |
| 🖥️ **Top OS**                 | Windows (120 views sampled)          | Very desktop-heavy audience - fellow devs doing the clicking                     |
| 📱 **Device Split**            | \~1,600 Desktop / \~700 Mobile       | Desktop users did most of the reading and link-following                       |
| 🧭 **Most Visited Pages**      | `/`, `/career`, `/about`, `/blog`    | People checked me out personally *and* professionally - exactly what I hoped for! |
| 🤖 **GoogleBot**               | \~500 crawls                         | Apparently, the robots were excited too                                        |



## Out the Door

I was out to dinner with my girlfriend. She had been food primed for breadsticks earlier in the day, and so our impromptu dinner plans quickly centered on this staple Italian restaurant. Over pasta and wine, I was incessantly discussing my latest development progress on DienerTech. Over the last few months, I'd developed insane levels of project energy. Normally it's difficult to meaningfully code in one's spare time. After working on software all day in my day job, it's helpful - even healthy! - to touch grass. Or barring that, at least playing a video game or something. Doubling down on coding is *hard* - especially if that coding isn't a trivial toy example, but a meaningful project (say, a personal website with your name on it?). Nonetheless, I'd been bit by the project bug. I put in some long days, and numerous late-night commits, into this project. I could feel it nearing completion. Perhaps another week or two of work. My girlfriend, ever wise, simply suggested - "Why not launch it tonight? It's ready!"

You know what? She was right. It *was* ready. Or, almost ready, at any rate. It would take me the rest of the night, but I launched my website on Cloudflare that night (read: early morning the next day). Building and launching a project is an incredible feeling. While I work on code all day long, these projects are largely already live. Its ongoing work, not the inaugural first flight.

Of course, there were some bumps discovered shortly after takeoff. The two biggest were:

1) The Contact page was *completely* broken. Even worse - it would claim contact submissions had succeeded. 
2) The Cloudflare Analytics engine wasn't correctly recording data. 

#### Contact Page
The Contact page turned out to be severely broken. I had never been able to fully end-to-end test this during development, as I was attempting to use Cloudflare's integrated email functionality. Running the website in development on localhost, the necessary Cloudflare infrastructure wasn't present to actually test this capability. Naturally, it didn't magically start working while deployed. Diving into the issue after launch, I discovered this approach likely would have never worked out. So I went back to the drawing board, and re-evaluated my options. [Resend](https://resend.com/) quickly came to the forefront for an alternative implementation. Their service is API-based, and includes a generous free tier. This simple approach standardized the email functionality, allowing it to behave the same in development and production modes alike!

#### Analytics
In keeping with the Cloudflare ecosystem, I elected to use their integrated and privacy conscious [Cloudflare Analytics](https://www.cloudflare.com/web-analytics/) engine to handle my analytics needs. However, despite my repeated refreshing of the analytics dashboard - no data was coming through. I kept reading it might take several hours for stats to appear... but the stats never came. When I later deep dived the problem, I found my analytics token was slightly misconfigured, and so I never got my stats. 

## Lessons Learned

As launch issues go, these are both pretty minor. The website, fundamentally, *worked*. It is performant, mobile-friendly, and packed full of features. It expresses my talent, style, and capability as a modern web engineer. The largest impact from the launch issues came from some missing emails. I linked my now-live website to all my family and friends in a sort of soft-launch, before advertising on Linkedin. It seems several of them sent me nice messages congratulating me on my website. Sadly, those messages would never arrive. It's a good lesson - always ensure that your work is testable. If you are assuming something is going to start working in Production, that was never even testable in Development... you are probably going to have a bad time! 😱

The other takeaway is that my girlfriend was right - this website *was* ready to launch. Left to my own devices, I'd have obsessed over every last detail for at least another month or two. There will always be things to tweak once you're live. That's the beauty of software - you can always update it later! Rather than trying to be perfect, I leaned into perfect-enough. It's been a genuine pleasure to build and launch DienerTech. Thank you for joining me on this journey!


## What's Next?

I've taken a short but well-earned break after launching DienerTech and ironing out post-launch tweaks. But I'm already cooking up some exciting new projects that I'm eager to share:

- **Docker & Local AI Inference** - How to build your very own AI Lab! 
- **Project Triskelyon** - My most ambitious project to date! An orchestration platform for local, agentic AI. 
- **DienerTech LLC** - It's not just a website - we've gone corporate! 

If any of that sounds interesting, stick around - there’s plenty more coming.


Thanks again for visiting, and for cheering on a one‑person dev shop chasing big ideas.

— Michael
