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

const MarkdownRenderer = ({ content }) => {
  const theme = useTheme();

  // Custom syntax highlighter theme with cyberpunk colors
  const customSyntaxTheme = {
    ...tomorrow,
    'pre[class*="language-"]': {
      ...tomorrow['pre[class*="language-"]'],
      background: 'rgba(0, 0, 0, 0.9)',
      border: '2px solid #00ff00',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)',
    },
    'code[class*="language-"]': {
      ...tomorrow['code[class*="language-"]'],
      color: '#00ff00',
      textShadow: '0 0 5px #00ff00',
    }
  };

  const components = {
    // Headings
    h1: ({ children }) => (
      <Heading
        as="h1"
        size="xl"
        color="#00ff00"
        textShadow="0 0 10px #00ff00"
        fontFamily={theme.fonts.heading}
        mb={6}
        mt={8}
        borderBottom="2px solid #00ff00"
        pb={2}
      >
        {children}
      </Heading>
    ),
    h2: ({ children }) => (
      <Heading
        as="h2"
        size="lg"
        color="#00ff00"
        textShadow="0 0 8px #00ff00"
        fontFamily={theme.fonts.heading}
        mb={4}
        mt={6}
      >
        {children}
      </Heading>
    ),
    h3: ({ children }) => (
      <Heading
        as="h3"
        size="md"
        color="#00ff00"
        textShadow="0 0 6px #00ff00"
        fontFamily={theme.fonts.heading}
        mb={3}
        mt={5}
      >
        {children}
      </Heading>
    ),
    h4: ({ children }) => (
      <Heading
        as="h4"
        size="sm"
        color="#00ff00"
        textShadow="0 0 4px #00ff00"
        fontFamily={theme.fonts.heading}
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
        color="#00ff00"
        textShadow="0 0 3px #00ff00"
        fontSize="md"
      >
        {children}
      </Text>
    ),

    // Links
    a: ({ href, children }) => (
      <Link
        href={href}
        color="#00ff00"
        textDecoration="underline"
        textShadow="0 0 5px #00ff00"
        _hover={{
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
        color="#00ff00"
        textShadow="0 0 3px #00ff00"
      >
        {children}
      </UnorderedList>
    ),
    ol: ({ children }) => (
      <OrderedList
        mb={4}
        ml={6}
        color="#00ff00"
        textShadow="0 0 3px #00ff00"
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
            bg="rgba(0, 255, 0, 0.1)"
            color="#00ff00"
            border="1px solid #00ff00"
            borderRadius="4px"
            px={2}
            py={1}
            fontSize="sm"
            textShadow="0 0 3px #00ff00"
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
              border: '2px solid #00ff00',
              boxShadow: '0 0 15px rgba(0, 255, 0, 0.3)',
              background: 'rgba(0, 0, 0, 0.9)',
            }}
            codeTagProps={{
              style: {
                color: '#00ff00',
                textShadow: '0 0 5px #00ff00',
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
        borderColor="#00ff00"
        borderWidth="1px"
        boxShadow="0 0 5px #00ff00"
        my={8}
      />
    ),

    // Blockquotes
    blockquote: ({ children }) => (
      <Box
        borderLeft="4px solid #00ff00"
        bg="rgba(0, 255, 0, 0.05)"
        pl={4}
        py={2}
        my={4}
        borderRadius="0 8px 8px 0"
        boxShadow="0 0 10px rgba(0, 255, 0, 0.2)"
      >
        <Text
          color="#00ff00"
          textShadow="0 0 3px #00ff00"
          fontStyle="italic"
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
          border="2px solid #00ff00"
          borderRadius="8px"
          boxShadow="0 0 10px rgba(0, 255, 0, 0.3)"
          bg="rgba(0, 0, 0, 0.8)"
        >
          {children}
        </Table>
      </TableContainer>
    ),
    thead: ({ children }) => (
      <Thead bg="rgba(0, 255, 0, 0.1)">
        {children}
      </Thead>
    ),
    tbody: ({ children }) => (
      <Tbody>
        {children}
      </Tbody>
    ),
    tr: ({ children }) => (
      <Tr borderColor="#00ff00">
        {children}
      </Tr>
    ),
    th: ({ children }) => (
      <Th
        color="#00ff00"
        textShadow="0 0 5px #00ff00"
        borderColor="#00ff00"
        fontFamily={theme.fonts.heading}
      >
        {children}
      </Th>
    ),
    td: ({ children }) => (
      <Td
        color="#00ff00"
        textShadow="0 0 3px #00ff00"
        borderColor="#00ff00"
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
