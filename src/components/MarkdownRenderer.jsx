import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  Box,
  Heading,
  Text,
  Link,
  UnorderedList,
  OrderedList,
  ListItem,
  Code,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useTheme
} from '@chakra-ui/react';

const MarkdownRenderer = ({ content, isMediumStyle = false }) => {
  const theme = useTheme();

  // Custom syntax highlighter theme with cyberpunk colors
  const customSyntaxTheme = {
    ...tomorrow,
    'pre[class*="language-"]': {
      ...tomorrow['pre[class*="language-"]'],
      background: isMediumStyle ? '#f7fafc' : 'rgba(0, 0, 0, 0.9)',
      border: isMediumStyle ? '1px solid #e2e8f0' : '2px solid #00ff00',
      borderRadius: '8px',
      boxShadow: isMediumStyle ? '0 2px 4px rgba(0, 0, 0, 0.1)' : '0 0 10px rgba(0, 255, 0, 0.3)',
    },
    'code[class*="language-"]': {
      ...tomorrow['code[class*="language-"]'],
      color: isMediumStyle ? '#2d3748' : '#00ff00',
      textShadow: isMediumStyle ? 'none' : '0 0 5px #00ff00',
    }
  };

  const components = {
    // Headings
    h1: ({ children }) => (
      <Heading
        as="h1"
        size={isMediumStyle ? "2xl" : "xl"}
        color={isMediumStyle ? "#292929" : "#00ff00"}
        textShadow={isMediumStyle ? "none" : "0 0 10px #00ff00"}
        fontFamily={isMediumStyle ? "Georgia, serif" : theme.fonts.heading}
        fontWeight={isMediumStyle ? "600" : "normal"}
        mb={6}
        mt={8}
        borderBottom={isMediumStyle ? "2px solid #e2e8f0" : "2px solid #00ff00"}
        pb={2}
      >
        {children}
      </Heading>
    ),
    h2: ({ children }) => (
      <Heading
        as="h2"
        size={isMediumStyle ? "xl" : "lg"}
        color={isMediumStyle ? "#292929" : "#00ff00"}
        textShadow={isMediumStyle ? "none" : "0 0 8px #00ff00"}
        fontFamily={isMediumStyle ? "Georgia, serif" : theme.fonts.heading}
        fontWeight={isMediumStyle ? "600" : "normal"}
        mb={4}
        mt={6}
      >
        {children}
      </Heading>
    ),
    h3: ({ children }) => (
      <Heading
        as="h3"
        size={isMediumStyle ? "lg" : "md"}
        color={isMediumStyle ? "#292929" : "#00ff00"}
        textShadow={isMediumStyle ? "none" : "0 0 6px #00ff00"}
        fontFamily={isMediumStyle ? "Georgia, serif" : theme.fonts.heading}
        fontWeight={isMediumStyle ? "600" : "normal"}
        mb={3}
        mt={5}
      >
        {children}
      </Heading>
    ),
    h4: ({ children }) => (
      <Heading
        as="h4"
        size={isMediumStyle ? "md" : "sm"}
        color={isMediumStyle ? "#292929" : "#00ff00"}
        textShadow={isMediumStyle ? "none" : "0 0 4px #00ff00"}
        fontFamily={isMediumStyle ? "Georgia, serif" : theme.fonts.heading}
        fontWeight={isMediumStyle ? "600" : "normal"}
        mb={2}
        mt={4}
      >
        {children}
      </Heading>
    ),

    // Paragraphs
    p: ({ children }) => (
      <Text
        mb={4}
        lineHeight="1.8"
        color={isMediumStyle ? "#4a5568" : "#00ff00"}
        textShadow={isMediumStyle ? "none" : "0 0 3px #00ff00"}
        fontSize={isMediumStyle ? "lg" : "md"}
        fontFamily={isMediumStyle ? "Georgia, serif" : "inherit"}
      >
        {children}
      </Text>
    ),

    // Links
    a: ({ href, children }) => (
      <Link
        href={href}
        color={isMediumStyle ? "#007acc" : "#00ff00"}
        textDecoration="underline"
        textShadow={isMediumStyle ? "none" : "0 0 5px #00ff00"}
        _hover={isMediumStyle ? {
          color: "#005a99",
          textDecoration: "underline"
        } : {
          color: "#ffffff",
          textShadow: "0 0 8px #00ff00",
          textDecoration: "none"
        }}
        isExternal={href?.startsWith('http')}
      >
        {children}
      </Link>
    ),

    // Lists
    ul: ({ children }) => (
      <UnorderedList
        mb={4}
        ml={6}
        color={isMediumStyle ? "#4a5568" : "#00ff00"}
        textShadow={isMediumStyle ? "none" : "0 0 3px #00ff00"}
        fontSize={isMediumStyle ? "lg" : "md"}
      >
        {children}
      </UnorderedList>
    ),
    ol: ({ children }) => (
      <OrderedList
        mb={4}
        ml={6}
        color={isMediumStyle ? "#4a5568" : "#00ff00"}
        textShadow={isMediumStyle ? "none" : "0 0 3px #00ff00"}
        fontSize={isMediumStyle ? "lg" : "md"}
      >
        {children}
      </OrderedList>
    ),
    li: ({ children }) => (
      <ListItem mb={1}>
        {children}
      </ListItem>
    ),

    // Inline code
    code: ({ inline, children }) => {
      if (inline) {
        return (
          <Code
            bg={isMediumStyle ? "#f7fafc" : "rgba(0, 255, 0, 0.1)"}
            color={isMediumStyle ? "#2d3748" : "#00ff00"}
            border={isMediumStyle ? "1px solid #e2e8f0" : "1px solid #00ff00"}
            borderRadius="4px"
            px={2}
            py={1}
            fontSize="sm"
            textShadow={isMediumStyle ? "none" : "0 0 3px #00ff00"}
          >
            {children}
          </Code>
        );
      }
      return children;
    },

    // Code blocks
    pre: ({ children, ...props }) => {
      const child = React.Children.only(children);
      const { className, children: code } = child.props;
      const language = className?.replace('language-', '') || 'text';

      return (
        <Box mb={6} position="relative">
          <SyntaxHighlighter
            style={customSyntaxTheme}
            language={language}
            PreTag="div"
            customStyle={{
              margin: 0,
              borderRadius: '8px',
              border: isMediumStyle ? '1px solid #e2e8f0' : '2px solid #00ff00',
              boxShadow: isMediumStyle ? '0 2px 4px rgba(0, 0, 0, 0.1)' : '0 0 15px rgba(0, 255, 0, 0.3)',
              background: isMediumStyle ? '#f7fafc' : 'rgba(0, 0, 0, 0.9)',
            }}
            codeTagProps={{
              style: {
                color: isMediumStyle ? '#2d3748' : '#00ff00',
                textShadow: isMediumStyle ? 'none' : '0 0 5px #00ff00',
                fontFamily: 'monospace',
              }
            }}
          >
            {String(code).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </Box>
      );
    },

    // Horizontal rule
    hr: () => (
      <Divider
        borderColor={isMediumStyle ? "#e2e8f0" : "#00ff00"}
        borderWidth="1px"
        boxShadow={isMediumStyle ? "none" : "0 0 5px #00ff00"}
        my={8}
      />
    ),

    // Blockquotes
    blockquote: ({ children }) => (
      <Box
        borderLeft={isMediumStyle ? "4px solid #007acc" : "4px solid #00ff00"}
        bg={isMediumStyle ? "#f7fafc" : "rgba(0, 255, 0, 0.05)"}
        pl={4}
        py={2}
        my={4}
        borderRadius="0 8px 8px 0"
        boxShadow={isMediumStyle ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "0 0 10px rgba(0, 255, 0, 0.2)"}
      >
        <Text
          color={isMediumStyle ? "#4a5568" : "#00ff00"}
          textShadow={isMediumStyle ? "none" : "0 0 3px #00ff00"}
          fontStyle="italic"
          fontSize={isMediumStyle ? "lg" : "md"}
        >
          {children}
        </Text>
      </Box>
    ),

    // Tables
    table: ({ children }) => (
      <TableContainer mb={6}>
        <Table
          variant="simple"
          border={isMediumStyle ? "1px solid #e2e8f0" : "2px solid #00ff00"}
          borderRadius="8px"
          boxShadow={isMediumStyle ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "0 0 10px rgba(0, 255, 0, 0.3)"}
          bg={isMediumStyle ? "white" : "rgba(0, 0, 0, 0.8)"}
        >
          {children}
        </Table>
      </TableContainer>
    ),
    thead: ({ children }) => (
      <Thead bg={isMediumStyle ? "#f7fafc" : "rgba(0, 255, 0, 0.1)"}>
        {children}
      </Thead>
    ),
    tbody: ({ children }) => (
      <Tbody>
        {children}
      </Tbody>
    ),
    tr: ({ children }) => (
      <Tr borderColor={isMediumStyle ? "#e2e8f0" : "#00ff00"}>
        {children}
      </Tr>
    ),
    th: ({ children }) => (
      <Th
        color={isMediumStyle ? "#2d3748" : "#00ff00"}
        textShadow={isMediumStyle ? "none" : "0 0 5px #00ff00"}
        borderColor={isMediumStyle ? "#e2e8f0" : "#00ff00"}
        fontFamily={isMediumStyle ? "Georgia, serif" : theme.fonts.heading}
        fontWeight={isMediumStyle ? "600" : "normal"}
      >
        {children}
      </Th>
    ),
    td: ({ children }) => (
      <Td
        color={isMediumStyle ? "#4a5568" : "#00ff00"}
        textShadow={isMediumStyle ? "none" : "0 0 3px #00ff00"}
        borderColor={isMediumStyle ? "#e2e8f0" : "#00ff00"}
        fontSize={isMediumStyle ? "lg" : "md"}
      >
        {children}
      </Td>
    ),
  };

  return (
    <Box
      sx={{
        '& > *:first-of-type': {
          mt: 0
        },
        '& > *:last-child': {
          mb: 0
        }
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
};

export default MarkdownRenderer;
