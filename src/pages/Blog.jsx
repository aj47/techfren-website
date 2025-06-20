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
  Select,
  Badge,
  Wrap,
  WrapItem,
  Button,
  Spinner,
  Alert,
  AlertIcon,
  ChakraProvider,
} from '@chakra-ui/react';
import { FaSearch, FaTag, FaRss } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import DigitalRain from '../components/DigitalRain';
import { 
  loadBlogIndex, 
  searchPosts, 
  filterPostsByTag, 
  getAllTags 
} from '../utils/blogUtils';
import theme from '../theme';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const blogPosts = await loadBlogIndex();
        setPosts(blogPosts);
        setFilteredPosts(blogPosts);
        setAllTags(getAllTags(blogPosts));
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
    
    // Apply tag filter
    if (selectedTag) {
      filtered = filterPostsByTag(filtered, selectedTag);
    }
    
    setFilteredPosts(filtered);
  }, [posts, searchQuery, selectedTag]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleTagSelect = (tag) => {
    setSelectedTag(selectedTag === tag ? '' : tag);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTag('');
  };

  if (loading) {
    return (
      <ChakraProvider theme={theme}>
        <DigitalRain />
        <Container maxW="container.xl" py={10}>
          <VStack spacing={8} align="center" minH="50vh" justify="center">
            <Spinner
              size="xl"
              color="#00ff00"
              thickness="4px"
              speed="0.65s"
            />
            <Text color="#00ff00" textShadow="0 0 5px #00ff00">
              Loading blog posts...
            </Text>
          </VStack>
        </Container>
      </ChakraProvider>
    );
  }

  if (error) {
    return (
      <ChakraProvider theme={theme}>
        <DigitalRain />
        <Container maxW="container.xl" py={10}>
          <Alert status="error" bg="rgba(255, 0, 0, 0.1)" borderColor="red.500">
            <AlertIcon color="red.500" />
            <Text color="red.500">{error}</Text>
          </Alert>
        </Container>
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider theme={theme}>
      <DigitalRain />
      <Container maxW="container.xl" py={10}>
        {/* Header */}
        <VStack spacing={6} align="center" mb={10}>
          <Heading
            size="2xl"
            color="#00ff00"
            textShadow="0 0 15px #00ff00"
            fontFamily="'Press Start 2P', cursive"
            textAlign="center"
          >
            TECH BLOG
          </Heading>
          <Text
            fontSize="lg"
            color="#00ff00"
            textShadow="0 0 5px #00ff00"
            textAlign="center"
            maxW="600px"
          >
            Insights on AI, technology, and open source development
          </Text>
          
          {/* Back to Home Link */}
          <Button
            as={Link}
            to="/"
            variant="outline"
            colorScheme="green"
            color="#00ff00"
            borderColor="#00ff00"
            bg="rgba(0, 0, 0, 0.8)"
            _hover={{
              bg: "rgba(0, 255, 0, 0.1)",
              boxShadow: "0 0 10px rgba(0, 255, 0, 0.5)"
            }}
            size="sm"
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
                  color: '#00ff00',
                  zIndex: 1
                }}
              />
              <Input
                placeholder="Search posts..."
                value={searchQuery}
                onChange={handleSearchChange}
                pl="40px"
                bg="rgba(0, 0, 0, 0.8)"
                borderColor="#00ff00"
                color="#00ff00"
                _placeholder={{ color: "rgba(0, 255, 0, 0.6)" }}
                _focus={{
                  borderColor: "#00ff00",
                  boxShadow: "0 0 10px rgba(0, 255, 0, 0.5)"
                }}
              />
            </Box>
            
            {(searchQuery || selectedTag) && (
              <Button
                onClick={clearFilters}
                variant="outline"
                colorScheme="green"
                size="md"
                color="#00ff00"
                borderColor="#00ff00"
                bg="rgba(0, 0, 0, 0.8)"
                _hover={{
                  bg: "rgba(0, 255, 0, 0.1)"
                }}
              >
                Clear
              </Button>
            )}
          </HStack>

          {/* Tag Filter */}
          {allTags.length > 0 && (
            <VStack spacing={2} w="100%">
              <HStack spacing={2} align="center">
                <FaTag color="#00ff00" />
                <Text
                  fontSize="sm"
                  color="#00ff00"
                  textShadow="0 0 3px #00ff00"
                  fontWeight="bold"
                >
                  Filter by tag:
                </Text>
              </HStack>
              <Wrap spacing={2} justify="center">
                {allTags.map((tag) => (
                  <WrapItem key={tag}>
                    <Badge
                      variant={selectedTag === tag ? "solid" : "outline"}
                      colorScheme="green"
                      fontSize="sm"
                      px={3}
                      py={1}
                      borderColor="#00ff00"
                      color={selectedTag === tag ? "black" : "#00ff00"}
                      bg={selectedTag === tag ? "#00ff00" : "rgba(0, 255, 0, 0.1)"}
                      textShadow={selectedTag === tag ? "none" : "0 0 3px #00ff00"}
                      borderRadius="full"
                      cursor="pointer"
                      _hover={{
                        bg: selectedTag === tag ? "#00ff00" : "rgba(0, 255, 0, 0.2)",
                        boxShadow: "0 0 8px rgba(0, 255, 0, 0.5)"
                      }}
                      onClick={() => handleTagSelect(tag)}
                    >
                      {tag}
                    </Badge>
                  </WrapItem>
                ))}
              </Wrap>
            </VStack>
          )}

          {/* Results count */}
          <Text
            fontSize="sm"
            color="#00ff00"
            textShadow="0 0 3px #00ff00"
          >
            {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} found
          </Text>
        </VStack>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {filteredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </SimpleGrid>
        ) : (
          <VStack spacing={4} py={10}>
            <Text
              fontSize="lg"
              color="#00ff00"
              textShadow="0 0 5px #00ff00"
              textAlign="center"
            >
              No posts found matching your criteria.
            </Text>
            {(searchQuery || selectedTag) && (
              <Button
                onClick={clearFilters}
                variant="outline"
                colorScheme="green"
                color="#00ff00"
                borderColor="#00ff00"
                bg="rgba(0, 0, 0, 0.8)"
                _hover={{
                  bg: "rgba(0, 255, 0, 0.1)"
                }}
              >
                Clear filters
              </Button>
            )}
          </VStack>
        )}
      </Container>
    </ChakraProvider>
  );
};

export default Blog;
