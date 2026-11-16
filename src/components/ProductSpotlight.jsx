import { Box, Button, Heading, Image, Stack, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { FaExternalLinkAlt, FaGithub, FaGooglePlay } from "react-icons/fa";

const linkButton = {
  as: "a",
  target: "_blank",
  rel: "noopener noreferrer",
  size: "md",
  borderRadius: "md",
  border: "2px solid #00ff00",
  fontFamily: "Roboto, sans-serif",
};

// A product shown at full width: screenshot beside the pitch on desktop,
// stacked on mobile. Pass wide={false} when several products share a row.
const ProductSpotlight = ({ product, wide = true }) => (
  <Stack
    direction={wide ? { base: "column", md: "row" } : "column"}
    spacing={{ base: 4, md: 8 }}
    align="center"
    p={{ base: 4, md: 6 }}
    borderWidth="2px"
    borderColor="#00ff00"
    borderRadius="lg"
    boxShadow="0 0 10px #00ff00"
    bg="rgba(0, 0, 0, 0.8)"
  >
    <Box
      as="a"
      href={product.live}
      target="_blank"
      rel="noopener noreferrer"
      flex={wide ? { md: "1 1 55%" } : undefined}
      w="100%"
      minW={0}
    >
      <Image
        src={product.image}
        alt={`Screenshot of ${product.name}`}
        w="100%"
        borderRadius="lg"
        border="1px solid rgba(0, 255, 0, 0.4)"
      />
    </Box>
    <VStack align="start" spacing={4} flex={wide ? { md: "1 1 45%" } : undefined} w="100%" minW={0}>
      <Heading as="h3" fontSize={{ base: "lg", md: "xl", lg: "2xl" }} lineHeight="1.4" color="#00ff00">
        {product.name}
      </Heading>
      <Text fontSize={{ base: "sm", md: "md" }} color="#00ff00" textShadow="none">
        {product.description}
      </Text>
      <Wrap spacing={3}>
        {product.live && (
          <WrapItem>
            <Button
              {...linkButton}
              href={product.live}
              rightIcon={<FaExternalLinkAlt size={12} />}
              bg="#00ff00"
              color="black"
              _hover={{ bg: "#bcffbc" }}
            >
              Open app
            </Button>
          </WrapItem>
        )}
        {product.playStore && (
          <WrapItem>
            <Button
              {...linkButton}
              href={product.playStore}
              leftIcon={<FaGooglePlay size={14} />}
              bg="transparent"
              color="#00ff00"
              _hover={{ bg: "rgba(0, 255, 0, 0.15)" }}
            >
              Google Play
            </Button>
          </WrapItem>
        )}
        {product.github && (
          <WrapItem>
            <Button
              {...linkButton}
              href={product.github}
              leftIcon={<FaGithub size={14} />}
              bg="transparent"
              color="#00ff00"
              _hover={{ bg: "rgba(0, 255, 0, 0.15)" }}
            >
              GitHub
            </Button>
          </WrapItem>
        )}
      </Wrap>
    </VStack>
  </Stack>
);

export default ProductSpotlight;
