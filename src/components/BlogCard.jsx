import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Flex,
} from '@chakra-ui/react';
import { FaCalendar, FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { formatDate, generateExcerpt, getReadingTime } from '../utils/blogUtils';

const BlogCard = ({ post, showExcerpt = true, isCompact = false, isMediumStyle = false }) => {
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
      boxShadow={isMediumStyle ? "0 2px 8px rgba(0, 0, 0, 0.1)" : "0 0 15px rgba(0, 255, 0, 0.4)"}
      borderWidth={isMediumStyle ? "1px" : "2px"}
      borderColor={isMediumStyle ? "#e2e8f0" : "#00ff00"}
      borderRadius={isMediumStyle ? "12px" : "lg"}
      bg={isMediumStyle ? "white" : "rgba(0, 0, 0, 0.8)"}
      _hover={isMediumStyle ? {
        bg: "#f7fafc",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        transform: "translateY(-2px)",
        transition: "all 0.3s ease"
      } : {
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
            size={isMediumStyle ? (isCompact ? "md" : "lg") : (isCompact ? "sm" : "md")}
            color={isMediumStyle ? "#292929" : "#00ff00"}
            textShadow={isMediumStyle ? "none" : "0 0 8px #00ff00"}
            fontFamily={isMediumStyle ? "Georgia, serif" : "'Press Start 2P', cursive"}
            lineHeight={isMediumStyle ? "1.3" : "1.4"}
            noOfLines={isCompact ? 2 : 3}
            fontWeight={isMediumStyle ? "600" : "normal"}
          >
            {post.title}
          </Heading>

          <HStack spacing={4} flexWrap="wrap">
            <HStack spacing={1}>
              <FaCalendar color={isMediumStyle ? "#6b6b6b" : "#00ff00"} size="12px" />
              <Text
                fontSize="xs"
                color={isMediumStyle ? "#6b6b6b" : "#00ff00"}
                textShadow={isMediumStyle ? "none" : "0 0 3px #00ff00"}
              >
                {formatDate(post.date)}
              </Text>
            </HStack>

            {readingTime && (
              <HStack spacing={1}>
                <FaClock color={isMediumStyle ? "#6b6b6b" : "#00ff00"} size="12px" />
                <Text
                  fontSize="xs"
                  color={isMediumStyle ? "#6b6b6b" : "#00ff00"}
                  textShadow={isMediumStyle ? "none" : "0 0 3px #00ff00"}
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
            color={isMediumStyle ? "#4a5568" : "#00ff00"}
            textShadow={isMediumStyle ? "none" : "0 0 3px #00ff00"}
            lineHeight="1.6"
            noOfLines={isCompact ? 2 : 3}
            flex="1"
          >
            {excerpt}
          </Text>
        )}

        {/* Read More Button */}
        <Flex justify="flex-end" mt="auto">
          <Text
            fontSize="sm"
            color={isMediumStyle ? "#007acc" : "#00ff00"}
            textShadow={isMediumStyle ? "none" : "0 0 5px #00ff00"}
            fontWeight={isMediumStyle ? "500" : "bold"}
            _hover={isMediumStyle ? {
              color: "#005a99",
              textDecoration: "underline"
            } : {
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
