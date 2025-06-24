// Simple frontmatter parser for browser environment
const parseFrontmatter = (content) => {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content };
  }

  const [, frontmatterStr, bodyContent] = match;
  const data = {};

  // Parse YAML-like frontmatter
  const lines = frontmatterStr.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const colonIndex = trimmed.indexOf(':');
    if (colonIndex === -1) continue;

    const key = trimmed.substring(0, colonIndex).trim();
    let value = trimmed.substring(colonIndex + 1).trim();

    // Remove quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    // Handle arrays (simple format: ["item1", "item2"])
    if (value.startsWith('[') && value.endsWith(']')) {
      try {
        value = JSON.parse(value);
      } catch (e) {
        // If JSON parsing fails, keep as string
      }
    }

    data[key] = value;
  }

  return { data, content: bodyContent };
};

// List of blog post slugs - add new blog post filenames here (without .md extension)
const BLOG_POST_SLUGS = [
  'future-of-software'
];

// Load blog posts index by fetching each markdown file
export const loadBlogIndex = async () => {
  try {
    const posts = [];

    // Fetch each blog post and extract metadata
    for (const slug of BLOG_POST_SLUGS) {
      try {
        const response = await fetch(`/blog-content/${slug}.md`);
        if (!response.ok) {
          console.warn(`Failed to load blog post: ${slug}`);
          continue;
        }

        const markdown = await response.text();
        const { data: frontmatter } = parseFrontmatter(markdown);

        // Validate required fields
        if (!frontmatter.title || !frontmatter.date || !frontmatter.description) {
          console.warn(`Skipping ${slug}: Missing required frontmatter (title, date, or description)`);
          continue;
        }

        // Create blog post entry
        const post = {
          slug,
          title: frontmatter.title,
          date: frontmatter.date,
          description: frontmatter.description,
          // Include other frontmatter fields if they exist
          ...frontmatter
        };

        posts.push(post);
      } catch (error) {
        console.error(`Error loading blog post ${slug}:`, error);
      }
    }

    // Sort posts by date (newest first)
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error('Error loading blog index:', error);
    return [];
  }
};

// Load individual blog post
export const loadBlogPost = async (slug) => {
  try {
    const response = await fetch(`/blog-content/${slug}.md`);
    if (!response.ok) {
      throw new Error(`Failed to load blog post: ${slug}`);
    }
    const markdown = await response.text();
    const { data: frontmatter, content } = parseFrontmatter(markdown);

    return {
      slug,
      frontmatter,
      content,
      ...frontmatter
    };
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error);
    return null;
  }
};

// Format date for display
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Generate excerpt from content
export const generateExcerpt = (content, maxLength = 150) => {
  // Remove markdown formatting for excerpt
  const plainText = content
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return plainText.substring(0, maxLength).trim() + '...';
};

// Search posts by title or description
export const searchPosts = (posts, query) => {
  if (!query) return posts;
  const lowercaseQuery = query.toLowerCase();
  return posts.filter(post =>
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.description.toLowerCase().includes(lowercaseQuery)
  );
};

// Get reading time estimate
export const getReadingTime = (content) => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

// Get related posts based on tags
export const getRelatedPosts = (currentPost, allPosts, limit = 3) => {
  if (!currentPost.tags || currentPost.tags.length === 0) {
    return allPosts
      .filter(post => post.slug !== currentPost.slug)
      .slice(0, limit);
  }

  const relatedPosts = allPosts
    .filter(post => post.slug !== currentPost.slug)
    .map(post => {
      const commonTags = post.tags 
        ? post.tags.filter(tag => currentPost.tags.includes(tag)).length 
        : 0;
      return { ...post, commonTags };
    })
    .filter(post => post.commonTags > 0)
    .sort((a, b) => b.commonTags - a.commonTags)
    .slice(0, limit);

  // If we don't have enough related posts, fill with recent posts
  if (relatedPosts.length < limit) {
    const recentPosts = allPosts
      .filter(post => 
        post.slug !== currentPost.slug && 
        !relatedPosts.find(related => related.slug === post.slug)
      )
      .slice(0, limit - relatedPosts.length);
    
    return [...relatedPosts, ...recentPosts];
  }

  return relatedPosts;
};
