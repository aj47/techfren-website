import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title,
  description,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'techfren',
  tags = [],
  readingTime,
  isArticle = false
}) => {
  const siteUrl = 'https://www.techfren.net';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullImageUrl = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}/hero.jpg`;
  
  const structuredData = isArticle ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": {
      "@type": "ImageObject",
      "url": fullImageUrl,
      "width": 1200,
      "height": 630
    },
    "author": {
      "@type": "Person",
      "name": author,
      "url": siteUrl,
      "sameAs": [
        "https://tiktok.com/@techfren",
        "https://instagram.com/techfren",
        "https://youtube.com/@techfren",
        "https://twitch.tv/techfren",
        "https://twitter.com/techfrenAJ"
      ]
    },
    "publisher": {
      "@type": "Person",
      "name": "techfren",
      "url": siteUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/hero.jpg`,
        "width": 200,
        "height": 200
      }
    },
    "datePublished": publishedTime,
    "dateModified": modifiedTime || publishedTime,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": fullUrl
    },
    "keywords": tags.join(', '),
    "wordCount": readingTime ? parseInt(readingTime.split(' ')[0]) * 200 : undefined,
    "timeRequired": readingTime ? `PT${readingTime.split(' ')[0]}M` : undefined,
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "genre": ["Technology", "Software Engineering", "AI"],
    "about": {
      "@type": "Thing",
      "name": "Software Engineering"
    }
  } : {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": fullUrl,
    "image": fullImageUrl,
    "author": {
      "@type": "Person",
      "name": "techfren",
      "url": siteUrl
    },
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "WebSite",
      "name": "techfren",
      "url": siteUrl
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={tags.join(', ')} />
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="techfren" />
      
      {/* Article-specific Open Graph tags */}
      {isArticle && (
        <>
          <meta property="article:author" content={author} />
          <meta property="article:published_time" content={publishedTime} />
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:creator" content="@techfrenAJ" />
      <meta name="twitter:site" content="@techfrenAJ" />
      
      {/* Additional Meta Tags */}
      <meta name="author" content={author} />
      {readingTime && <meta name="reading-time" content={readingTime} />}
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
