# Blog Image Organization

This document describes the image organization approach used in the blog.

## Structure

Images for blog posts are stored in the following location:

```
public/images/blog/<blog-post-slug>/<image-filename>
```

For example, for a blog post with the slug `return-of-the-notes`, the images would be in:

```
public/images/blog/return-of-the-notes/image1.webp
public/images/blog/return-of-the-notes/diagram.webp
```

## Image Path Resolution

The site uses a utility to handle image path resolution:

1. **Absolute Paths**: If a path starts with `/` or `http`, it's used as-is
2. **Relative Paths**: For paths like `image.webp`, they're resolved to `/images/blog/<blog-post-slug>/image.webp`

## Components

### BlogImage

The `BlogImage` component automatically resolves image paths based on the current route:

```md
<BlogImage 
  src="image.webp" 
  alt="My Image" 
  caption="Optional caption text"
/>
```

For a post at `/blog/my-post`, this will display the image from:
`/images/blog/my-post/image.webp`

You can also provide an explicit context:

```md
<BlogImage 
  src="image.webp" 
  context="custom-folder" 
  alt="My Image"
/>
```

### Blog Post Title Images

Title images for blog posts follow the same resolution logic. In your frontmatter, you can use:

```yaml
---
title: My Amazing Post
date: 2023-01-01
titleImage: header.webp
---
```

This will resolve to `/images/blog/my-amazing-post/header.webp`.

## Implementation Details

The implementation uses the following components:

1. **Image Path Resolver**: A utility that resolves paths based on context
2. **useImagePath Composable**: A Vue composable for consistent image path resolution

This approach keeps images organized by blog post, allowing for easier management and organization.
