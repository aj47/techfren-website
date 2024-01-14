import { Box, Container, Heading, SimpleGrid, Text, Link, Image, VStack, HStack, IconButton } from "@chakra-ui/react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    name: "Project Alpha",
    description: "A revolutionary project that changes the way we interact with technology.",
    image: 'https://images.unsplash.com/photo-1527335480088-278dbeec0ad5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGFwcCUyMGludGVyZmFjZXxlbnwwfHx8fDE3MDUyMTk1MDB8MA&ixlib=rb-4.0.3&q=80&w=1080',
    github: "https://github.com/arashjoobandi/project-alpha",
    live: "#",
  },
  {
    name: "Beta System",
    description: "A robust system offering scalable solutions for enterprise needs.",
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxlbnRlcnByaXNlJTIwc29mdHdhcmUlMjBhcHB8ZW58MHx8fHwxNzA1MjE5NTAwfDA&ixlib=rb-4.0.3&q=80&w=1080',
    github: "https://github.com/arashjoobandi/beta-system",
    live: "#",
  },
  {
    name: "Gamma Tracker",
    description: "An intuitive tracker that simplifies project management and team collaboration.",
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxwcm9qZWN0JTIwbWFuYWdlbWVudCUyMGFwcHxlbnwwfHx8fDE3MDUyMTk1MDF8MA&ixlib=rb-4.0.3&q=80&w=1080',
    github: "https://github.com/arashjoobandi/gamma-tracker",
    live: "#",
  },
  {
    name: "Delta Exchange",
    description: "A secure platform for digital asset exchange and cryptocurrency trading.",
    image: 'https://images.unsplash.com/photo-1627253781598-63b98c51da42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxjcnlwdG9jdXJyZW5jeSUyMGFwcHxlbnwwfHx8fDE3MDUyMTk1MDF8MA&ixlib=rb-4.0.3&q=80&w=1080',
    github: "https://github.com/arashjoobandi/delta-exchange",
    live: "#",
  },
  {
    name: "Epsilon Notes",
    description: "A note-taking app that organizes your thoughts and ideas efficiently.",
    image: 'https://images.unsplash.com/photo-1636297461709-0812290a9dcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxub3RlJTIwdGFraW5nJTIwYXBwfGVufDB8fHx8MTcwNTIxOTUwMXww&ixlib=rb-4.0.3&q=80&w=1080',
    github: "https://github.com/arashjoobandi/epsilon-notes",
    live: "#",
  },
  {
    name: "Zeta Stream",
    description: "A streaming service that brings you closer to the content you love.",
    image: 'https://images.unsplash.com/photo-1523365280197-f1783db9fe62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxzdHJlYW1pbmclMjBzZXJ2aWNlJTIwYXBwfGVufDB8fHx8MTcwNTIxOTUwMXww&ixlib=rb-4.0.3&q=80&w=1080',
    github: "https://github.com/arashjoobandi/zeta-stream",
    live: "#",
  },
];

const ProjectCard = ({ project }) => {
  return (
    <VStack p={4} boxShadow="md" borderWidth="1px" borderRadius="lg" align="start">
      <Image src={project.image} borderRadius="md" boxSize="100%" objectFit="cover" />
      <Heading size="md" mt={2}>
        {project.name}
      </Heading>
      <Text fontSize="sm">{project.description}</Text>
      <HStack>
        <IconButton as={Link} href={project.github} icon={<FaGithub />} aria-label="GitHub" isExternal />
        <IconButton as={Link} href={project.live} icon={<FaExternalLinkAlt />} aria-label="Live Demo" isExternal />
      </HStack>
    </VStack>
  );
};

const Index = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <Box textAlign="center" mb={10}>
        <Heading as="h1" size="2xl" mb={2}>
          Arash Joobandi
        </Heading>
        <Text fontSize="xl">Software Engineer & Creative Thinker</Text>
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
