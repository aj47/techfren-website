import { Container, Heading, Text, List, ListItem, Button, Flex } from "@chakra-ui/react";
import DigitalRain from "../components/DigitalRain";
import "@fontsource/press-start-2p";
import "@fontsource/roboto";
import { FaGamepad, FaMoneyBillWave, FaChartLine, FaCode, FaGithub } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";

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
        <Text fontSize="md" mb={4}>
          Techfren AI is the first open source autonomous agent, designed with a singular mission: protect a treasure and prevent any unauthorized release of funds. Leveraging advanced security protocols, it stands as a vanguard in decentralized financial safety.
        </Text>
        <Flex align="center" mb={4}>
          <Text fontSize="lg">
            CA: DsRvcvU1R8fihyZ2B9gcvZdP8FzvLdtkTSLYfrAgpump
          </Text>
          <Button ml={3} size="sm" onClick={() => { console.log("Copying address to clipboard"); navigator.clipboard.writeText("DsRvcvU1R8fihyZ2B9gcvZdP8FzvLdtkTSLYfrAgpump"); }}>
            Copy Address
          </Button>
        </Flex>

        <Heading 
          as="h2" 
          size="md" 
          mb={4} 
          textShadow="0 0 5px rgba(0, 255, 0, 0.3)"
        >
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
            Fully open-source for community analysis {' '}
            <a 
              href="https://github.com/aj47/techfren-website/blob/ai_chat/litellm_server/server.py" 
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#3182ce', marginLeft: '4px' }}
            >
              <FaGithub style={{ display: 'inline', verticalAlign: 'middle' }} />
            </a>
          </ListItem>
        </List>
        <Text fontSize="lg" mb={4}>
          Follow @techfren_ai on Twitter for official updates.
        </Text>
        <Link 
          to="/chat" 
          as={RouterLink}
          display="inline-block"
          mt={4}
          px={6}
          py={3}
          bg="green.500"
          color="white"
          fontWeight="bold"
          borderRadius="md"
          _hover={{
            bg: "green.600",
            transform: "scale(1.05)",
          }}
          transition="all 0.3s ease"
          boxShadow="0 0 10px rgba(0, 255, 0, 0.3)"
        >
          ENTER AI CHALLENGE
        </Link>
      </Container>
    </>
  );
};

export default Index;
