/**
 * Optimized font loading utility
 * Only loads fonts when needed (light mode activated)
 */

let fontsLoaded = false;
let fontLoadPromise = null;

export const loadBlogFonts = () => {
  // Return existing promise if already loading
  if (fontLoadPromise) {
    return fontLoadPromise;
  }

  // Return resolved promise if already loaded
  if (fontsLoaded) {
    return Promise.resolve();
  }

  // Create new loading promise
  fontLoadPromise = new Promise((resolve, reject) => {
    // Check if fonts are already available
    if (document.fonts && document.fonts.check) {
      const geistAvailable = document.fonts.check('1em Geist');
      const ralewayAvailable = document.fonts.check('1em Raleway');
      const specialGothicAvailable = document.fonts.check('1em "Special Gothic Expanded One"');

      if (geistAvailable && ralewayAvailable && specialGothicAvailable) {
        fontsLoaded = true;
        resolve();
        return;
      }
    }

    // Load fonts if not available
    const fontPromises = [];

    if (document.fonts && document.fonts.load) {
      // Load essential font weights only
      fontPromises.push(
        document.fonts.load('400 1em Geist'),
        document.fonts.load('600 1em Geist'),
        document.fonts.load('400 1em Raleway'),
        document.fonts.load('600 1em Raleway'),
        document.fonts.load('400 1em "Special Gothic Expanded One"')
      );
    }

    if (fontPromises.length > 0) {
      Promise.allSettled(fontPromises)
        .then(() => {
          fontsLoaded = true;
          resolve();
        })
        .catch((error) => {
          console.warn('Some fonts failed to load:', error);
          fontsLoaded = true; // Still resolve to prevent blocking
          resolve();
        });
    } else {
      // Fallback for browsers without Font Loading API
      setTimeout(() => {
        fontsLoaded = true;
        resolve();
      }, 100);
    }
  });

  return fontLoadPromise;
};

export const preloadBlogFonts = () => {
  // Preload fonts in the background without blocking
  if (!fontsLoaded && !fontLoadPromise) {
    loadBlogFonts().catch(() => {
      // Silently handle errors for preloading
    });
  }
};

export const areFontsLoaded = () => fontsLoaded;
