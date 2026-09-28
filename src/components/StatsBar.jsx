import { useEffect, useState } from "react";
import { Box, Link, SimpleGrid, Text } from "@chakra-ui/react";
import { creatorStats, DISCORD_INVITE, formatCount } from "../creatorStats";

const Stat = ({ value, label, href }) => (
  <Link
    href={href}
    isExternal
    _hover={{ textDecoration: "none", bg: "rgba(0, 255, 0, 0.1)" }}
    display="block"
    border="1px solid #00ff00"
    borderRadius="md"
    bg="rgba(0, 0, 0, 0.8)"
    px={3}
    py={3}
  >
    <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" lineHeight="1.2">
      {value}
    </Text>
    <Text fontSize="xs" textShadow="none" opacity={0.85} mt={1}>
      {label}
    </Text>
  </Link>
);

const StatsBar = () => {
  const [discordMembers, setDiscordMembers] = useState(creatorStats.discordMembers);
  const [repoStars, setRepoStars] = useState(creatorStats.topRepo.stars);

  useEffect(() => {
    // Both endpoints allow cross-origin reads; on failure keep the fallback values.
    fetch(`https://discord.com/api/v9/invites/${DISCORD_INVITE}?with_counts=true`)
      .then(res => (res.ok ? res.json() : null))
      .then(data => data?.approximate_member_count && setDiscordMembers(data.approximate_member_count))
      .catch(() => {});

    fetch(`https://api.github.com/repos/${creatorStats.topRepo.repo}`)
      .then(res => (res.ok ? res.json() : null))
      .then(data => data?.stargazers_count && setRepoStars(data.stargazers_count))
      .catch(() => {});
  }, []);

  return (
    <Box maxW="3xl" mx="auto" mb={6}>
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={3}>
        <Stat
          value={`${formatCount(creatorStats.totalFollowers)}+`}
          label="followers across platforms"
          href="https://beacons.ai/techfren/mediakit"
        />
        <Stat
          value={formatCount(creatorStats.youtubeSubscribers)}
          label="YouTube subscribers"
          href="https://youtube.com/@techfren?sub_confirmation=1"
        />
        <Stat
          value={formatCount(discordMembers)}
          label="Discord members"
          href="https://discord.gg/cK9WeQ7jPq"
        />
        <Stat
          value={`${repoStars}★`}
          label={`${creatorStats.topRepo.name} on GitHub`}
          href={`https://github.com/${creatorStats.topRepo.repo}`}
        />
      </SimpleGrid>
    </Box>
  );
};

export default StatsBar;
