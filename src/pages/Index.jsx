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
  useColorMode,
  useColorModeValue,
  Switch,
  Image,
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";
import { FaGithub, FaExternalLinkAlt, FaMoon, FaSun } from "react-icons/fa";
import projects from "../projects.json";
import Socials from "./Socials";
import CollapsibleSection from "../components/CollapsibleSection";
import "@fontsource/press-start-2p";
import "@fontsource/roboto";

const theme = extendTheme({
  fonts: {
    heading: "'Press Start 2P', cursive",
    body: "Roboto, sans-serif",
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "black" : "white",
        color: props.colorMode === "dark" ? "#00ff00" : "black",
      },
    }),
  },
  components: {
    Box: {
      baseStyle: (props) => ({
        borderColor: props.colorMode === "dark" ? "#00ff00" : "black",
        borderWidth: "2px",
        borderStyle: "solid",
        boxShadow: props.colorMode === "dark" ? "0 0 10px #00ff00" : "none",
      }),
    },
    Text: {
      baseStyle: (props) => ({
        textShadow: props.colorMode === "dark" ? "0 0 5px #00ff00" : "none",
        fontSize: "1.2rem", // Set default font size for Text components
      }),
    },
    Heading: {
      baseStyle: (props) => ({
        textShadow: props.colorMode === "dark" ? "0 0 10px #00ff00" : "none",
      }),
    },
  },
});

const ProjectCard = ({ project }) => {
  const { colorMode } = useColorMode();
  return (
    <VStack
      p={4}
      boxShadow={colorMode === "dark" ? "0 0 10px #00ff00" : "md"}
      borderWidth="2px"
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

      <Heading size="md" fontSize="sm" wordBreak="break-word">{project.name}</Heading>
      <Text fontSize="md" wordBreak="break-word">{project.description}</Text>
      <HStack>
        {project.github && (
          <IconButton
            as={Link}
            href={project.github}
            icon={<FaGithub />}
            aria-label="GitHub"
            isExternal
            color={colorMode === "dark" ? "#00ff00" : "black"}
            bg={colorMode === "dark" ? "transparent" : "white"}
            _hover={{ bg: colorMode === "dark" ? "rgba(0, 255, 0, 0.2)" : "gray.100" }}
          />
        )}
        {project.live && (
          <IconButton
            as={Link}
            href={project.live}
            icon={<FaExternalLinkAlt />}
            aria-label="Live Demo"
            isExternal
            color={colorMode === "dark" ? "#00ff00" : "black"}
            bg={colorMode === "dark" ? "transparent" : "white"}
            _hover={{ bg: colorMode === "dark" ? "rgba(0, 255, 0, 0.2)" : "gray.100" }}
          />
        )}
      </HStack>
    </VStack>
  );
};

const ColorModeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      ml="auto"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width={90}
    >
      {colorMode === "dark" ? <FaSun size={30} color="#00ff00" /> : <FaMoon size={30} />}
      <Switch
        color="green"
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
        size="lg"
        sx={{
          '& .chakra-switch__track': {
            bg: colorMode === "dark" ? "rgba(0, 255, 0, 0.3)" : "gray.300",
          },
          '& .chakra-switch__thumb': {
            bg: colorMode === "dark" ? "#00ff00" : "white",
          },
        }}
      />
    </Box>
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
  const { colorMode } = useColorMode();

  return (
    <ChakraProvider theme={theme}>
      <Container maxW="container.xl" py={10}>
        <ColorModeSwitcher />
        <Box textAlign="center" mb={10}>
          <Heading as="h1" size="2xl" mb={6}>
            techfren
          </Heading>
          <Box display="flex" justifyContent="center" mb={6}>
            <Image
              src="/hero.png"
              alt="Hero image"
              maxW={500}
              width="90%"
              borderRadius="lg"
            />
          </Box>
          <Socials />
          <Box p={4} borderWidth="2px" borderRadius="lg" mb={6}>
            <Text fontSize="lg">
              techfren is a content creator that creates content about AI and
              software engineering
            </Text>
          </Box>
        </Box>
        <CollapsibleSection title="My Open Source Projects" defaultOpen>
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
