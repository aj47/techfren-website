import matter from 'gray-matter';

// Load blog posts index
export const loadBlogIndex = async () => {
  try {
    const response = await fetch('/blog-content/index.json');
    if (!response.ok) {
      throw new Error('Failed to load blog index');
    }
    const posts = await response.json();
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
    const { data: frontmatter, content } = matter(markdown);

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

// Filter posts by tag
export const filterPostsByTag = (posts, tag) => {
  if (!tag) return posts;
  return posts.filter(post => 
    post.tags && post.tags.includes(tag)
  );
};

// Search posts by title or description
export const searchPosts = (posts, query) => {
  if (!query) return posts;
  const lowercaseQuery = query.toLowerCase();
  return posts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.description.toLowerCase().includes(lowercaseQuery) ||
    (post.tags && post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)))
  );
};

// Get all unique tags from posts
export const getAllTags = (posts) => {
  const tagSet = new Set();
  posts.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => tagSet.add(tag));
    }
  });
  return Array.from(tagSet).sort();
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
