import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Button,
  Flex,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { FaCalendar, FaClock, FaTag } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { formatDate, generateExcerpt, getReadingTime } from '../utils/blogUtils';

const BlogCard = ({ post, showExcerpt = true, isCompact = false }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/blog/${post.slug}`);
  };

  const excerpt = showExcerpt && post.content 
    ? generateExcerpt(post.content, isCompact ? 100 : 150)
    : post.description;

  const readingTime = post.content ? getReadingTime(post.content) : null;

  return (
    <Box
      as={Button}
      variant="unstyled"
      h="auto"
      p={isCompact ? 4 : 6}
      boxShadow="0 0 15px rgba(0, 255, 0, 0.4)"
      borderWidth="2px"
      borderColor="#00ff00"
      borderRadius="lg"
      bg="rgba(0, 0, 0, 0.8)"
      _hover={{ 
        bg: "rgba(0, 255, 0, 0.1)",
        boxShadow: "0 0 20px rgba(0, 255, 0, 0.6)",
        transform: "translateY(-2px)",
        transition: "all 0.3s ease"
      }}
      onClick={handleCardClick}
      display="block"
      textAlign="left"
      width="100%"
      whiteSpace="normal"
      cursor="pointer"
      transition="all 0.3s ease"
    >
      <VStack spacing={isCompact ? 3 : 4} align="stretch" h="100%">
        {/* Header with title and date */}
        <VStack spacing={2} align="stretch">
          <Heading
            size={isCompact ? "sm" : "md"}
            color="#00ff00"
            textShadow="0 0 8px #00ff00"
            fontFamily="'Press Start 2P', cursive"
            lineHeight="1.4"
            noOfLines={isCompact ? 2 : 3}
          >
            {post.title}
          </Heading>
          
          <HStack spacing={4} flexWrap="wrap">
            <HStack spacing={1}>
              <FaCalendar color="#00ff00" size="12px" />
              <Text
                fontSize="xs"
                color="#00ff00"
                textShadow="0 0 3px #00ff00"
              >
                {formatDate(post.date)}
              </Text>
            </HStack>
            
            {readingTime && (
              <HStack spacing={1}>
                <FaClock color="#00ff00" size="12px" />
                <Text
                  fontSize="xs"
                  color="#00ff00"
                  textShadow="0 0 3px #00ff00"
                >
                  {readingTime}
                </Text>
              </HStack>
            )}
          </HStack>
        </VStack>

        {/* Description/Excerpt */}
        {excerpt && (
          <Text
            fontSize={isCompact ? "sm" : "md"}
            color="#00ff00"
            textShadow="0 0 3px #00ff00"
            lineHeight="1.6"
            noOfLines={isCompact ? 2 : 3}
            flex="1"
          >
            {excerpt}
          </Text>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <Box>
            <HStack spacing={1} mb={2} align="center">
              <FaTag color="#00ff00" size="12px" />
              <Text
                fontSize="xs"
                color="#00ff00"
                textShadow="0 0 3px #00ff00"
                fontWeight="bold"
              >
                Tags:
              </Text>
            </HStack>
            <Wrap spacing={1}>
              {post.tags.slice(0, isCompact ? 3 : 5).map((tag, index) => (
                <WrapItem key={index}>
                  <Badge
                    variant="outline"
                    colorScheme="green"
                    fontSize="xs"
                    px={2}
                    py={1}
                    borderColor="#00ff00"
                    color="#00ff00"
                    bg="rgba(0, 255, 0, 0.1)"
                    textShadow="0 0 3px #00ff00"
                    borderRadius="full"
                    _hover={{
                      bg: "rgba(0, 255, 0, 0.2)",
                      boxShadow: "0 0 5px rgba(0, 255, 0, 0.5)"
                    }}
                  >
                    {tag}
                  </Badge>
                </WrapItem>
              ))}
              {post.tags.length > (isCompact ? 3 : 5) && (
                <WrapItem>
                  <Badge
                    variant="outline"
                    colorScheme="green"
                    fontSize="xs"
                    px={2}
                    py={1}
                    borderColor="#00ff00"
                    color="#00ff00"
                    bg="rgba(0, 255, 0, 0.1)"
                    textShadow="0 0 3px #00ff00"
                    borderRadius="full"
                  >
                    +{post.tags.length - (isCompact ? 3 : 5)}
                  </Badge>
                </WrapItem>
              )}
            </Wrap>
          </Box>
        )}

        {/* Read More Button */}
        <Flex justify="flex-end" mt="auto">
          <Text
            fontSize="sm"
            color="#00ff00"
            textShadow="0 0 5px #00ff00"
            fontWeight="bold"
            _hover={{
              color: "#ffffff",
              textShadow: "0 0 8px #00ff00"
            }}
          >
            Read More →
          </Text>
        </Flex>
      </VStack>
    </Box>
  );
};

export default BlogCard;
