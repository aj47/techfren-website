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
  Icon,
} from "@chakra-ui/react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LinkPreview from "./LinkPreview";
import GitHubStats from "./GitHubStats";

const ProjectCard = ({ project, isQuickLink = false }) => {
  const navigate = useNavigate();
  const linkUrl = project.live || project.github;
  const isContributor = project.name.includes("(Contributor)");
  const displayName = isContributor ? project.name.replace(" (Contributor)", "") : project.name;

  const handleCardClick = () => {
    if (linkUrl) {
      if (project.isInternal) {
        navigate(linkUrl);
      } else {
        window.open(linkUrl, '_blank');
      }
    }
  };

  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const renderImage = () => {
    // For regular projects (not quick links)
    if (!isQuickLink) {
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

    // For quick links, we don't render an image here
    // The icon will be rendered inline with the title
    return null;
  };

  return (
    <Box
      as={Button}
      variant="unstyled"
      h={isQuickLink ? "auto" : "100%"}
      p={isQuickLink ? 3 : 4}
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
      <VStack h="100%" spacing={isQuickLink ? 2 : 4} align="stretch" justify="space-between">
        {renderImage()}
        <VStack align={isQuickLink ? "center" : "start"} spacing={2} flex={1}>
          <Flex
            width="100%"
            justifyContent={isQuickLink ? "center" : "space-between"}
            alignItems="center"
          >
            <HStack spacing={2} flex={1} justifyContent={isQuickLink ? "center" : "flex-start"}>
              {isQuickLink && project.icon && (
                <Icon
                  as={project.icon}
                  boxSize={6}
                  color="#00ff00"
                  mr={1}
                />
              )}
              <Heading
                size={isQuickLink ? "md" : "md"}
                fontSize={isQuickLink ? "lg" : "md"}
                color="#00ff00"
                style={{
                  wordBreak: "break-word",
                  whiteSpace: "normal",
                  overflowWrap: "break-word",
                  width: isContributor ? "85%" : "100%",
                  textAlign: isQuickLink ? "center" : "left"
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
            fontSize={isQuickLink ? "sm" : "sm"}
            color="#00ff00"
            style={{
              wordBreak: "break-word",
              whiteSpace: "normal",
              overflowWrap: "break-word",
              textAlign: isQuickLink ? "center" : "left"
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
