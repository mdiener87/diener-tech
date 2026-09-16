import { Feed } from 'feed';
import { serverQueryContent } from '#content/server';
import { serializeContent } from '../utils/feedContent';

interface BlogPost {
  title: string;
  _path: string;
  description?: string;
  date: string;
  body?: string;
  image?: string;
}

export default defineEventHandler(async (event) => {
  // Initialize the feed
  const feed = new Feed({
    title: "DienerTech Blog",
    description: "AI engineering, open source software, and lessons from the workshop. Notes, build logs, and essays by Michael Diener.",
    id: "https://diener.tech/",
    link: "https://diener.tech/",
    language: "en",
    image: "https://diener.tech/images/default_image.webp",
    favicon: "https://diener.tech/favicon.ico",
    copyright: `All rights reserved ${new Date().getFullYear()}, DienerTech`,
    feedLinks: {
      rss2: "https://diener.tech/feed.xml",
    },
  });

  // Fetch all blog posts
  const posts = await serverQueryContent<BlogPost>(event, 'blog')
    .where({ _partial: false })
    .sort({ date: -1 })
    .find();

  // Add each post to the feed
  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: `https://diener.tech${post._path}`,
      link: `https://diener.tech${post._path}`,
      description: post.description || post.title,
      content: serializeContent(post.body, post._path),
      date: new Date(post.date),
      image: post.image,
    });
  }

  // Set the response headers
  setResponseHeader(event, 'content-type', 'application/xml');
  
  // Return the feed as XML
  return feed.rss2();
}); 