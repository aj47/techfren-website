import { Container, Heading, Text, List, ListItem } from "@chakra-ui/react";
import React from "react";
import DigitalRain from "../components/DigitalRain";
import "@fontsource/press-start-2p";
import "@fontsource/roboto";
import { FaGamepad, FaMoneyBillWave, FaChartLine, FaCode } from "react-icons/fa";

const Index = () => {
  return (
    <>
      <DigitalRain />
      <Container 
        maxW="container.lg" 
        minH="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        py={20}
        centerContent
        position="relative" 
        zIndex="1"
      >
        <Heading as="h1" size="2xl" mb={2}>
          $techfren
        </Heading>
        <Text fontSize="lg" mb={4}>
          CA: DsRvcvU1R8fihyZ2B9gcvZdP8FzvLdtkTSLYfrAgpump
        </Text>

        <Heading as="h2" size="md" mb={4}>
          Phase 1: AI Security Challenge
        </Heading>
        <List spacing={3} fontSize="md">
          <ListItem>
            <FaGamepad style={{ display: 'inline', marginRight: '8px' }} />
            Adversarial game to convince AI to release prize funds
          </ListItem>
          <ListItem>
            <FaMoneyBillWave style={{ display: 'inline', marginRight: '8px' }} />
            Pay-to-chat system grows the prize pool
          </ListItem>
          <ListItem>
            <FaChartLine style={{ display: 'inline', marginRight: '8px' }} />
            Escalating fees per message
          </ListItem>
          <ListItem>
            <FaCode style={{ display: 'inline', marginRight: '8px' }} />
            Fully open-source for community analysis
          </ListItem>
        </List>
        <Text fontSize="lg" mb={4}>
          Follow @techfren_ai on Twitter for official updates.
        </Text>
      </Container>
    </>
  );
};

export default Index;
