import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
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

export default theme;
