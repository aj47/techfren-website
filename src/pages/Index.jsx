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

const projects = [
  {
    name: "Autogen Skill Repository",
    description: "A repository of python skills that can be added to Autogen",
    image:
      "https://images.unsplash.com/photo-1527335480088-278dbeec0ad5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGFwcCUyMGludGVyZmFjZXxlbnwwfHx8fDE3MDUyMTk1MDB8MA&ixlib=rb-4.0.3&q=80&w=1080",
    github: "https://github.com/aj47/autogen-studio-skills",
    live: "",
  },
  {
    name: "LM Studio Preset Repository",
    description:
      "A robust system offering scalable solutions for enterprise needs.",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxlbnRlcnByaXNlJTIwc29mdHdhcmUlMjBhcHB8ZW58MHx8fHwxNzA1MjE5NTAwfDA&ixlib=rb-4.0.3&q=80&w=1080",
    github: "https://github.com/aj47/lm-studio-presets",
    live: "",
  },
  {
    name: "BeriGame MMO Alpha",
    description: "A proof of concept cross platform MMO Game",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxwcm9qZWN0JTIwbWFuYWdlbWVudCUyMGFwcHxlbnwwfHx8fDE3MDUyMTk1MDF8MA&ixlib=rb-4.0.3&q=80&w=1080",
    github: "",
    live: "www.alpha.berigame.com",
  },
  {
    name: "TimestampGenius.com",
    description: "Automatically Generate Timestamps for Youtube Videos with AI",
    image:
      "https://images.unsplash.com/photo-1627253781598-63b98c51da42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxjcnlwdG9jdXJyZW5jeSUyMGFwcHxlbnwwfHx8fDE3MDUyMTk1MDF8MA&ixlib=rb-4.0.3&q=80&w=1080",
    github: "",
    live: "www.timestampgenius.com",
  },
];

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
           techfren is a content creator that creates content about AI and software engineering, sharing insights and knowledge with a wide audience.
         </Text>
       </Box>
       </Box>
      <Heading as="h2" size="xl" mb={6}>
        Latest Projects
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Index;
