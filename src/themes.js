import { extendTheme } from '@chakra-ui/react';

// Original cyberpunk theme
export const cyberpunkTheme = extendTheme({
  fonts: {
    heading: "'Press Start 2P', cursive",
    body: "Roboto, sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: "black",
        color: "#00ff00",
      },
    },
  },
  components: {
    Box: {
      baseStyle: {
        borderColor: "#00ff00",
        borderWidth: "2px",
        borderStyle: "solid",
        boxShadow: "0 0 10px #00ff00",
      },
    },
    Text: {
      baseStyle: {
        textShadow: "0 0 5px #00ff00",
        fontSize: "1.2rem",
      },
    },
    Heading: {
      baseStyle: {
        textShadow: "0 0 10px #00ff00",
      },
    },
  },
});

// Medium-style theme
export const mediumTheme = extendTheme({
  fonts: {
    heading: "Georgia, serif",
    body: "Georgia, serif",
  },
  styles: {
    global: {
      body: {
        bg: "#fafafa",
        color: "#292929",
        lineHeight: "1.6",
      },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        textShadow: "none",
        fontWeight: "400",
      },
    },
    Text: {
      baseStyle: {
        textShadow: "none",
        fontSize: "1rem",
        lineHeight: "1.6",
      },
    },
    Button: {
      baseStyle: {
        textShadow: "none",
      },
    },
  },
});
