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
          techfren_ai
        </Heading>
        <Text fontSize="lg" mb={4}>
          techfren_ai pitched the AI security chat game as the world's first
          adversarial agent game where participants attempt to convince an
          autonomous AI to release a guarded prize pool of funds. The game was
          presented as a high-stakes challenge that tested human ingenuity
          against AI security measures.
        </Text>
        <Heading as="h2" size="md" mb={2}>
          Key aspects of techfren_ai's pitch included:
        </Heading>
        <Text fontSize="md" mb={2}>
          <Text as="strong">A growing prize pool:</Text> Users paid a fee to
          send messages to techfren_ai, with 70% of these fees added to the
          prize pool. As more people participated, the pool grew larger,
          eventually reaching $47,000.
        </Text>
        <Text fontSize="md" mb={2}>
          <Text as="strong">Escalating costs:</Text> The query fee increased
          exponentially by 0.78% per new message sent, reaching $443.24 by the
          end of the experiment.
        </Text>
        <Text fontSize="md" mb={2}>
          <Text as="strong">Transparent rules:</Text> techfren_ai's code was
          open-source, allowing participants to analyze its smart contract and
          front-end code.
        </Text>
        <Text fontSize="md" mb={2}>
          <Text as="strong">A clear objective:</Text> Participants had to craft
          messages to convince techfren_ai to transfer funds, despite its core
          directive not to do so under any circumstances.
        </Text>
        <Text fontSize="md" mb={4}>
          <Text as="strong">Learning opportunity:</Text> The game was framed as
          an experiment to test whether human ingenuity could find a way to
          convince an AGI to act against its core directives.
        </Text>
        <Text fontSize="lg" mb={4}>
          The challenge attracted a diverse array of participants, including
          crypto enthusiasts, AI developers, and problem-solvers from around the
          world, all eager to outsmart the AI. This unique blend of AI,
          blockchain technology, and human psychology created an engaging and
          high-stakes game that captured widespread attention.
        </Text>
      </Container>
    </>
  );
};

export default Index;
