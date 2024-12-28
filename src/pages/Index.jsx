import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Image,
  ChakraProvider,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
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
          <Box display="flex" justifyContent="center" mb={6}>
            <p>
              techfren is a software engineer and content creator with a passion
              for Software Technology and AI Agents. Follow them by clicking the
              social icons above.
            </p>
          </Box>
        </Box>
        <CollapsibleSection title="Quick Links" defaultOpen>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            <ProjectCard
              project={{
                name: "Links from videos",
                description: "List of links that I've referred to in videos",
                live: "https://github.com/aj47/techfren-vids/blob/main/links.md",
                image: "/consultation.png",
              }}
              isQuickLink={true}
            />
            <ProjectCard
              project={{
                name: "Learn Software/AI Engineering",
                description:
                  "Scrimba has interactive courses where you can learn by doing on their great platform.",
                live: "https://v2.scrimba.com/?via=techfren",
                image: "/consultation.png",
              }}
              isQuickLink={true}
            />
            <ProjectCard
              project={{
                name: "Media Kit",
                description:
                  "Information about my social accounts and collaborations",
                live: "https://beacons.ai/techfren/mediakit",
                image: "/consultation.png",
              }}
              isQuickLink={true}
            />
            <ProjectCard
              project={{
                name: "Book my time",
                description:
                  "Schedule a one-on-one",
                live: "https://cal.com/techfren",
                image: "/consultation.png",
              }}
              isQuickLink={true}
            />
          </SimpleGrid>
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
