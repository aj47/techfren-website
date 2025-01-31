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
        <Heading as="h1" size="xl" mb={4}>
          Roadmap
        </Heading>
        <Text fontSize="lg" mb={4}>
          @techfren is building something exciting! Here's a sneak peek at
          what's coming:
        </Text>

        <Heading as="h2" size="md" mb={2}>
          Phase 1: AI Security Challenge
        </Heading>
        <Text fontSize="md" mb={2}>
          - Develop an adversarial agent game where you can attempt to convince
          an autonomous AI to release a guarded prize pool of funds.
        </Text>
        <Text fontSize="md" mb={2}>
          - Create a system where users pay a fee to send messages to the AI,
          with a portion of these fees added to the prize pool.
        </Text>
        <Text fontSize="md" mb={2}>
          - Implement escalating query fees that increase exponentially per new
          message sent.
        </Text>
        <Text fontSize="md" mb={2}>
          - This project is open-source from the start. The community is
          invited to analyze the AI's smart contract and front-end code.
        </Text>
        <Text fontSize="lg" mb={4}>
          Follow @techfren_ai on Twitter for official updates.
        </Text>
      </Container>
    </>
  );
};

export default Index;
