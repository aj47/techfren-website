import { useEffect, useState } from "react";
import { Box, Link, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { creatorStats, DISCORD_INVITE, formatCount } from "../creatorStats";

const Stat = ({ value, label, href }) => (
  <WrapItem>
    <Link
      href={href}
      isExternal
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
    <Box maxW="3xl" mx="auto">
      <Wrap justify="center" spacing={{ base: 1.5, md: 2 }}>
        <Stat
          value={`${formatCount(creatorStats.totalFollowers)}+`}
          label="followers"
          href="https://beacons.ai/techfren/mediakit"
        />
        <Stat
          value={formatCount(creatorStats.youtubeSubscribers)}
          label="YouTube subs"
          href="https://youtube.com/@techfren?sub_confirmation=1"
        />
        <Stat
          value={formatCount(discordMembers)}
          label="Discord members"
          href="https://discord.gg/cK9WeQ7jPq"
        />
        <Stat
          value={`${repoStars}★`}
          label={creatorStats.topRepo.name}
          href={`https://github.com/${creatorStats.topRepo.repo}`}
        />
      </Wrap>
    </Box>
  );
};

export default StatsBar;
