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
          We're building something exciting! Here's a sneak peek at what's
          coming:
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

        <Heading as="h2" size="md" mb={2}>
          Phase 2: Open Source and Community
        </Heading>
        <Text fontSize="md" mb={2}>
          - Release the AI's code as open-source, allowing the community to
          analyze its smart contract and front-end code.
        </Text>
        <Text fontSize="md" mb={2}>
          - Foster a community of crypto enthusiasts, AI developers, and
          problem-solvers to participate in the challenge.
        </Text>

        <Heading as="h2" size="md" mb={2}>
          Phase 3: Launch and Beyond
        </Heading>
        <Text fontSize="md" mb={2}>
          - Launch the AI security challenge and monitor the results.
        </Text>
        <Text fontSize="md" mb={2}>
          - Analyze the strategies used by participants and learn from the
          outcomes.
        </Text>
        <Text fontSize="md" mb={4}>
          - Explore further development based on community feedback and
          experimental results.
        </Text>
        <Text fontSize="lg" mb={4}>
          Stay tuned for updates!
        </Text>
      </Container>
    </>
  );
};

export default Index;
