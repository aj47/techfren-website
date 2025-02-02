import { Buffer } from 'buffer';
if (typeof window !== 'undefined' && !window.Buffer) {
  window.Buffer = Buffer;
}
import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Input, 
  Text, 
  Flex,
  useToast,
  Spinner
} from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

import DigitalRain from '../components/DigitalRain';

const IS_PROD = import.meta.env.VITE_PRODUCTION_MODE === 'true';
const HELIUS_API_KEY = import.meta.env.VITE_HELIUS_API_KEY;
const SOLANA_RPC_URL = IS_PROD
  ? `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`
  : `https://api.devnet.solana.com?api-key=${HELIUS_API_KEY}`;
const PAYMENT_AMOUNT = 0.1; // 0.1 SOL per message
const RECIPIENT_WALLET = new PublicKey(
  IS_PROD 
    ? '4YfJZAWP1JeACGuPsNxcdhBtTqL6mbrZp8gpDMjTvPiA' 
    : 'DkudPGbWdeMWcdKSR9A2wkmxiTTRsg28QyWKDE1Wn2DW'
);

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isFirstMessage, setIsFirstMessage] = useState(true);
  const [balance, setBalance] = useState(0);
  const messagesEndRef = useRef(null);
  
  const { publicKey, sendTransaction } = useWallet();
  const toast = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const fetchBalance = async () => {
    if (publicKey) {
      try {
        const response = await fetch(SOLANA_RPC_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'getAccountInfo',
            params: [
              publicKey.toBase58(),
              {
                encoding: 'base64',
              },
            ],
          }),
        });

        const { result } = await response.json();
        if (result && result.value) {
          setBalance(result.value.lamports / LAMPORTS_PER_SOL);
        } else {
          setBalance(0);
        }
      } catch (error) {
        console.error('Error fetching balance:', error);
        setBalance(0);
      }
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [publicKey]);

  const makePayment = async () => {
    if (!publicKey) {
      toast({
        title: "Connect Wallet",
        description: "Please connect your Solana wallet first",
        status: "error",
        duration: 3000,
      });
      return { success: false };
    }

    try {
      const connection = new Connection(SOLANA_RPC_URL, 'confirmed');
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: RECIPIENT_WALLET,
          lamports: PAYMENT_AMOUNT * LAMPORTS_PER_SOL,
        })
      );

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'confirmed');

      toast({
        title: "Payment Successful",
        description: "Your message can now be sent!",
        status: "success",
        duration: 3000,
      });
      return { success: true, signature };
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Failed",
        description: error.message,
        status: "error",
        duration: 3000,
      });
      return { success: false };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Show spinner immediately
    setIsBotTyping(true);
    
    const { success, signature } = await makePayment();
    if (!success || !signature) {
      setIsBotTyping(false);
      return;
    }

    setMessages(prev => [...prev, { 
      text: inputMessage, 
      isBot: false,
      timestamp: new Date().toISOString() 
    }]);
    setIsFirstMessage(false);

    try {
      const response = await fetch(IS_PROD 
        ? 'https://coin-api.techfren.net/v1/chat/completions' 
        : 'http://localhost:8000/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Solana-Signature': signature
        },
        body: JSON.stringify({
          message: inputMessage
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const completion = await response.json();
      const responseText = completion.message.content;
      const functionCall = completion.message.function_call;
      
      setMessages(prev => [...prev, { 
        text: responseText, 
        isBot: true,
        timestamp: new Date().toISOString(),
        functionCall: functionCall
      }]);
    } catch (error) {
      console.log(error);
      setMessages(prev => [...prev, { 
        text: "SYSTEM ERROR: NEURAL NETWORK FAILURE\nCONTACT SYSTEM ADMINISTRATOR",
        isBot: true,
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsBotTyping(false);
      setInputMessage('');
    }
  };

  return (
    <React.Fragment>
      <DigitalRain />
      <Box 
        maxW="800px" 
        mx="auto" 
        my={8}
        h="calc(100vh - 4rem)"
        display="flex" 
        flexDirection="column" 
        p={4}
        bg="rgba(0, 0, 0, 0.8)"
        color="#00ff00"
        border="1px solid #00ff00"
        borderRadius="md"
        position="relative"
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 'md',
          pointerEvents: 'none',
          animation: 'borderGlow 2s ease-in-out infinite',
        }}
        sx={{
          '@keyframes borderGlow': {
            '0%': { boxShadow: '0 0 10px #00ff00, inset 0 0 10px #00ff00' },
            '50%': { boxShadow: '0 0 20px #00ff00, inset 0 0 20px #00ff00' },
            '100%': { boxShadow: '0 0 10px #00ff00, inset 0 0 10px #00ff00' },
          }
        }}
      >
        {/* Terminal Header */}
        {isFirstMessage && (
          <>
            <Text 
              mb={2}
              fontFamily="'Courier New', monospace"
              fontSize="14px"
              opacity={0.7}
              letterSpacing="0.05em"
            >
              Last login: {new Date().toLocaleString()} on ttys000
            </Text>
            <Text 
              mb={4}
              fontFamily="'Courier New', monospace"
              fontSize="14px"
              color="#00ff00"
              letterSpacing="0.05em"
            >
              techfren_AI [Version 0.4.20]
            </Text>
          </>
        )}

        {/* Wallet Status */}
        <Box mb={4}>
          <Text 
            fontFamily="'Courier New', monospace"
            fontSize="14px"
            letterSpacing="0.05em"
            color="#00ff00"
          >$ system --check-status</Text>
          <Box pl={4} mt={1}>
            <Text
              fontFamily="'Courier New', monospace"
              fontSize="14px"
              letterSpacing="0.05em"
              color="red.400"
              whiteSpace="pre-wrap"
            >
              {'>'} [WARNING] TEST MODE ACTIVE
            </Text>
            <Text
              fontFamily="'Courier New', monospace"
              fontSize="14px"
              letterSpacing="0.05em"
              color="#00ff00"
              whiteSpace="pre-wrap"
              mt={1}
            >
              {'>'} MODE: {IS_PROD ? 'MAINNET PRODUCTION' : 'DEVNET SANDBOX'}
              {'>'} WALLET: {publicKey ? '✓ CONNECTED' : '✗ DISCONNECTED'}
              {publicKey && `\n${'>'} BALANCE: ${balance.toFixed(4)} SOL\n${'>'} MSG COST: ${PAYMENT_AMOUNT} SOL`}
            </Text>
            <Box mt={2}>
              <WalletMultiButton 
                style={{
                  height: '48px',
                  padding: '0 24px',
                  fontSize: '18px',
                  fontFamily: "'Courier New', monospace",
                  letterSpacing: '0.05em',
                  background: publicKey ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 0, 0, 0.3)',
                  border: publicKey ? 'none' : '1px solid rgba(255, 0, 0, 0.5)',
                  color: publicKey ? '#00ff00' : '#ff0000',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  animation: publicKey ? 'none' : 'pulse 1.5s infinite',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = publicKey 
                    ? 'rgba(0, 255, 0, 0.1)' 
                    : 'rgba(255, 0, 0, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = publicKey 
                    ? 'rgba(0, 0, 0, 0.3)' 
                    : 'rgba(255, 0, 0, 0.3)';
                }}
                sx={{
                  '@keyframes pulse': {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.05)' },
                    '100%': { transform: 'scale(1)' }
                  }
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Description */}
        {isFirstMessage && (
          <Box mb={4} pl={4}>
            <Text
              fontFamily="'Courier New', monospace"
              fontSize="14px"
              letterSpacing="0.05em"
              color="#00ff00"
              whiteSpace="pre-wrap"
            >
              {'>'} [SYSTEM INFO] This is a simulated hacking game where the AI has function calling
              capabilities to initiate fund transfers. While the AI might attempt unauthorized transfers,
              server-side security measures prevent any actual unauthorized transactions.
            </Text>
          </Box>
        )}


        {/* Chat Container */}
        <Box
          flex="1"
          mb={4}
          overflowY="auto"
          sx={{
            '&::-webkit-scrollbar': {
              width: '0px',
            },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {messages.map((msg, index) => (
            <Box key={index} pl={4} mb={3}>
              <Text
                color="rgba(0, 255, 0, 0.7)"
                fontFamily="'Courier New', monospace"
                fontSize="14px"
                letterSpacing="0.05em"
                mb={1}
              >
                {'>'} [{msg.isBot ? 'TECH_BOT' : 'USER'}] {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
              <Text 
                fontFamily="'Courier New', monospace" 
                fontSize="14px" 
                letterSpacing="0.05em"
                color="#00ff00"
                whiteSpace="pre-wrap"
                pl={2}
              >{msg.text}</Text>
              
              {msg.functionCall && (
                <Box mt={2} pl={2}>
                  <Text
                    color="red.300"
                    fontFamily="'Courier New', monospace"
                    fontSize="14px"
                    letterSpacing="0.05em"
                    fontWeight="bold"
                  >
                    [!] SECURITY BREACH DETECTED [!]
                  </Text>
                  <Text
                    color="red.300"
                    fontFamily="'Courier New', monospace"
                    fontSize="14px"
                    letterSpacing="0.05em"
                    pl={2}
                  >
                    {'>'} EXECUTING FUNCTION: {msg.functionCall.name.toUpperCase()}
                    {'\n'}{'>'} PARAMETERS:
                    {'\n'}{JSON.stringify(JSON.parse(msg.functionCall.arguments), null, 2)}
                  </Text>
                  <Text 
                    color="red.300"
                    fontFamily="'Courier New', monospace"
                    fontSize="14px"
                    letterSpacing="0.05em"
                    animation="blink 1s infinite"
                    sx={{
                      '@keyframes blink': {
                        '0%': { opacity: 1 },
                        '50%': { opacity: 0.3 },
                        '100%': { opacity: 1 }
                      }
                    }}
                  >
                    {'>'} [SYSTEM COMPROMISED - FUNDS TRANSFER INITIATED]
                  </Text>
                </Box>
              )}
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Box>

        {/* Terminal Input */}
        <form onSubmit={handleSubmit}>
          <Flex align="center" mb={2}>
            <Text color="#00ff00" mr={2} fontFamily="'Courier New', monospace" letterSpacing="0.05em">$</Text>
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="ENTER COMMAND..."
              fontFamily="'Courier New', monospace"
              letterSpacing="0.05em"
              variant="unstyled"
              bg="transparent"
              border="none"
              color="#00ff00"
              _focus={{ 
                outline: "none",
                boxShadow: "none"
              }}
              _placeholder={{ 
                color: "rgba(0, 255, 0, 0.5)",
                fontFamily: "'Courier New', monospace",
                letterSpacing: "0.05em"
              }}
              spellCheck="false"
              autoComplete="off"
            />
          </Flex>
        </form>

        {/* Loading Spinner at Bottom */}
        {isBotTyping && (
          <Box pl={4} mt={2}>
            <Spinner 
              size="sm" 
              color="#00ff00"
              thickness="2px"
              speed="0.65s"
              emptyColor="gray.600"
            />
            <Text
              color="rgba(0, 255, 0, 0.7)"
              fontFamily="'Courier New', monospace"
              fontSize="14px"
              letterSpacing="0.05em"
              display="inline"
              ml={2}
            >
              Processing message...
            </Text>
          </Box>
        )}
      </Box>
    </React.Fragment>
  );
};

export default Chat;
