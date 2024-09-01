import React from "react";
import {
  Box,
  Heading,
  Text,
  Link,
  VStack,
  HStack,
  IconButton,
  Image,
  Flex,
} from "@chakra-ui/react";
import { FaGithub, FaExternalLinkAlt, FaCode, FaCalendarAlt, FaDollarSign } from "react-icons/fa";

const iconMap = {
  Scrimba: FaCode,
  Consultation: FaCalendarAlt,
  Donate: FaDollarSign,
};

const ProjectCard = ({ project, isQuickLink = false }) => {
  const getIcon = (name) => {
    return Object.entries(iconMap).find(([key]) => name.includes(key))?.[1] || FaExternalLinkAlt;
  };

  const linkUrl = project.live || project.github;

  return (
    <Link href={linkUrl} isExternal _hover={{ textDecoration: 'none' }}>
      <Box
        h="100%"
        p={4}
        boxShadow="0 0 10px #00ff00"
        borderWidth="2px"
        borderColor="#00ff00"
        borderRadius="lg"
        bg="rgba(0, 0, 0, 0.8)"
        _hover={{ bg: "rgba(0, 255, 0, 0.1)" }}
      >
        <VStack h="100%" spacing={4} align="stretch" justify="space-between">
          {!isQuickLink && (
            <Image 
              src={project.image} 
              alt={`Screenshot of ${project.name}`} 
              borderRadius="lg" 
              objectFit="cover"
              h="200px"
              w="100%"
            />
          )}
          <VStack align="start" spacing={2} flex={1}>
            <Heading size={isQuickLink ? "sm" : "md"} fontSize={isQuickLink ? "sm" : "md"} wordBreak="break-word" color="#00ff00">
              {project.name}
            </Heading>
            <Text fontSize={isQuickLink ? "xs" : "sm"} wordBreak="break-word" color="#00ff00">
              {project.description}
            </Text>
          </VStack>
          {!isQuickLink && (
            <HStack justify="space-between">
              {project.github && (
                <IconButton
                  as="a"
                  href={project.github}
                  aria-label="GitHub"
                  icon={<FaGithub />}
                  variant="ghost"
                  color="#00ff00"
                  _hover={{ bg: "rgba(0, 255, 0, 0.1)" }}
                  onClick={(e) => e.stopPropagation()}
                />
              )}
              {project.live && (
                <IconButton
                  as="a"
                  href={project.live}
                  aria-label="Live site"
                  icon={<FaExternalLinkAlt />}
                  variant="ghost"
                  color="#00ff00"
                  _hover={{ bg: "rgba(0, 255, 0, 0.1)" }}
                  onClick={(e) => e.stopPropagation()}
                />
              )}
            </HStack>
          )}
        </VStack>
      </Box>
    </Link>
  );
};

export default ProjectCard;
