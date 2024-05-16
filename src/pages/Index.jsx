import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Link,
  Image,
  VStack,
  HStack,
  IconButton,
  useColorMode,
  useColorModeValue,
  Switch,
} from "@chakra-ui/react";
import { FaGithub, FaExternalLinkAlt, FaMoon, FaSun } from "react-icons/fa";
import projects from "../projects.json";
import Socials from "./Socials";
import CollapsibleSection from "../components/CollapsibleSection";

const ProjectCard = ({ project }) => {
  return (
    <VStack
      p={4}
      boxShadow="md"
      borderWidth="1px"
      borderRadius="lg"
      align="start"
    >
      <Image
        src={project.image}
        borderRadius="md"
        boxSize="100%"
        objectFit="cover"
      />
      <Heading size="md" mt={2}>
        {project.name}
      </Heading>
      <Text fontSize="sm">{project.description}</Text>
      <HStack>
        {project.github && (
          <IconButton
            as={Link}
            href={project.github}
            icon={<FaGithub />}
            aria-label="GitHub"
            isExternal
          />
        )}
        {project.live && (
          <IconButton
            as={Link}
            href={project.live}
            icon={<FaExternalLinkAlt />}
            aria-label="Live Demo"
            isExternal
          />
        )}
      </HStack>
    </VStack>
  );
};

const ColorModeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Switch
      position="fixed"
      top="1rem"
      right="1rem"
      color="green"
      isChecked={colorMode === "dark"}
      onChange={toggleColorMode}
      icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
      size="lg"
    />
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

const Index = () => {
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const color = useColorModeValue("gray.800", "white");

  return (
    <Container maxW="container.xl" py={10} bg={bgColor} color={color}>
      <ColorModeSwitcher />
      <Box textAlign="center" mb={10}>
        <Heading as="h1" size="2xl" mb={2}>
          techfren
        </Heading>
        <Box p={4} borderWidth="1px" borderRadius="lg" mb={6}>
          <Text fontSize="lg">
            techfren is a content creator that creates content about AI and
            software engineering, sharing insights and knowledge with a wide
            audience.
          </Text>
          <a
            style={{ color: "red", textDecoration: "underline" }}
            href="https://docs.google.com/spreadsheets/d/19uE7EzGv-uqH7JyjG0FpC4mD21HPTeP6SWXpVhvNcxI/edit#gid=1353307486"
          >
            CODING AI TOOLS RUBRIC ETC
          </a>
        </Box>
        <Socials />
      </Box>
      <CollapsibleSection title="Latest Projects">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </SimpleGrid>
      </CollapsibleSection>
    </Container>
  );
};

export default Index;
