---
title: "The Return of the Notes"
description: "Programming my way to note-keeping harmony"
date: "4/6/2025"
category: "technology"
tags: ["D&D", "records", "scripting", "python", "notion", "campaign management", "data migration", "gaming"]
titleImage: "return-of-the-notes.png"
readingTime: "10"
---

## Overly elaborate solutions

In the previous blog entry, [Dungeons & Records](/blog/dungeons-and-records), I detailed the record-keeping saga of my ongoing, 7 year, Dungeons and Dragons campaign. However, in classic storytelling form, it ended on a bit of a cliffhanger. Five years of my notes were trapped in [Google Keep](link), and there was no native capability to migrate them to my new preferred solution, [Notion](link). So I did what any self-respecting software engineer would do - I built and overly complex solution to script my way out of the mess!

This solution became [gkeep-to-notion](link). At first, I thought the scripting requirements would be relatively lightweight. Working with [ChatGPT](link), I quickly prototyped a Python-based solution that would process the Google takeout `.json` files, and create simple `.html` documents with the combo of image and text data that represented the note in Google Keep. Naturally, as I worked through the script, the scope expanded. And expanded. Like giving a mouse a cookie, soon it wanted a glass of milk. Except the cookie was Python, and the milk was [pytesseract OCR](link)! 

<ImageWithCaption
  src="./give-a-mouse-python.png"
  alt="Maybe add a side of asyncio?">
</ImageWithCaption>

Before I knew it, I had a full blown solution on my hands. gkeep-to-notion could now process all of the Google takeout files. It would use both pytesseract *and* ChatGPT API for OCR translation of images to text data. I also added a caching ability for each, so as to not re-process the same work as I adjusted other parts of the script. It would also output both html and markdown files, just to add options for import or later processing. 

Using Claude, I would go on to refactor the script. The singular python file had become enormously large, and it was high-time to break the script apart into modular classes. Claude made it simple to add command-line argument parsing and other nicities, adding a proffesional touch to this once-simple project.

All the while, I was creating the output artifacts that needed to be imported into Notion. Run after run, their formatting and sophistication improved. The terminal output was quick and satisfying to behold!

<ImageWithCaption
  src="./terminal-beauty.png"
  alt="Over 200 source notes processed!">
</ImageWithCaption>

## Moving Day