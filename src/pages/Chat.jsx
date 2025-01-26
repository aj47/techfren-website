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
import OpenAI from 'openai';
import DigitalRain from '../components/DigitalRain';
import theme from '../theme';
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  const client = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_COMPATIBLE_API_KEY,
    baseURL: 'https://api.fireworks.ai/inference/v1',
    dangerouslyAllowBrowser: true,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message with timestamp
    setMessages(prev => [...prev, { 
      text: inputMessage, 
      isBot: false,
      timestamp: new Date().toISOString() 
    }]);
    
    setIsBotTyping(true);
    
    // Add bot response after delay
    console.log("bfore")
    try {
      const completion = await client.chat.completions.create({
        model: 'accounts/fireworks/models/llama-v3p1-8b-instruct',
        messages: [
          {
            role: "system", 
            content: "You are a snarky tech support AI with a cyberpunk aesthetic. Respond using terminal-style formatting, error messages, and hacker jargon. Keep responses brief and use ALL CAPS for system messages."
          },
          {
            role: "user",
            content: inputMessage
          }
        ],
        temperature: 0.5,
        max_tokens: 200,
        top_p: 0.9,
      });
      console.log(completion)
      
      const response = completion.choices[0].message.content;
      setMessages(prev => [...prev, { 
        text: response, 
        isBot: true,
        timestamp: new Date().toISOString()
      }]);
    } catch (error) {
      console.log(error)
      setMessages(prev => [...prev, { 
        text: "SYSTEM ERROR: NEURAL NETWORK FAILURE\nCONTACT SYSTEM ADMINISTRATOR",
        isBot: true,
        timestamp: new Date().toISOString()
      }]);
    }
    setIsBotTyping(false);

    setInputMessage('');
  };

  return (
    <React.Fragment>
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
          techfren_AI v0.4.20
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
                  <Text 
                    fontSize="xs" 
                    color="rgba(0, 255, 0, 0.5)" 
                    textAlign="right"
                    mt={1}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </Box>
              </Flex>
            ))}
            <div ref={messagesEndRef} />
            {isBotTyping && (
              <Flex align="center" pl={2}>
                <Box
                  p={2}
                  borderRadius="md"
                  bg="rgba(0, 255, 0, 0.1)"
                  border="1px solid #00ff00"
                >
                  <Flex align="center">
                    <FaRobot style={{ marginRight: '8px' }} />
                    <Text fontWeight="bold">techfren (AI)</Text>
                    <Flex ml={2} align="center">
                      <Box className="dot-flashing" />
                    </Flex>
                  </Flex>
                </Box>
              </Flex>
            )}
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
    </React.Fragment>
  );
};

export default Chat;
