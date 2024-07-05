import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Link,
  VStack,
  HStack,
  IconButton,
  Image,
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import projects from "../projects.json";
import Socials from "./Socials";
import CollapsibleSection from "../components/CollapsibleSection";
import DigitalRain from "../components/DigitalRain";
import "@fontsource/press-start-2p";
import "@fontsource/roboto";

const theme = extendTheme({
  fonts: {
    heading: "'Press Start 2P', cursive",
    body: "Roboto, sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: "black",
        color: "#00ff00",
      },
    },
  },
  components: {
    Box: {
      baseStyle: {
        borderColor: "#00ff00",
        borderWidth: "2px",
        borderStyle: "solid",
        boxShadow: "0 0 10px #00ff00",
      },
    },
    Text: {
      baseStyle: {
        textShadow: "0 0 5px #00ff00",
        fontSize: "1.2rem", // Set default font size for Text components
      },
    },
    Heading: {
      baseStyle: {
        textShadow: "0 0 10px #00ff00",
      },
    },
  },
});

const ProjectCard = ({ project }) => {
  return (
    <VStack
      p={4}
      boxShadow="0 0 10px #00ff00"
      borderWidth="2px"
      borderColor="#00ff00"
      borderRadius="lg"
      align="start"
      spacing={4}
    >
      {project.live !== "" ? (
        <Link href={project.live} isExternal boxSize="100%" objectFit="cover">
          <Image
            src={project.image}
            borderRadius="md"
            boxSize="100%"
            objectFit="cover"
          />
        </Link>
      ) : (
        <Image
          src={project.image}
          borderRadius="md"
          boxSize="100%"
          objectFit="cover"
        />
      )}

      <Heading size="md" fontSize="sm" wordBreak="break-word">
        {project.name}
      </Heading>
      <Text fontSize="md" wordBreak="break-word">
        {project.description}
      </Text>
      <HStack>
        {project.github && (
          <IconButton
            as={Link}
            href={project.github}
            icon={<FaGithub />}
            aria-label="GitHub"
            isExternal
            color="#00ff00"
            bg="transparent"
            _hover={{ bg: "rgba(0, 255, 0, 0.2)" }}
          />
        )}
        {project.live && (
          <IconButton
            as={Link}
            href={project.live}
            icon={<FaExternalLinkAlt />}
            aria-label="Live Demo"
            isExternal
            color="#00ff00"
            bg="transparent"
            _hover={{ bg: "rgba(0, 255, 0, 0.2)" }}
          />
        )}
      </HStack>
    </VStack>
  );
};

async function fetchTikTokThumbnail(url) {
  const encodedUrl = encodeURIComponent(url);
  const apiUrl = `https://www.tiktok.com/oembed?url=${encodedUrl}`;

  return await fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Return the thumbnail URL
      console.log(data.thumbnail_url, "data");
      return data.thumbnail_url;
    })
    .catch((error) => {
      console.error("Error fetching TikTok oEmbed data:", error);
    });
}

const AnimatedTitle = () => {
  const [title, setTitle] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullTitle = "techfren";

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullTitle.length) {
        setTitle(fullTitle.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 200);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 1000);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <Heading
      as="h1"
      fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
      mb={6}
      whiteSpace="nowrap"
    >
      {title}
      <span style={{ opacity: showCursor ? 1 : 0 }}>_</span>
    </Heading>
  );
};

const Index = () => {
  return (
    <ChakraProvider theme={theme}>
      <DigitalRain />
      <Container maxW="container.xl" py={10}>
        <Box textAlign="center" p={6} borderRadius="lg">
          <AnimatedTitle />
          <Socials />
          <Box display="flex" justifyContent="center" mb={6}>
            <Image
              src="/hero.jpg"
              alt="Hero image"
              maxW={200}
              width="90%"
              borderRadius="10%"
            />
          </Box>
        </Box>
        <CollapsibleSection title="Quick Links">
          Error: 404 - Developer too lazy to write this section
        </CollapsibleSection>
        <CollapsibleSection title="Video Highlights">
          Error: L4Zy - Developer too lazy to write this section too but not lazy enough to not make it different and write a whole bunch of words to prove a point
        </CollapsibleSection>
        <CollapsibleSection title="My Open Source Projects">
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </SimpleGrid>
        </CollapsibleSection>
      </Container>
    </ChakraProvider>
  );
};

export default Index;
