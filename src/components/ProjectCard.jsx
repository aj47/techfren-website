import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  IconButton,
  Image,
  Flex,
  Badge,
  Button,
} from "@chakra-ui/react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useState } from "react";
import LinkPreview from "./LinkPreview";
import GitHubStats from "./GitHubStats";

const ProjectCard = ({ project, isQuickLink = false }) => {
  const linkUrl = project.live || project.github;
  const isContributor = project.name.includes("(Contributor)");
  const displayName = isContributor ? project.name.replace(" (Contributor)", "") : project.name;

  const handleCardClick = () => {
    if (linkUrl) {
      window.open(linkUrl, '_blank');
    }
  };

  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const renderImage = () => {
    if (imageError) {
      // Return a placeholder or styled box when image fails to load
      return (
        <Box
          borderRadius="lg"
          bg="rgba(0, 255, 0, 0.1)"
          h="200px"
          w="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="#00ff00"
          fontSize="lg"
          fontWeight="bold"
        >
          {displayName}
        </Box>
      );
    }

    if (!isQuickLink) {
      return (
        <Image
          src={project.image}
          alt={`Screenshot of ${project.name}`}
          borderRadius="lg"
          objectFit="cover"
          h="200px"
          w="100%"
          onError={handleImageError}
          fallbackSrc="/placeholder.png"
        />
      );
    }

    if (project.image && project.image !== "/consultation.png") {
      return (
        <Image
          src={project.image}
          alt={`Screenshot of ${project.name}`}
          borderRadius="lg"
          objectFit="cover"
          h="200px"
          w="100%"
          onError={handleImageError}
          fallbackSrc="/placeholder.png"
        />
      );
    }

    return null;
  };

  return (
    <Box
      as={Button}
      variant="unstyled"
      h="100%"
      p={4}
      boxShadow="0 0 10px #00ff00"
      borderWidth="2px"
      borderColor="#00ff00"
      borderRadius="lg"
      bg="rgba(0, 0, 0, 0.8)"
      _hover={{ bg: "rgba(0, 255, 0, 0.1)" }}
      onClick={handleCardClick}
      display="block"
      textAlign="left"
      width="100%"
      whiteSpace="normal"
    >
      <VStack h="100%" spacing={4} align="stretch" justify="space-between">
        {renderImage()}
        <VStack align="start" spacing={2} flex={1}>
          <Flex width="100%" justifyContent="space-between" alignItems="center">
            <HStack spacing={2} flex={1}>
              {isQuickLink && (!project.image || project.image === "/consultation.png") && (
                <LinkPreview url={linkUrl} />
              )}
              <Heading
                size={isQuickLink ? "sm" : "md"}
                fontSize={isQuickLink ? "sm" : "md"}
                color="#00ff00"
                style={{
                  wordBreak: "break-word",
                  whiteSpace: "normal",
                  overflowWrap: "break-word",
                  width: isContributor ? "85%" : "100%"
                }}
              >
                {displayName}
              </Heading>
            </HStack>
            {isContributor && (
              <Badge colorScheme="green" ml={2} flexShrink={0}>
                Contributor
              </Badge>
            )}
          </Flex>
          <Text
            fontSize={isQuickLink ? "xs" : "sm"}
            color="#00ff00"
            style={{
              wordBreak: "break-word",
              whiteSpace: "normal",
              overflowWrap: "break-word"
            }}
          >
            {project.description}
          </Text>
          {!isQuickLink && project.github && (
            <GitHubStats repoUrl={project.github} />
          )}
        </VStack>
        {!isQuickLink && (
          <HStack justify="space-between" onClick={(e) => e.stopPropagation()}>
            {project.github && (
              <IconButton
                as="a"
                href={project.github}
                aria-label="GitHub"
                icon={<FaGithub />}
                variant="ghost"
                color="#00ff00"
                _hover={{ bg: "rgba(0, 255, 0, 0.1)" }}
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
              />
            )}
          </HStack>
        )}
      </VStack>
    </Box>
  );
};

export default ProjectCard;
