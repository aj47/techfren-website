import { Container, Heading, Text } from "@chakra-ui/react";
import React from "react";
import DigitalRain from "../components/DigitalRain";
import "@fontsource/press-start-2p";
import "@fontsource/roboto";
import Chat from "./Chat";

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
        <Chat/>
      </Container>
    </>
  );
};

export default Index;
