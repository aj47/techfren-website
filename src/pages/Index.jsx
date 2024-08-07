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
        </Box>
        <CollapsibleSection title="Quick Links" defaultOpen>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
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
