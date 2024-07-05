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
  Flex,
} from "@chakra-ui/react";
import { FaGithub, FaExternalLinkAlt, FaCode, FaCalendarAlt, FaDollarSign } from "react-icons/fa";
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

const ProjectCard = ({ project, isQuickLink = false }) => {
  const getIcon = (name) => {
    if (name.includes("Scrimba")) return FaCode;
    if (name.includes("Consultation")) return FaCalendarAlt;
    if (name.includes("Donate")) return FaDollarSign;
    return FaExternalLinkAlt;
  };

  if (isQuickLink) {
    return (
      <Link
        href={project.live}
        isExternal
        _hover={{ textDecoration: 'none' }}
      >
        <Flex
          p={4}
          boxShadow="0 0 10px #00ff00"
          borderWidth="2px"
          borderColor="#00ff00"
          borderRadius="lg"
          align="center"
          spacing={4}
          _hover={{ bg: "rgba(0, 255, 0, 0.1)" }}
        >
          <VStack align="start" spacing={1}>
            <Heading size="sm" fontSize="sm" wordBreak="break-word" color="#00ff00">
              {project.name}
            </Heading>
            <Text fontSize="xs" wordBreak="break-word" color="#00ff00">
              {project.description}
            </Text>
          </VStack>
        </Flex>
      </Link>
    );
  }

  const linkUrl = project.live || project.github;
  return (
    <Link href={linkUrl} isExternal _hover={{ textDecoration: 'none' }}>
      <VStack
        p={4}
        boxShadow="0 0 10px #00ff00"
        borderWidth="2px"
        borderColor="#00ff00"
        borderRadius="lg"
        align="stretch"
        spacing={4}
        _hover={{ bg: "rgba(0, 255, 0, 0.1)" }}
      >
        <Image src={project.image} alt={project.name} borderRadius="lg" />
        <Heading size="md">{project.name}</Heading>
        <Text>{project.description}</Text>
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
      </VStack>
    </Link>
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
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            <ProjectCard
              project={{
                name: "Scrimba - Learn Software Engineering",
                description: "Start your journey in software engineering with Scrimba's interactive courses.",
                live: "https://v2.scrimba.com/?via=techfren",
                image: "/scrimba.png",
              }}
              isQuickLink={true}
            />
            <ProjectCard
              project={{
                name: "Book a Tech Consultation",
                description: "Schedule a one-on-one tech consultation to discuss your projects or career.",
                live: "https://cal.com/techfren",
                image: "/consultation.png",
              }}
              isQuickLink={true}
            />
            <ProjectCard
              project={{
                name: "Donate",
                description: "Support @techfren's content creation efforts with a donation.",
                live: "https://www.paypal.com/donate/?business=J4QC6X5R3ACQU&no_recurring=0&item_name=support+of+%40techfren+content+creation&currency_code=AUD",
                image: "/donate.png",
              }}
              isQuickLink={true}
            />
          </SimpleGrid>
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
