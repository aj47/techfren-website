import { ChakraProvider, Container } from "@chakra-ui/react";
import NewsletterSignup from "../components/NewsletterSignup";
import SEO from "../components/SEO";
import theme from "../theme";

export default function Newsletter() {
  return (
    <ChakraProvider theme={theme}>
      <SEO title="Newsletter | TechFren" description="AI agent workflows and tools from TechFren." />
      <Container maxW="container.md" py={20}>
        <NewsletterSignup source="techfren-signup-page" />
      </Container>
    </ChakraProvider>
  );
}
