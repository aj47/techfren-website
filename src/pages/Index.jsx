import {
  Box,
  Container,
  Flex,
  Heading,
  Link,
  SimpleGrid,
  Image,
  ChakraProvider,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { FaTiktok, FaYoutube, FaTwitch, FaInstagram, FaDiscord, FaBlog, FaFolderOpen } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import products from "../products.json";
import projects from "../projects.json";
import Socials from "./Socials";
import CollapsibleSection from "../components/CollapsibleSection";
import DigitalRain from "../components/DigitalRain";
import ProductSpotlight from "../components/ProductSpotlight";
import ProjectCard from "../components/ProjectCard";
import StatsBar from "../components/StatsBar";
import LatestContent from "../components/LatestContent";
import SEO from "../components/SEO";
import theme from "../theme";
import "@fontsource/press-start-2p";
import "@fontsource/roboto";

// The home page shows the first few of AJ's own projects (projects.json order)
// and keeps the rest one click away.
const FEATURED_PROJECT_COUNT = 6;
const ownProjects = projects.filter(project => !project.name.includes("(Contributor)"));
const featuredProjects = ownProjects.slice(0, FEATURED_PROJECT_COUNT);
const moreProjects = ownProjects.slice(FEATURED_PROJECT_COUNT);
const contributions = projects.filter(project => project.name.includes("(Contributor)"));

const SectionHeading = ({ title, action }) => (
  <Flex justify="space-between" align="baseline" gap={4} wrap="wrap" mt={10} mb={5}>
    <Heading as="h2" fontSize={{ base: "sm", md: "md" }} color="#00ff00">
      {title}
    </Heading>
    {action}
  </Flex>
);

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
      <SEO
        title="techfren - Software Engineer and Content Creator"
        description="Software engineer and content creator with a passion for Software Technology and AI Agents. Explore open source projects, blog posts, and tech insights."
        url="/"
        tags={['techfren', 'software engineer', 'content creator', 'AI', 'technology', 'programming', 'open source']}
      />
      <DigitalRain />
      <Container maxW="container.xl" py={10}>
        <Box textAlign="center" p={6} borderRadius="lg">
          <AnimatedTitle />
          <Socials />
          <Box display="flex" justifyContent="center" mb={6}>
            <Image
              src="/hero.jpg"
              alt="Hero image"
              maxW={{ base: 120, md: 160 }}
              width="90%"
              borderRadius="10%"
            />
          </Box>
<Box display="flex" justifyContent="center" mb={6}>
  <p>
    Your tech friend building and testing in public
  </p>
</Box>
          <StatsBar />
        </Box>
        <CollapsibleSection title="Social Links">
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            <ProjectCard
              project={{
                name: "TikTok",
                description: "Follow me on TikTok for tech content",
                live: "https://tiktok.com/@techfren",
                icon: FaTiktok
              }}
              isQuickLink={true}
            />
            <ProjectCard
              project={{
                name: "Instagram",
                description: "Follow me on Instagram",
                live: "https://instagram.com/techfren",
                icon: FaInstagram
              }}
              isQuickLink={true}
            />
            <ProjectCard
              project={{
                name: "YouTube",
                description: "Subscribe to my YouTube channel",
                live: "https://youtube.com/@techfren",
                icon: FaYoutube
              }}
              isQuickLink={true}
            />
            <ProjectCard
              project={{
                name: "Twitch",
                description: "Watch me live on Twitch",
                live: "https://twitch.tv/techfren",
                icon: FaTwitch
              }}
              isQuickLink={true}
            />
            <ProjectCard
              project={{
                name: "X",
                description: "Follow me on X",
                live: "https://x.com/techfren",
                icon: FaXTwitter
              }}
              isQuickLink={true}
            />
            <ProjectCard
              project={{
                name: "Discord",
                description: "Join my Discord community",
                live: "https://discord.gg/cK9WeQ7jPq",
                icon: FaDiscord
              }}
              isQuickLink={true}
            />
          </SimpleGrid>
        </CollapsibleSection>
        <CollapsibleSection title="Quick Links" defaultOpen={false}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            <ProjectCard
              project={{
                name: "Tech Blog",
                description: "Read my latest insights on AI, technology, and development",
                live: "/blog",
                icon: FaBlog,
                isInternal: true
              }}
              isQuickLink={true}
            />
            <ProjectCard
              project={{
                name: "WordleBench",
                description: "AI Wordle Leaderboard - See how AI models compete",
                live: "/wordlebench",
                isInternal: true,
                image: "/leaderboard.png",
              }}
              isQuickLink={true}
            />
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
                name: "Media Kit",
                description:
                  "Information about my social accounts and collaborations",
                live: "/mediakit",
                image: "/consultation.png",
                isInternal: true
              }}
              isQuickLink={true}
            />
            <ProjectCard
              project={{
                name: "Projects",
                description: "Explore projects I've built and open source work I've contributed to.",
                live: "/projects",
                icon: FaFolderOpen,
                isInternal: true
              }}
              isQuickLink={true}
            />
          </SimpleGrid>
        </CollapsibleSection>
        <SectionHeading title="Products" />
        <SimpleGrid columns={products.length > 1 ? { base: 1, lg: 2 } : 1} spacing={10}>
          {products.map(product => (
            <ProductSpotlight key={product.name} product={product} wide={products.length === 1} />
          ))}
        </SimpleGrid>

        <SectionHeading
          title="Projects"
          action={
            <Link as={RouterLink} to="/projects" color="#00ff00" fontSize="sm" whiteSpace="nowrap">
              View all {products.length + projects.length} →
            </Link>
          }
        />
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 5, md: 10 }} mb={10}>
          {featuredProjects.map(project => (
            <ProjectCard key={project.name} project={project} descriptionLines={3} />
          ))}
        </SimpleGrid>

        <CollapsibleSection title={`More Open Source Projects (${moreProjects.length})`}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            {moreProjects.map(project => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </SimpleGrid>
        </CollapsibleSection>

        <CollapsibleSection title={`Open Source Contributions (${contributions.length})`}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            {contributions.map(project => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </SimpleGrid>
        </CollapsibleSection>
        <Box mt={8}>
          <LatestContent />
        </Box>
      </Container>
    </ChakraProvider>
  );
};

export default Index;
