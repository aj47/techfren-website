import { useState } from "react";
import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";

const ENDPOINT = "https://joobandi.com/api/subscribe";

export default function NewsletterSignup({ source = "techfren-home" }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle");

  const submit = async (e) => {
    e.preventDefault();
    setState("loading");
    try {
      const r = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      setState(r.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  };

  return (
    <Box textAlign="center" p={6} my={8} borderRadius="lg" borderWidth="1px" borderColor="whiteAlpha.300" bg="blackAlpha.500">
      <Heading size="md" mb={2}>The TechFren newsletter</Heading>
      <Text mb={4} color="gray.400">AI agent workflows I actually use and new tools worth your time.</Text>
      {state === "done" ? (
        <Text color="green.300">You&apos;re in. Watch your inbox.</Text>
      ) : (
        <Flex as="form" onSubmit={submit} gap={2} maxW="md" mx="auto" direction={{ base: "column", sm: "row" }}>
          <Input type="email" required placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button type="submit" colorScheme="purple" isLoading={state === "loading"}>Subscribe</Button>
        </Flex>
      )}
      {state === "error" && <Text mt={2} color="red.300">Something went wrong, try again.</Text>}
    </Box>
  );
}
