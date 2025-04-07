---
title: "The Return of the Notes"
description: "Programming my way to note-keeping harmony"
date: "4/6/2025"
category: "technology"
tags: ["D&D", "records", "scripting", "python", "notion", "campaign management", "data migration", "gaming"]
titleImage: "return-of-the-notes.png"
readingTime: "10"
---

## Overly Elaborate Solutions

In the previous blog entry, [Dungeons & Records](/blog/dungeons-and-records), I detailed the record-keeping saga of my ongoing, 7 year, Dungeons and Dragons campaign. However, in classic storytelling form, it ended on a bit of a cliffhanger. Five years of my notes were trapped in [Google Keep](https://keep.google.com/), and there was no native capability to migrate them to my new preferred solution, [Notion](https://www.notion.so/). So I did what any self-respecting software engineer would do - I built and overly complex solution to script my way out of the mess!

This solution became [gkeep-to-notion](https://github.com/mdiener87/gkeep-to-notion). At first, I thought the scripting requirements would be relatively lightweight. Working with [ChatGPT](https://chatgpt.com/), I quickly prototyped a Python-based solution that would process the Google takeout `.json` files, and create simple `.html` documents with the combo of image and text data that represented the note in Google Keep. Naturally, as I worked through the script, the scope expanded. And expanded. Like giving a mouse a cookie, soon it wanted a glass of milk. Except the cookie was Python, and the milk was [pytesseract OCR](https://pypi.org/project/pytesseract/)! 

<BlogImage
  src="give-a-mouse-python.png"
  alt="Maybe add a side of asyncio?"
  max-height="500px">
</BlogImage>

Before I knew it, I had a full blown solution on my hands. gkeep-to-notion could now process all of the Google takeout files. It would use both pytesseract *and* ChatGPT API for OCR translation of images to text data. I also added a caching ability for each, so as to not reprocess the same work as I adjusted other parts of the script. It would also output both html and markdown files, just to add options for import or later processing. 

Using Claude, I would go on to refactor the script. The singular python file had become enormously large, and it was high-time to break the script apart into modular classes. Claude made it simple to add command-line argument parsing and other niceties, adding a professional touch to this once-simple project.

All the while, I was creating the output artifacts that needed to be imported into Notion. Run after run, their formatting and sophistication improved. The terminal output was quick and satisfying to behold!

<BlogImage
  src="terminal-beauty.png"
  alt="Over 200 source notes processed!">
</BlogImage>

## Moving Day

Honestly, this is where I left the project for some time. Having 'won' at the game of converting my notes, I quickly got distracted by other endeavors. It was only in writing the prior blog post did I remember that I hadn't actually *moved* the notes into Notion. Surely that was just a technically, right? With all of my notes neatly proccessed, and both .md and .html variants to choose from, surely importing them into Notion would be simple. It has an 'import' button. Just one click, right and we're done, right?

This entire journey has been characterized by my thinking that moving notes about would be simple. This final, easy step.. turned out to be annoyingly difficult. 

First, final cleanup on the notes was needed. Certain note names had misspellings, screwing with their sort. The OCR translation had left ``` code blocks surrounding my notes as well. So I spent some time carefully renaming each file, and bash scripting out errant code block declarations from every .md file. After an hour of two, all of the notes were in impeccable shape. They were ready for import!

Notion can accept a `.zip` file of content. It readily accepted a `.zip` archive of all of my carefully arranged notes. After a few minutes of processing, the process was complete. Finally, all of my D&D notes had been consolidated into Notion!

*Sort of*

The end result was... chaotic.

<BlogImage
  src="notion-pls.png"
  alt="Notion cares not for your organization"
  max-height="500px">
</BlogImage>

Notion would ignore all directories within the uploaded zip, and flatten the end result into one mega page. Worse yet, it would stubbornly refuse to apply any kind of sort order to the imported pages. I tried everything here. I added numerical precursors to each file. I tried using the Notion AI to sort the imported pages (it could only make a new list of page names in alphabetical order - not sort the pages themselves). Nothing worked. Any import via zip would have Notion just randomly deposit pages all over the place. 

I could upload each subdir in turn, which would minimize the chaos to at least related files. However, the idea of re-enacting the quick sort algorithm by hand, dragging each imported page up and down to sort them, tired me. I guess I could count this as "Mission Accomplished". Sort of like shoving all your socks into the drawer without trying to match the pairs, this note-keeping laundry could be considered "finished". But I've come too far. I've scripted too much. There *had* to be a way to get these notes into Notion, whilst preserving their organizational directory and alphabetical sort order.

So, I got back to scripting. With the help of Claude, we quickly spun up a new capability in gkeep-to-notion. Utilizing the Notion public API, a new NodeJS project was built to upload the files directly into a new Notion database - **notion-importer**. This would give programmatic control over the final destination of each note. The socks would be matched, and neatly put away. 

Honestly, this is a cool demonstration of what generative AI can do for you. Writing a small node program to find specific files in a directory, and upload them to an API one-by-one, is not a particularly hard or novel task. This is web programming 102. If I were to do this by hand, it would probably represent a few hours of work. I'd need to look up the various APIs, get their exact syntax particulars down, and then test it out. With Claude and a well-formatted prompt, this became a 5 minute endeavor to add the capability to my existing project. 

With notion-importer in hand, I let it rip. Uploading the files one-by-one via the API was considerably slower than the native zip importer, but I was in no rush. The program merrily did it's thing, and twenty minutes later, my notes had arrived:

<BlogImage
  src="upload-complete.png"
  alt="Upload complete!">
</BlogImage>

Opening the Notion database revealed our final goal had been achieved. All of the notes had arrived. They were correctly organized, correctly sorted. I can open each one, and see the note content derived from OCR. At long last, all of my D&D notes for this campaign exist in one place!

<BlogImage
  src="notion-finished-result.png"
  alt="The Return of the Notes">
</BlogImage>

I do find it a bit bewildering that Notion doesn't have the native ability to sort pages within a page. Having to spin up an entire extra project to manually upload this data via API feels like overkill to me. I'll inevitably find some pro-tip 30 minutes after posting this blog article about how to sort this data without the whole 'use the API thing'. So I'm looking forward to that! 

With my D&D data finally centralized, I can finally utilize it in its entirety for future projects. I'm very curious to try building a [RAG (retrieval augmented generation)](https://blogs.nvidia.com/blog/what-is-retrieval-augmented-generation/)-powered AI that might be able to dynamically answer questions regarding the campaign. Stay tuned - I'll be sure to post about that experiment here on DienerTech!


## Epilogue

One final matter remains. Part of the research I conducted during this project was to evaluate how pytesseract compared to ChatGPT. As a multi-modal AI, ChatGPT can accept an image, perform its own OCR analysis, and attempt to return the text string contained within the image. I encoded both results into each output file, just in case one method missed something. Below are my notes from Season 1, Session 18 - **Consequences**. This represented the close of the first chapter of the D&D campaign. The party had used a powerful weapon - the Doom Cannon - to obliterate an invading Orc army. However, the leader of this army remained. Mutated by the toxicity of the weapon, the Order of Sun and Moon would have to personally defeat this villian to end the Orc threat once and for all. 

Here is the rasterized image that GKeep kept from my original OneNote notes. Which method do you think did the OCR better? Personally, I'm very pleased with pytesseract. It seems to preserve more of the formatting and linebreaks than CGPT was willing to do.

<BlogImage
  src="consequences.png"
  alt="Season 1, Session 17 final boss encounter">
</BlogImage>

### pytesseract OCR Results

```
Final session until the new year! Evan is back, and with him the party is finally reunited!

Probably spend the first few minutes getting Evan back up to speed with the plot and where we are at as a group. Find
out what level he is and etc. PCs will all move up to level 6 at the end of tonight. We just need to put on a good finale for
the winter break!

Current Situation: Tordid is try to claim political control over the weapon. Its her people's property, and it might come in
handy in the future. While she did want to originally destroy the weapon, its use has put Borrend on the map.

>PCs can forcibly destroy weapon, damaging relations with Tordid to a small degree
>PCs can try to persuade her to destroy, but they are going to get some hassle by Broc. Hes starting to see the players
as reckless,

There will be some role playing to hash this out.
Dwarf Guards: 3x Veteran MM 350

Regardless, the weapon has had serious unintended consequences. The area is covered in a toxic
residue that seems to linger and cling to everything. Wildlife that enters the area dies, and there are
reports that some of the dead are coming back as vile monstrosities!

>Somehow, the players will have to face the now mutated form of the Orc leader. His god has
warned him of this moment - of a triumphant final battle, his body covered in burns. His warriors,
scarred beyond recognition. He is ready to face this test, and prove his devotion!

[Manticore Pike]
1D12 piercing - +2 weapon
Heavy, Reach, Two Handed

Loot table:

WarChief_| Megged Blade
+2 Greatsword (208)

Two handed, heavy, cursed: Berserker (DM 155)

Wicked and evil, stained dark with countless victims blood

+1 Ore Chainmail
Surprisingly sophisticated and well fitting. The crest of itineveal is on the right breast.

6 elaborate signet rings bearing the mark of the royal guard

Third Eye _| Stone of good luck in bag full of otherwise generic stones

Burst Ogre | Broom of Flying
100g in swallowed diamonds tied to broom. And severed hand

Ores Potion of greater healing
125g

Captain Floriana
[stats]

HP: 60

AC: 18 (full plate)

STR +3 DEX +1 CON +2 INT +1 WIS +3 CHA +4
Skills: Athletics +4, Perception +2

Actions:
Multi-attack:

Captain's Blade:

Melee Weapon attack +7 to hit; 1D8 +5 / 1D10 +5 two handed

Bonus action: Protection: May impose disadvantage on one melee attack directed at her or her party
within 5ft o her once per round
Sacred Weapon: Can embue weapon with holy energy for CHA bonus to attack for 1 min

[oxified]
Immune to poison damage
Immune to poison, exhaustion condition

Melee hits inflict 1D6 additional poison damage.

'Sheggohn Megged
Toxified Ore War Chief

Same as MM 246 Except as noted:
str+5

HP 115

Toxic Belch: Line effect 20ft long. On hit, DC15 con save or 3d6 poison damage and considered poisoned
for an hour (disadvantage on attack and skills) . Or half as much on save.

Ore Third Eye of Gruumsh (woke orc is woke)
HP: 65

stra

Spells: 1st level (4 slots) inflict wounds, Bane

2nd level (2 slats) hold person, dispel magic (20ft range)(vornit on effect end)

Toxified Ogre
HP 70

Speed 20ft / bulging

Toxic Burst - if Killed by piercing, slashing, or fire damage, explodes in 20ft cloud of toxic fumes.
Creatures that enter must make save as per Toxic Belch effect.

Toxified Ore
ACIS

HP 20

stra

Toxic Grapple: if successfully grapple, can belch in targets face to inflict DC15 con save or 3d6 poison
damage and considered poisoned for an hour (disadvantage on attack and skills). Or half as much on
save.
```

### ChatGPT API OCR Results

```
Final session until the new year! Evan is back, and with him the party is finally reunited!

Probably spend the first few minutes getting Evan back up to speed with the plot and where we are at as a group. Find out what level he is and etc. PCs will all move up to level 6 at the end of tonight. We just need to put on a good finale for the winter break!

Current Situation: Tordid is try to claim political control over the weapon. Its her people's property, and it might come in handy in the future. While she did want to originally destroy the weapon, its use has put Borrend on the map.

>PCs can forcibly destroy weapon, damaging relations with Tordid to a small degree
>PCs can try to persuade her to destroy, but they are going to get some hassle by Broc. Hes starting to see the players as reckless,

There will be some role playing to hash this out.
Dwarf Guards: 3x Veteran MM 350

Regardless, the weapon has had serious unintended consequences. The area is covered in a toxic residue that seems to linger and cling to everything. Wildlife that enters the area dies, and there are reports that some of the dead are coming back as vile monstrosities!

>Somehow, the players will have to face the now mutated form of the Orc leader. His god has warned him of this moment - of a triumphant final battle, his body covered in burns. His warriors, scarred beyond recognition. He is ready to face this test, and prove his devotion!
```
