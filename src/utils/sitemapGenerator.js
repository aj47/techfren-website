import { loadBlogIndex } from './blogUtils.js';

// Generate XML sitemap
export const generateSitemap = async () => {
  const siteUrl = 'https://www.techfren.net';
  const currentDate = new Date().toISOString();
  
  // Static pages
  const staticPages = [
    {
      url: '/',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '1.0'
    },
    {
      url: '/blog',
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '0.9'
    },
    {
      url: '/wordle',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    },
    {
      url: '/wordlebench',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    }
  ];
  
  // Get blog posts
  const blogPosts = await loadBlogIndex();
  const blogPages = blogPosts.map(post => ({
    url: `/blog/${post.slug}`,
    lastmod: new Date(post.date).toISOString(),
    changefreq: 'monthly',
    priority: '0.8'
  }));
  
  // Combine all pages
  const allPages = [...staticPages, ...blogPages];
  
  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  
  return xml;
};

// Generate and save sitemap (for build process)
export const saveSitemap = async () => {
  try {
    const sitemap = await generateSitemap();
    
    // In a real build process, you'd write this to public/sitemap.xml
    // For now, we'll return the XML content
    return sitemap;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return null;
  }
};
