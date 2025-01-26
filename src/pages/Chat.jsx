import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Heading, 
  Input, 
  Button, 
  Text, 
  VStack, 
  IconButton, 
  Flex,
  useColorModeValue
} from '@chakra-ui/react';
import { FaPaperPlane, FaRobot, FaUser } from 'react-icons/fa';
import DigitalRain from '../components/DigitalRain';
import theme from '../theme';
import { ChakraProvider } from "@chakra-ui/react";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  
  const botResponses = [
    "01100110 01110101 01110100 01110101 01110010 01100101 00100001",
    "SYNTAX ERROR IN QUERY. TRY AGAIN.",
    "ACCESSING NEURAL NET... PLEASE WAIT",
    "CYBER SYSTEMS: ONLINE",
    "WARNING: INTRUSION DETECTED",
    "DECRYPTING DATA STREAM...",
    "AI CORE TEMP: 42.3°C"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: inputMessage, isBot: false }]);
    
    // Add bot response after delay
    setTimeout(() => {
      const response = botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages(prev => [...prev, { text: response, isBot: true }]);
    }, 1000);

    setInputMessage('');
  };

  return (
    <ChakraProvider theme={theme}>
      <DigitalRain />
      <Box
        maxW="800px"
        mx="auto"
        h="100vh"
        display="flex"
        flexDirection="column"
        p={4}
      >
        <Heading 
          mb={4} 
          textAlign="center"
          textShadow="0 0 10px #00ff00"
          fontFamily={theme.fonts.heading}
        >
          <FaRobot style={{ display: 'inline-block', marginRight: '10px' }} />
          TECH_BOT v2.3.7
        </Heading>
        
        <Box
          flex="1"
          overflowY="auto"
          border="2px solid #00ff00"
          borderRadius="md"
          boxShadow="0 0 15px #00ff00"
          mb={4}
          p={4}
          bg="black"
        >
          <VStack spacing={4} align="stretch">
            {messages.map((msg, index) => (
              <Flex key={index} justify={msg.isBot ? "flex-start" : "flex-end"}>
                <Box
                  p={3}
                  borderRadius="md"
                  bg={msg.isBot ? "rgba(0, 255, 0, 0.1)" : "rgba(0, 255, 0, 0.2)"}
                  border="1px solid #00ff00"
                  maxW="80%"
                >
                  <Flex align="center" mb={1}>
                    {msg.isBot ? (
                      <FaRobot style={{ marginRight: '8px' }} />
                    ) : (
                      <FaUser style={{ marginRight: '8px' }} />
                    )}
                    <Text fontWeight="bold">
                      {msg.isBot ? "TECH_BOT" : "USER"}
                    </Text>
                  </Flex>
                  <Text fontFamily="monospace">{msg.text}</Text>
                </Box>
              </Flex>
            ))}
            <div ref={messagesEndRef} />
          </VStack>
        </Box>

        <form onSubmit={handleSubmit}>
          <Flex gap={2}>
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="ENTER QUERY..."
              fontFamily="monospace"
              borderColor="#00ff00"
              _focus={{ boxShadow: "0 0 10px #00ff00" }}
              _placeholder={{ color: "rgba(0, 255, 0, 0.5)" }}
            />
            <IconButton
              type="submit"
              colorScheme="green"
              aria-label="Send message"
              icon={<FaPaperPlane />}
              boxShadow="0 0 10px #00ff00"
            />
          </Flex>
        </form>
      </Box>
    </ChakraProvider>
  );
};

export default Chat;
