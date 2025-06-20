import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Input,
  HStack,
  VStack,
  Button,
  Spinner,
  Alert,
  AlertIcon,
  ChakraProvider,
  Switch,
} from '@chakra-ui/react';
import { FaSearch, FaSun, FaMoon } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import DigitalRain from '../components/DigitalRain';
import {
  loadBlogIndex,
  searchPosts
} from '../utils/blogUtils';
import { cyberpunkTheme, mediumTheme } from '../themes';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMediumStyle, setIsMediumStyle] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const blogPosts = await loadBlogIndex();
        setPosts(blogPosts);
        setFilteredPosts(blogPosts);
      } catch (err) {
        setError('Failed to load blog posts');
        console.error('Error loading blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  useEffect(() => {
    let filtered = posts;

    // Apply search filter
    if (searchQuery) {
      filtered = searchPosts(filtered, searchQuery);
    }

    setFilteredPosts(filtered);
  }, [posts, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearFilters = () => {
    setSearchQuery('');
  };

  const toggleTheme = () => {
    setIsMediumStyle(!isMediumStyle);
  };

  const currentTheme = isMediumStyle ? mediumTheme : cyberpunkTheme;

  if (loading) {
    return (
      <ChakraProvider theme={currentTheme}>
        {!isMediumStyle && <DigitalRain />}
        <Container maxW="container.xl" py={10}>
          <VStack spacing={8} align="center" minH="50vh" justify="center">
            <Spinner
              size="xl"
              color={isMediumStyle ? "#007acc" : "#00ff00"}
              thickness="4px"
              speed="0.65s"
            />
            <Text color={isMediumStyle ? "#292929" : "#00ff00"} textShadow={isMediumStyle ? "none" : "0 0 5px #00ff00"}>
              Loading blog posts...
            </Text>
          </VStack>
        </Container>
      </ChakraProvider>
    );
  }

  if (error) {
    return (
      <ChakraProvider theme={currentTheme}>
        {!isMediumStyle && <DigitalRain />}
        <Container maxW="container.xl" py={10}>
          <Alert status="error" bg={isMediumStyle ? "rgba(255, 0, 0, 0.05)" : "rgba(255, 0, 0, 0.1)"} borderColor="red.500">
            <AlertIcon color="red.500" />
            <Text color="red.500">{error}</Text>
          </Alert>
        </Container>
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider theme={currentTheme}>
      {!isMediumStyle && <DigitalRain />}
      <Container maxW="container.xl" py={10}>
        {/* Theme Toggle */}
        <HStack justify="flex-end" mb={6}>
          <HStack spacing={3}>
            <FaSun color={isMediumStyle ? "#292929" : "#00ff00"} />
            <Switch
              isChecked={isMediumStyle}
              onChange={toggleTheme}
              colorScheme={isMediumStyle ? "blue" : "green"}
              size="lg"
            />
            <FaMoon color={isMediumStyle ? "#292929" : "#00ff00"} />
          </HStack>
        </HStack>

        {/* Header */}
        <VStack spacing={6} align="center" mb={10}>
          <Heading
            size={isMediumStyle ? "xl" : "lg"}
            color={isMediumStyle ? "#292929" : "#00ff00"}
            textShadow={isMediumStyle ? "none" : "0 0 15px #00ff00"}
            fontFamily={isMediumStyle ? "Georgia, serif" : "'Press Start 2P', cursive"}
            textAlign="center"
            fontWeight={isMediumStyle ? "400" : "normal"}
          >
            {isMediumStyle ? "Tech Blog" : "TECH BLOG"}
          </Heading>
          <Text
            fontSize={isMediumStyle ? "xl" : "lg"}
            color={isMediumStyle ? "#6b6b6b" : "#00ff00"}
            textShadow={isMediumStyle ? "none" : "0 0 5px #00ff00"}
            textAlign="center"
            maxW="600px"
            fontStyle={isMediumStyle ? "italic" : "normal"}
          >
            Insights on AI, technology, and open source development
          </Text>

          {/* Back to Home Link */}
          <Button
            as={Link}
            to="/"
            variant={isMediumStyle ? "solid" : "outline"}
            colorScheme={isMediumStyle ? "blue" : "green"}
            color={isMediumStyle ? "white" : "#00ff00"}
            borderColor={isMediumStyle ? "transparent" : "#00ff00"}
            bg={isMediumStyle ? "#007acc" : "rgba(0, 0, 0, 0.8)"}
            _hover={isMediumStyle ? {
              bg: "#005a99"
            } : {
              bg: "rgba(0, 255, 0, 0.1)",
              boxShadow: "0 0 10px rgba(0, 255, 0, 0.5)"
            }}
            size="sm"
            borderRadius={isMediumStyle ? "full" : "md"}
          >
            ← Back to Home
          </Button>
        </VStack>

        {/* Search and Filter Controls */}
        <VStack spacing={4} mb={8}>
          <HStack spacing={4} w="100%" maxW="600px">
            <Box position="relative" flex="1">
              <FaSearch
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: isMediumStyle ? '#6b6b6b' : '#00ff00',
                  zIndex: 1
                }}
              />
              <Input
                placeholder="Search posts..."
                value={searchQuery}
                onChange={handleSearchChange}
                pl="40px"
                bg={isMediumStyle ? "white" : "rgba(0, 0, 0, 0.8)"}
                borderColor={isMediumStyle ? "#e2e8f0" : "#00ff00"}
                color={isMediumStyle ? "#292929" : "#00ff00"}
                _placeholder={{ color: isMediumStyle ? "#a0aec0" : "rgba(0, 255, 0, 0.6)" }}
                _focus={isMediumStyle ? {
                  borderColor: "#007acc",
                  boxShadow: "0 0 0 1px #007acc"
                } : {
                  borderColor: "#00ff00",
                  boxShadow: "0 0 10px rgba(0, 255, 0, 0.5)"
                }}
                borderRadius={isMediumStyle ? "full" : "md"}
              />
            </Box>

            {searchQuery && (
              <Button
                onClick={clearFilters}
                variant={isMediumStyle ? "solid" : "outline"}
                colorScheme={isMediumStyle ? "blue" : "green"}
                size="md"
                color={isMediumStyle ? "white" : "#00ff00"}
                borderColor={isMediumStyle ? "transparent" : "#00ff00"}
                bg={isMediumStyle ? "#007acc" : "rgba(0, 0, 0, 0.8)"}
                _hover={isMediumStyle ? {
                  bg: "#005a99"
                } : {
                  bg: "rgba(0, 255, 0, 0.1)"
                }}
                borderRadius={isMediumStyle ? "full" : "md"}
              >
                Clear
              </Button>
            )}
          </HStack>



          {/* Results count */}
          <Text
            fontSize="sm"
            color={isMediumStyle ? "#6b6b6b" : "#00ff00"}
            textShadow={isMediumStyle ? "none" : "0 0 3px #00ff00"}
          >
            {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} found
          </Text>
        </VStack>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {filteredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} isMediumStyle={isMediumStyle} />
            ))}
          </SimpleGrid>
        ) : (
          <VStack spacing={4} py={10}>
            <Text
              fontSize="lg"
              color={isMediumStyle ? "#292929" : "#00ff00"}
              textShadow={isMediumStyle ? "none" : "0 0 5px #00ff00"}
              textAlign="center"
            >
              No posts found matching your criteria.
            </Text>
            {searchQuery && (
              <Button
                onClick={clearFilters}
                variant={isMediumStyle ? "solid" : "outline"}
                colorScheme={isMediumStyle ? "blue" : "green"}
                color={isMediumStyle ? "white" : "#00ff00"}
                borderColor={isMediumStyle ? "transparent" : "#00ff00"}
                bg={isMediumStyle ? "#007acc" : "rgba(0, 0, 0, 0.8)"}
                _hover={isMediumStyle ? {
                  bg: "#005a99"
                } : {
                  bg: "rgba(0, 255, 0, 0.1)"
                }}
                borderRadius={isMediumStyle ? "full" : "md"}
              >
                Clear search
              </Button>
            )}
          </VStack>
        )}
      </Container>
    </ChakraProvider>
  );
};

export default Blog;
