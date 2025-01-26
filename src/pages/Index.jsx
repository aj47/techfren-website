import { Container, Heading, Text } from "@chakra-ui/react";
import React from "react";
import DigitalRain from "../components/DigitalRain";
import "@fontsource/press-start-2p";
import "@fontsource/roboto";

const Index = () => {
  return (
    <>
      <DigitalRain />
      <Container 
        maxW="container.xl" 
        py={10} 
        centerContent
        position="relative" 
        zIndex="1"
      >
        <Heading 
          as="h1" 
          fontSize="6xl" 
          mb={6} 
          textShadow="0 0 10px #00ff00"
          fontFamily="'Press Start 2P', cursive"
        >
          techfren_
        </Heading>
        <Text 
          fontSize="xl" 
          textAlign="center" 
          maxW="600px"
          textShadow="0 0 5px #00ff00"
        >
          software engineer // AI researcher // cyberpunk enthusiast
        </Text>
      </Container>
    </ChakraProvider>
  );
};

export default Index;
