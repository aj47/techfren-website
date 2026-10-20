import { useEffect, useState } from "react";
import { Box, Link, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { creatorStats, DISCORD_INVITE, formatCount } from "../creatorStats";

const Stat = ({ value, label, href }) => (
  <WrapItem>
    <Link
      href={href}
      isExternal={href.startsWith("http")}
      _hover={{ textDecoration: "none", bg: "rgba(0, 255, 0, 0.1)" }}
      border="1px solid #00ff00"
      borderRadius="full"
      bg="rgba(0, 0, 0, 0.8)"
      px={{ base: 2, md: 3 }}
      py={1}
    >
      <Text as="span" fontSize={{ base: "xs", md: "sm" }} textShadow="none">
        <Text as="span" fontSize="inherit" fontWeight="bold">{value}</Text> {label}
      </Text>
    </Link>
  </WrapItem>
);

const StatsBar = () => {
  const [discordMembers, setDiscordMembers] = useState(creatorStats.discordMembers);

  useEffect(() => {
    // The endpoint allows cross-origin reads; on failure keep the fallback value.
    fetch(`https://discord.com/api/v9/invites/${DISCORD_INVITE}?with_counts=true`)
      .then(res => (res.ok ? res.json() : null))
      .then(data => data?.approximate_member_count && setDiscordMembers(data.approximate_member_count))
      .catch(() => {});
  }, []);

  return (
    <Box maxW="3xl" mx="auto">
      <Wrap justify="center" spacing={{ base: 1.5, md: 2 }}>
        <Stat
          value={`${formatCount(creatorStats.totalFollowers)}+`}
          label="followers"
          href="/mediakit"
        />
        <Stat
          value={formatCount(discordMembers)}
          label="Discord members"
          href="https://discord.gg/cK9WeQ7jPq"
        />
      </Wrap>
    </Box>
  );
};

export default StatsBar;
