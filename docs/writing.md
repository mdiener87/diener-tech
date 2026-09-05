# Writing on Diener.Tech

Posts live in `content/blog/`. Use `.templates/new-blog-post.md` as a starting point. An image is optional: a short note should be easy to publish.

## Formats

- **Note:** one observation, result, or update; often 200–500 words.
- **Build log:** what changed, the decisions involved, and what you learned; often 600–1,200 words.
- **Essay:** a developed argument or technical explanation; take the space it needs.

Set `kind` to exactly `Note`, `Build log`, or `Essay`. The writing archive filters by this field. Set a publication `date` in `YYYY-MM-DD` form; dates display consistently across timezones.

For SparkNet posts, add `series: "sparknet"`. That adds the entry to the SparkNet project page and article series navigation. Heading-based navigation appears automatically for articles with more than two top-level table-of-contents entries.

The homepage intentionally curates three entries in `pages/index.vue`. Update that selection when a new article makes a better introduction to the work. The small “Now” update is also maintained there: change both the text and its month when the focus changes.

## A manageable next queue

1. **VectorXR: why I built it.** Start with the VR problem, show the app, explain one difficult product decision. Add a link from the product page once written.
2. **SparkNet: since the last run.** One new result, one graph, and what changed since the evaluation post. Current results need to come from the project, rather than assumptions in site copy.
3. **What building changed about my view of AI.** Ground the industry perspective in specific experiments and engineering decisions.

Keep unfinished drafts outside `content/blog/`; files there are public site content and included in RSS. The promotion note in this branch is reviewable website copy, with no newsletter sending or external posting performed.

## Subscription and feed

The newsletter uses Buttondown’s native HTML form so the service can present validation and confirmation. See [Buttondown’s embedding instructions](https://docs.buttondown.com/building-your-subscriber-base). Do not replace it with a `no-cors` fetch that cannot inspect the result.

RSS recursively serializes article content, including formatting, links, tables, and blog images. Interactive components link back to the article. Run `npm run test:content` (Node 22.6+) to check feed serialization and publication dates.
