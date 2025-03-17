import { Feed } from 'feed';
import { serverQueryContent } from '#content/server';

interface BlogPost {
  title: string;
  _path: string;
  description?: string;
  date: string;
  body?: string;
  image?: string;
}

function serializeContent(content: any): string {
  if (typeof content === 'object') {
    // Convert JSON structure to HTML
    return content.children.map((child: any) => {
      if (child.type === 'element') {
        const children = child.children.map((c: any) => c.value).join('');
        return `<${child.tag}>${children}</${child.tag}>`;
      }
      return '';
    }).join('');
  }
  return String(content || '');
}

export default defineEventHandler(async (event) => {
  // Initialize the feed
  const feed = new Feed({
    title: "Diener.tech Blog",
    description: "Personal portfolio and blog showcasing software development, creative projects, and more",
    id: "https://diener.tech/",
    link: "https://diener.tech/",
    language: "en",
    image: "https://diener.tech/images/default-social.jpg",
    favicon: "https://diener.tech/favicon.ico",
    copyright: `All rights reserved ${new Date().getFullYear()}, Diener.tech`,
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
      content: serializeContent(post.body),
      date: new Date(post.date),
      image: post.image,
    });
  }

  // Set the response headers
  setResponseHeader(event, 'content-type', 'application/xml');
  
  // Return the feed as XML
  return feed.rss2();
}); 