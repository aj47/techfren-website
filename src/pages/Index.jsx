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
  Collapse,
  Button,
} from "@chakra-ui/react";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaMoon,
  FaSun,
  FaTiktok,
  FaYoutube,
  FaTwitch,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { useState } from "react";
import videos from "../techfren_videos.json";
import projects from "../projects.json";

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

// async function fetchTikTokThumbnail (url) {
//   const encodedUrl = encodeURIComponent(url);
//   const apiUrl = `https://www.tiktok.com/oembed?url=${encodedUrl}`;

//   return await fetch(apiUrl)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then((data) => {
//       // Return the thumbnail URL
//       console.log(data.thumbnail_url, "data");
//       return data.thumbnail_url;
//     })
//     .catch((error) => {
//       console.error("Error fetching TikTok oEmbed data:", error);
//     });
// }
//
const CollapsibleSection = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <Box mb={10}>
      <Button
        variant="outline"
        colorScheme="gray"
        onClick={toggleOpen}
        width="100%"
        mb={4}
        rightIcon={isOpen ? <FaChevronUp /> : <FaChevronDown />}
        _hover={{
          bgColor: "gray.500", // Darker hover background color
          borderColor: "gray.600",
          color: "gray.800", // Darker text color on hover
        }}
      >
        <Text fontSize="xl">
          {" "}
          {/* Increased title font size to extra large */}
          {title}
        </Text>
      </Button>
      <Collapse in={isOpen}>
        <Box p={4}>{children}</Box>
      </Collapse>
    </Box>
  );
};

const Index = () => {
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const color = useColorModeValue("gray.800", "white");
  // const [videos, setVideos] = useState([]);

  // useEffect(() => {
  //   fetch("/public/techfren_videos.json")
  //     .then((response) => response.json())
  //     .then((data) => setVideos(data))
  //     .catch((error) => console.error("Error loading videos:", error));
  // }, []);

  console.log(videos, "videos");
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
        </Box>
        <HStack spacing={4} justify="center" mt={4}>
          <IconButton
            as={Link}
            href="https://tiktok.com/@techfren"
            icon={<FaTiktok />}
            aria-label="TikTok"
            isExternal
          />
          <IconButton
            as={Link}
            href="https://youtube.com/techfren"
            icon={<FaYoutube />}
            aria-label="YouTube"
            isExternal
          />
          <IconButton
            as={Link}
            href="https://twitch.tv/techfren"
            icon={<FaTwitch />}
            aria-label="Twitch"
            isExternal
          />
        </HStack>
      </Box>
      <CollapsibleSection title="ShortForm Content" defaultOpen={true}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {videos?.slice(0, 6).map((video, index) => {
            return (
              <Box
                key={index}
                p={4}
                boxShadow="md"
                borderWidth="1px"
                borderRadius="lg"
                align="start"
              >
                {/* <AspectRatio ratio={16 / 9}>
                <Image src={await fetchTikTokThumbnail(video["tiktok link"])} />
              </AspectRatio> */}
                <Heading size="md" mt={2}>
                  {video["video caption / description"]?.slice(0, 20)}
                </Heading>
                <Text fontSize="sm">Views: {video["video views"]}</Text>
                <Text fontSize="sm">Likes: {video["likes"]}</Text>
                <Text fontSize="sm">Comments: {video["comments"]}</Text>
                <Text fontSize="sm">Duration: {video["video duration"]}</Text>
                <Link href={video["tiktok link"]} isExternal>
                  Watch Video
                </Link>
              </Box>
            );
          })}
        </SimpleGrid>
      </CollapsibleSection>
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
