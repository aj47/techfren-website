import { Box, ChakraProvider, Container, Heading, Image, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import NewsletterSignup from "../components/NewsletterSignup";
import DigitalRain from "../components/DigitalRain";
import Socials from "./Socials";
import SEO from "../components/SEO";
import theme from "../theme";
import "@fontsource/press-start-2p";
import "@fontsource/roboto";

export default function Newsletter() {
  return (
    <ChakraProvider theme={theme}>
      <SEO title="Newsletter | techfren" description="AI agent workflows and tools from techfren." />
      <DigitalRain />
      <Container maxW="container.md" py={10} textAlign="center" position="relative">
        <Link as={RouterLink} to="/" _hover={{ textDecoration: "none" }}>
          <Heading as="h1" fontSize={{ base: "3xl", md: "5xl" }} mb={6}>techfren_</Heading>
        </Link>
        <Box display="flex" justifyContent="center" mb={2}>
          <Image src="/hero.jpg" alt="techfren" maxW={{ base: 110, md: 140 }} borderRadius="10%" />
        </Box>
        <NewsletterSignup source="techfren-signup-page" />
        <Socials />
      </Container>
    </ChakraProvider>
  );
}
