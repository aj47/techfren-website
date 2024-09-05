import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Image,
  ChakraProvider,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import projects from "../projects.json";
import Socials from "./Socials";
import CollapsibleSection from "../components/CollapsibleSection";
import DigitalRain from "../components/DigitalRain";
import ProjectCard from "../components/ProjectCard";
import theme from "../theme";
import "@fontsource/press-start-2p";
import "@fontsource/roboto";

async function fetchTikTokThumbnail(url) {
  try {
    const encodedUrl = encodeURIComponent(url);
    const apiUrl = `https://www.tiktok.com/oembed?url=${encodedUrl}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data.thumbnail_url, "data");
    return data.thumbnail_url;
  } catch (error) {
    console.error("Error fetching TikTok oEmbed data:", error);
  }
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
        <Box textAlign="center" mb={6}>
          <AnimatedTitle />
          <Socials />
        </Box>
        <Box display="flex" justifyContent="center" mb={6}>
          <Image
            src="/hero.jpg"
            alt="Hero image"
            maxW={200}
            width="90%"
            borderRadius="10%"
          />
        </Box>
        <Box
          bg="black"
          color="#00ff00"
          p={6}
          borderRadius="md"
          boxShadow="0 0 10px #00ff00"
          border="1px solid #00ff00"
          fontFamily="'Press Start 2P', cursive"
          fontSize="xs"
        >
          <Box mb={6}>
            <p style={{ lineHeight: '1.5', maxWidth: '80ch', textAlign: 'left' }}>
              techfren is a software engineer and content creator with a passion
              for Software Technology and AI Agents. Follow them by clicking the
              social icons above.
            </p>
          </Box>
          <CollapsibleSection title="./quick_links.sh">
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <ProjectCard
                project={{
                  name: "Learn Software/AI Engineering",
                  description: "Scrimba has interactive courses where you can learn by doing on their great platform.",
                  live: "https://v2.scrimba.com/?via=techfren",
                  image: "/consultation.png",
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
            </SimpleGrid>
          </CollapsibleSection>
          <CollapsibleSection title="./my_projects.sh" defaultOpen>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </SimpleGrid>
          </CollapsibleSection>
        </Box>
      </Container>
    </ChakraProvider>
  );
};

export default Index;
