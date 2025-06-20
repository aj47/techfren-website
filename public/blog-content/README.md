# Blog Content

This directory contains all blog posts for the techfren website. The blog system dynamically loads markdown files based on a simple list in the frontend code.

## Adding a New Blog Post

1. Create a new `.md` file in this directory
2. Add the required frontmatter at the top of the file
3. Write your content in markdown
4. Add the filename (without `.md`) to the `BLOG_POST_SLUGS` array in `src/utils/blogUtils.js`

## Required Frontmatter

Each markdown file must include the following frontmatter at the top:

```yaml
---
title: "Your Blog Post Title"
date: "YYYY-MM-DD"
description: "A brief description of your post"
---
```

### Optional Frontmatter

```yaml
tags: ["tag1", "tag2", "tag3"]  # Optional: for categorization
```

## Example: Adding a New Blog Post

1. **Create the markdown file**: `public/blog-content/my-awesome-post.md`
```markdown
---
title: "My Awesome Blog Post"
date: "2025-01-20"
description: "This is an example blog post about awesome things."
---

# My Awesome Blog Post

Your content goes here...

## Section 1

More content...
```

2. **Update the slug list** in `src/utils/blogUtils.js`:
```javascript
const BLOG_POST_SLUGS = [
  'welcome-to-my-blog',
  'building-with-ai-agents',
  'my-awesome-post'  // Add your new post here
];
```

That's it! Your blog post will now appear in the blog.

## File Naming

- Use kebab-case for filenames (e.g., `my-awesome-post.md`)
- The filename (without `.md`) becomes the URL slug
- Avoid spaces and special characters in filenames

## How It Works

The blog system dynamically loads each markdown file and extracts metadata from the frontmatter. No build process or index file is needed - just add your markdown file and update the slug list in the code.

## Notes

- Posts are automatically sorted by date (newest first)
- The slug is generated from the filename
- All markdown features are supported including code blocks, tables, and links
- Images should be placed in the `public` directory and referenced with absolute paths
