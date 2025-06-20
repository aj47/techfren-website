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
  Switch,
} from '@chakra-ui/react';
import { FaCalendar, FaClock, FaArrowLeft, FaArrowRight, FaSun, FaMoon } from 'react-icons/fa';
import { Link, useParams, useNavigate } from 'react-router-dom';
import MarkdownRenderer from '../components/MarkdownRenderer';
import BlogCard from '../components/BlogCard';
import DigitalRain from '../components/DigitalRain';
import SEO from '../components/SEO';
import {
  loadBlogPost,
  loadBlogIndex,
  formatDate,
  getReadingTime,
  getRelatedPosts
} from '../utils/blogUtils';
import { cyberpunkTheme, mediumTheme } from '../themes';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMediumStyle, setIsMediumStyle] = useState(true);

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
              Loading blog post...
            </Text>
          </VStack>
        </Container>
      </ChakraProvider>
    );
  }

  if (error || !post) {
    return (
      <ChakraProvider theme={currentTheme}>
        {!isMediumStyle && <DigitalRain />}
        <Container maxW="container.xl" py={10}>
          <VStack spacing={6}>
            <Alert status="error" bg={isMediumStyle ? "rgba(255, 0, 0, 0.05)" : "rgba(255, 0, 0, 0.1)"} borderColor="red.500">
              <AlertIcon color="red.500" />
              <Text color="red.500">{error || 'Blog post not found'}</Text>
            </Alert>
            <Button
              as={Link}
              to="/blog"
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
              leftIcon={<FaArrowLeft />}
              borderRadius={isMediumStyle ? "full" : "md"}
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
    <ChakraProvider theme={currentTheme}>
      <SEO
        title={`${post.title} | techfren`}
        description={post.description}
        url={`/blog/${post.slug}`}
        type="article"
        publishedTime={new Date(post.date).toISOString()}
        author="techfren"
        tags={post.tags || ['technology', 'software', 'AI']}
        readingTime={readingTime}
        isArticle={true}
      />
      {!isMediumStyle && <DigitalRain />}
      <Container maxW="container.lg" py={10}>
        {/* Navigation */}
        <VStack spacing={6} mb={8}>
          <HStack spacing={4} w="100%" justify="space-between">
            <Button
              as={Link}
              to="/blog"
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
              leftIcon={<FaArrowLeft />}
              size="sm"
              borderRadius={isMediumStyle ? "full" : "md"}
            >
              Back to Blog
            </Button>

            {/* Theme Toggle */}
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
        </VStack>

        {/* Article Header */}
        <VStack spacing={6} mb={10} align="stretch">
          <Heading
            size={isMediumStyle ? "2xl" : "lg"}
            color={isMediumStyle ? "#292929" : "#00ff00"}
            textShadow={isMediumStyle ? "none" : "0 0 15px #00ff00"}
            fontFamily={isMediumStyle ? "Georgia, serif" : "'Press Start 2P', cursive"}
            lineHeight={isMediumStyle ? "1.2" : "1.3"}
            textAlign="center"
            fontWeight={isMediumStyle ? "600" : "normal"}
          >
            {post.title}
          </Heading>

          <VStack spacing={4}>
            <HStack spacing={6} justify="center" flexWrap="wrap">
              <HStack spacing={2}>
                <FaCalendar color={isMediumStyle ? "#6b6b6b" : "#00ff00"} />
                <Text
                  fontSize="sm"
                  color={isMediumStyle ? "#6b6b6b" : "#00ff00"}
                  textShadow={isMediumStyle ? "none" : "0 0 3px #00ff00"}
                >
                  {formatDate(post.date)}
                </Text>
              </HStack>

              <HStack spacing={2}>
                <FaClock color={isMediumStyle ? "#6b6b6b" : "#00ff00"} />
                <Text
                  fontSize="sm"
                  color={isMediumStyle ? "#6b6b6b" : "#00ff00"}
                  textShadow={isMediumStyle ? "none" : "0 0 3px #00ff00"}
                >
                  {readingTime}
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </VStack>

        {/* Article Content */}
        <Box
          bg={isMediumStyle ? "white" : "rgba(0, 0, 0, 0.6)"}
          p={8}
          borderRadius={isMediumStyle ? "12px" : "lg"}
          border={isMediumStyle ? "1px solid #e2e8f0" : "2px solid #00ff00"}
          boxShadow={isMediumStyle ? "0 2px 8px rgba(0, 0, 0, 0.1)" : "0 0 20px rgba(0, 255, 0, 0.3)"}
          mb={10}
        >
          <MarkdownRenderer content={post.content} isMediumStyle={isMediumStyle} />
        </Box>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <VStack spacing={6} mt={12}>
            <Divider borderColor={isMediumStyle ? "#e2e8f0" : "#00ff00"} borderWidth="1px" />

            <Heading
              size={isMediumStyle ? "xl" : "lg"}
              color={isMediumStyle ? "#292929" : "#00ff00"}
              textShadow={isMediumStyle ? "none" : "0 0 10px #00ff00"}
              fontFamily={isMediumStyle ? "Georgia, serif" : "'Press Start 2P', cursive"}
              textAlign="center"
              fontWeight={isMediumStyle ? "600" : "normal"}
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
                  isMediumStyle={isMediumStyle}
                />
              ))}
            </SimpleGrid>
          </VStack>
        )}

        {/* Navigation Footer */}
        <VStack spacing={4} mt={12}>
          <Divider borderColor={isMediumStyle ? "#e2e8f0" : "#00ff00"} borderWidth="1px" />
          <HStack spacing={4}>
            <Button
              as={Link}
              to="/blog"
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
              leftIcon={<FaArrowLeft />}
              borderRadius={isMediumStyle ? "full" : "md"}
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
