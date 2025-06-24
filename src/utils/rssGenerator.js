import { loadBlogIndex } from './blogUtils.js';

// Generate RSS feed
export const generateRSSFeed = async () => {
  const siteUrl = 'https://www.techfren.net';
  const feedTitle = 'techfren Blog';
  const feedDescription = 'Insights on software engineering, AI technology, and the future of development from techfren.';
  const feedAuthor = 'techfren';
  const feedEmail = 'hello@techfren.net';

  // Get blog posts (currently only future-of-software)
  const blogPosts = await loadBlogIndex();
  
  // Generate RSS XML
  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${feedTitle}</title>
    <description>${feedDescription}</description>
    <link>${siteUrl}/blog</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-US</language>
    <managingEditor>${feedEmail} (${feedAuthor})</managingEditor>
    <webMaster>${feedEmail} (${feedAuthor})</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>techfren Blog</generator>
    <image>
      <url>${siteUrl}/hero.jpg</url>
      <title>${feedTitle}</title>
      <link>${siteUrl}/blog</link>
      <width>200</width>
      <height>200</height>
    </image>
${blogPosts.map(post => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${feedEmail} (${feedAuthor})</author>
      <category>Technology</category>
      <category>Software Engineering</category>
      ${post.tags ? post.tags.map(tag => `<category>${tag}</category>`).join('\n      ') : ''}
    </item>`).join('\n')}
  </channel>
</rss>`;
  
  return rssXml;
};

// Generate Atom feed (alternative format)
export const generateAtomFeed = async () => {
  const siteUrl = 'https://www.techfren.net';
  const feedTitle = 'techfren Blog';
  const feedDescription = 'Insights on software engineering, AI technology, and the future of development from techfren.';
  const feedAuthor = 'techfren';
  const feedEmail = 'hello@techfren.net';
  
  // Get blog posts (currently only future-of-software)
  const blogPosts = await loadBlogIndex();
  
  // Generate Atom XML
  const atomXml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${feedTitle}</title>
  <subtitle>${feedDescription}</subtitle>
  <link href="${siteUrl}/blog" rel="alternate" type="text/html"/>
  <link href="${siteUrl}/atom.xml" rel="self" type="application/atom+xml"/>
  <id>${siteUrl}/blog</id>
  <updated>${new Date().toISOString()}</updated>
  <author>
    <name>${feedAuthor}</name>
    <email>${feedEmail}</email>
    <uri>${siteUrl}</uri>
  </author>
  <generator uri="${siteUrl}" version="1.0">techfren Blog</generator>
  <icon>${siteUrl}/favicon.ico</icon>
  <logo>${siteUrl}/hero.jpg</logo>
${blogPosts.map(post => `  <entry>
    <title type="html"><![CDATA[${post.title}]]></title>
    <link href="${siteUrl}/blog/${post.slug}" rel="alternate" type="text/html"/>
    <id>${siteUrl}/blog/${post.slug}</id>
    <published>${new Date(post.date).toISOString()}</published>
    <updated>${new Date(post.date).toISOString()}</updated>
    <summary type="html"><![CDATA[${post.description}]]></summary>
    <author>
      <name>${feedAuthor}</name>
      <email>${feedEmail}</email>
    </author>
    ${post.tags ? post.tags.map(tag => `<category term="${tag}"/>`).join('\n    ') : ''}
  </entry>`).join('\n')}
</feed>`;
  
  return atomXml;
};
