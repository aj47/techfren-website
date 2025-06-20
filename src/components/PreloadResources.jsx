import { useEffect } from 'react';

const PreloadResources = () => {
  useEffect(() => {
    // Preload critical fonts
    const preloadFont = (href, type = 'font/woff2') => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = 'font';
      link.type = type;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    };

    // Preload critical images
    const preloadImage = (src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = src;
      link.as = 'image';
      document.head.appendChild(link);
    };

    // Preload hero image
    preloadImage('/hero.jpg');

    // Preload critical CSS fonts
    preloadFont('https://fonts.gstatic.com/s/pressstart2p/v14/e3t4euO8T-267oIAQAu6jDQyK3nVivM.woff2');
    preloadFont('https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff2');

    // DNS prefetch for external domains
    const dnsPrefetch = (domain) => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    };

    // Prefetch external domains
    dnsPrefetch('//fonts.googleapis.com');
    dnsPrefetch('//fonts.gstatic.com');
    dnsPrefetch('//cdnjs.cloudflare.com');

    // Preconnect to critical third-party origins
    const preconnect = (href) => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = href;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    };

    preconnect('https://fonts.googleapis.com');
    preconnect('https://fonts.gstatic.com');

  }, []);

  return null; // This component doesn't render anything
};

export default PreloadResources;
