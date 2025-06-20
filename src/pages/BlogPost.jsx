import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  HStack,
  VStack,
  Badge,
  Button,
  Wrap,
  WrapItem,
  Spinner,
  Alert,
  AlertIcon,
  Divider,
  SimpleGrid,
  ChakraProvider,
} from '@chakra-ui/react';
import { FaCalendar, FaClock, FaTag, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link, useParams, useNavigate } from 'react-router-dom';
import MarkdownRenderer from '../components/MarkdownRenderer';
import BlogCard from '../components/BlogCard';
import DigitalRain from '../components/DigitalRain';
import { 
  loadBlogPost, 
  loadBlogIndex, 
  formatDate, 
  getReadingTime, 
  getRelatedPosts 
} from '../utils/blogUtils';
import theme from '../theme';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [blogPost, allPosts] = await Promise.all([
          loadBlogPost(slug),
          loadBlogIndex()
        ]);
        
        if (!blogPost) {
          setError('Blog post not found');
          return;
        }
        
        setPost(blogPost);
        
        // Get related posts
        const related = getRelatedPosts(blogPost, allPosts, 3);
        setRelatedPosts(related);
        
      } catch (err) {
        setError('Failed to load blog post');
        console.error('Error loading blog post:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadPost();
    }
  }, [slug]);

  // Scroll to top when post changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

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
              Loading blog post...
            </Text>
          </VStack>
        </Container>
      </ChakraProvider>
    );
  }

  if (error || !post) {
    return (
      <ChakraProvider theme={theme}>
        <DigitalRain />
        <Container maxW="container.xl" py={10}>
          <VStack spacing={6}>
            <Alert status="error" bg="rgba(255, 0, 0, 0.1)" borderColor="red.500">
              <AlertIcon color="red.500" />
              <Text color="red.500">{error || 'Blog post not found'}</Text>
            </Alert>
            <Button
              as={Link}
              to="/blog"
              variant="outline"
              colorScheme="green"
              color="#00ff00"
              borderColor="#00ff00"
              bg="rgba(0, 0, 0, 0.8)"
              _hover={{
                bg: "rgba(0, 255, 0, 0.1)"
              }}
              leftIcon={<FaArrowLeft />}
            >
              Back to Blog
            </Button>
          </VStack>
        </Container>
      </ChakraProvider>
    );
  }

  const readingTime = getReadingTime(post.content);

  return (
    <ChakraProvider theme={theme}>
      <DigitalRain />
      <Container maxW="container.lg" py={10}>
        {/* Navigation */}
        <VStack spacing={6} mb={8}>
          <HStack spacing={4} w="100%" justify="space-between">
            <Button
              as={Link}
              to="/blog"
              variant="outline"
              colorScheme="green"
              color="#00ff00"
              borderColor="#00ff00"
              bg="rgba(0, 0, 0, 0.8)"
              _hover={{
                bg: "rgba(0, 255, 0, 0.1)",
                boxShadow: "0 0 10px rgba(0, 255, 0, 0.5)"
              }}
              leftIcon={<FaArrowLeft />}
              size="sm"
            >
              Back to Blog
            </Button>
            
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
              Home
            </Button>
          </HStack>
        </VStack>

        {/* Article Header */}
        <VStack spacing={6} mb={10} align="stretch">
          <Heading
            size="xl"
            color="#00ff00"
            textShadow="0 0 15px #00ff00"
            fontFamily="'Press Start 2P', cursive"
            lineHeight="1.3"
            textAlign="center"
          >
            {post.title}
          </Heading>
          
          <VStack spacing={4}>
            <HStack spacing={6} justify="center" flexWrap="wrap">
              <HStack spacing={2}>
                <FaCalendar color="#00ff00" />
                <Text
                  fontSize="sm"
                  color="#00ff00"
                  textShadow="0 0 3px #00ff00"
                >
                  {formatDate(post.date)}
                </Text>
              </HStack>
              
              <HStack spacing={2}>
                <FaClock color="#00ff00" />
                <Text
                  fontSize="sm"
                  color="#00ff00"
                  textShadow="0 0 3px #00ff00"
                >
                  {readingTime}
                </Text>
              </HStack>
            </HStack>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <VStack spacing={2}>
                <HStack spacing={2} align="center">
                  <FaTag color="#00ff00" />
                  <Text
                    fontSize="sm"
                    color="#00ff00"
                    textShadow="0 0 3px #00ff00"
                    fontWeight="bold"
                  >
                    Tags:
                  </Text>
                </HStack>
                <Wrap spacing={2} justify="center">
                  {post.tags.map((tag, index) => (
                    <WrapItem key={index}>
                      <Badge
                        variant="outline"
                        colorScheme="green"
                        fontSize="sm"
                        px={3}
                        py={1}
                        borderColor="#00ff00"
                        color="#00ff00"
                        bg="rgba(0, 255, 0, 0.1)"
                        textShadow="0 0 3px #00ff00"
                        borderRadius="full"
                        cursor="pointer"
                        _hover={{
                          bg: "rgba(0, 255, 0, 0.2)",
                          boxShadow: "0 0 8px rgba(0, 255, 0, 0.5)"
                        }}
                        onClick={() => navigate(`/blog?tag=${encodeURIComponent(tag)}`)}
                      >
                        {tag}
                      </Badge>
                    </WrapItem>
                  ))}
                </Wrap>
              </VStack>
            )}
          </VStack>
        </VStack>

        {/* Article Content */}
        <Box
          bg="rgba(0, 0, 0, 0.6)"
          p={8}
          borderRadius="lg"
          border="2px solid #00ff00"
          boxShadow="0 0 20px rgba(0, 255, 0, 0.3)"
          mb={10}
        >
          <MarkdownRenderer content={post.content} />
        </Box>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <VStack spacing={6} mt={12}>
            <Divider borderColor="#00ff00" borderWidth="1px" />
            
            <Heading
              size="lg"
              color="#00ff00"
              textShadow="0 0 10px #00ff00"
              fontFamily="'Press Start 2P', cursive"
              textAlign="center"
            >
              Related Posts
            </Heading>
            
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w="100%">
              {relatedPosts.map((relatedPost) => (
                <BlogCard 
                  key={relatedPost.slug} 
                  post={relatedPost} 
                  isCompact={true}
                  showExcerpt={false}
                />
              ))}
            </SimpleGrid>
          </VStack>
        )}

        {/* Navigation Footer */}
        <VStack spacing={4} mt={12}>
          <Divider borderColor="#00ff00" borderWidth="1px" />
          <HStack spacing={4}>
            <Button
              as={Link}
              to="/blog"
              variant="outline"
              colorScheme="green"
              color="#00ff00"
              borderColor="#00ff00"
              bg="rgba(0, 0, 0, 0.8)"
              _hover={{
                bg: "rgba(0, 255, 0, 0.1)",
                boxShadow: "0 0 10px rgba(0, 255, 0, 0.5)"
              }}
              leftIcon={<FaArrowLeft />}
            >
              Back to Blog
            </Button>
          </HStack>
        </VStack>
      </Container>
    </ChakraProvider>
  );
};

export default BlogPost;
