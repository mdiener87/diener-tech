# Blog Components

This directory contains reusable Vue components specifically for blog functionality.

## SocialShareButtons

A configurable component for displaying social media sharing buttons with proper corporate logos.

### Usage

```vue
<template>
  <SocialShareButtons 
    :url="pageUrl" 
    :title="postTitle"
    :platforms="['copy', 'linkedin']"
  />
</template>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `platforms` | `Array<string>` | `['copy', 'linkedin']` | Array of platforms to display. Currently supports: 'copy', 'linkedin', 'facebook', 'email' |
| `url` | `string` | (required) | The URL to share |
| `title` | `string` | `''` | The title to share (for platforms that support it) |
| `showHeading` | `boolean` | `true` | Whether to show the heading above the buttons |
| `heading` | `string` | `'Share this post'` | Text for the heading |

### Adding New Platforms

To add support for a new social media platform:

1. Add a new conditional block in the template section
2. Use the appropriate corporate logo SVG
3. Update the `platforms` prop description in the script
4. Update this documentation

### Example with All Available Platforms

```vue
<SocialShareButtons
  :url="pageUrl"
  :title="postTitle"
  :platforms="['copy', 'linkedin', 'facebook', 'email']"
  heading="Share this article"
  :showHeading="true"
/>
```
