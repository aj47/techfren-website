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
    <Box textAlign="center" p={{ base: 6, md: 10 }} my={10} borderRadius="lg" borderWidth="2px" borderColor="#00ff00" boxShadow="0 0 14px #00ff00" bg="blackAlpha.800">
      <Heading as="h2" fontSize={{ base: "md", md: "xl" }} color="#00ff00" mb={4}>Join the newsletter</Heading>
      <Text mb={6} color="#00ff00">AI agent workflows I actually use and new tools worth your time.</Text>
      {state === "done" ? (
         <Text color="#00ff00">You&apos;re in. Watch your inbox.</Text>
      ) : (
        <Flex as="form" onSubmit={submit} gap={2} maxW="md" mx="auto" direction={{ base: "column", sm: "row" }}>
          <Input type="email" size="lg" bg="black" color="#00ff00" borderColor="#00ff00" _placeholder={{ color: "green.700" }} _hover={{ borderColor: "#00ff00" }} _focus={{ borderColor: "#00ff00", boxShadow: "0 0 10px #00ff00" }} required placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button type="submit" size="lg" bg="#00ff00" color="black" fontFamily="'Press Start 2P', cursive" fontSize="xs" px={6} _hover={{ bg: "#00ff00", boxShadow: "0 0 16px #00ff00" }} isLoading={state === "loading"}>Subscribe</Button>
        </Flex>
      )}
      {state === "error" && <Text mt={2} color="red.300">Something went wrong, try again.</Text>}
    </Box>
  );
}
