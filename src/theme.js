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
    ChatContainer: {
      baseStyle: {
        border: '2px solid #00ff00',
        borderRadius: 'md',
        boxShadow: '0 0 15px #00ff00',
        bg: 'black',
        p: 4,
      },
    },
    Message: {
      baseStyle: {
        border: '1px solid #00ff00',
        borderRadius: 'md',
        bg: 'rgba(0, 255, 0, 0.1)',
        p: 3,
        maxW: '80%',
      },
    },
    Input: {
      baseStyle: {
        field: {
          borderColor: '#00ff00',
          _focus: {
            boxShadow: '0 0 10px #00ff00',
          },
        },
      },
    },
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
