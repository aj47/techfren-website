import { useEffect, useState } from "react";
import { AspectRatio, Box, HStack, Link, Text } from "@chakra-ui/react";
import { FaTwitch, FaYoutube } from "react-icons/fa";
import { TWITCH_CHANNEL, YOUTUBE_LATEST_PLAYLIST } from "../creatorStats";

// decapi returns plain text: an uptime like "1 hour, 5 minutes" when live,
// or "techfren is offline" otherwise.
const isLiveUptime = text => /\d+\s+(second|minute|hour|day)/i.test(text);

const LiveDot = () => (
  <Box
    as="span"
    display="inline-block"
    w="10px"
    h="10px"
    borderRadius="full"
    bg="red.500"
    boxShadow="0 0 8px red"
    sx={{
      "@keyframes pulse": { "0%, 100%": { opacity: 1 }, "50%": { opacity: 0.3 } },
      animation: "pulse 1.5s ease-in-out infinite",
      "@media (prefers-reduced-motion: reduce)": { animation: "none" },
    }}
  />
);

const LatestContent = () => {
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    fetch(`https://decapi.me/twitch/uptime/${TWITCH_CHANNEL}`)
      .then(res => (res.ok ? res.text() : ""))
      .then(text => setIsLive(isLiveUptime(text)))
      .catch(() => {});
  }, []);

  const src = isLive
    ? `https://player.twitch.tv/?channel=${TWITCH_CHANNEL}&parent=${window.location.hostname}&muted=true`
    : `https://www.youtube-nocookie.com/embed/videoseries?list=${YOUTUBE_LATEST_PLAYLIST}`;

  return (
    <Box maxW="3xl" mx="auto" mb={8}>
      <HStack justify="space-between" mb={3} flexWrap="wrap" spacing={3}>
        {isLive ? (
          <Link href={`https://twitch.tv/${TWITCH_CHANNEL}`} isExternal color="#00ff00">
            <HStack spacing={2}>
              <LiveDot />
              <Text fontSize="md" fontWeight="bold">LIVE now on Twitch</Text>
            </HStack>
          </Link>
        ) : (
          <Text fontSize="md" fontWeight="bold">Latest video</Text>
        )}
        <HStack spacing={4} fontSize="sm">
          <Link href="https://youtube.com/@techfren?sub_confirmation=1" isExternal color="#00ff00">
            <HStack spacing={1}><FaYoutube /><Text fontSize="sm">Subscribe</Text></HStack>
          </Link>
          <Link href={`https://twitch.tv/${TWITCH_CHANNEL}`} isExternal color="#00ff00">
            <HStack spacing={1}><FaTwitch /><Text fontSize="sm">{isLive ? "Watch on Twitch" : "Streams on Twitch"}</Text></HStack>
          </Link>
        </HStack>
      </HStack>
      <AspectRatio ratio={16 / 9} border="1px solid #00ff00" borderRadius="md" overflow="hidden">
        <iframe
          key={src}
          src={src}
          title={isLive ? "techfren live on Twitch" : "Latest techfren video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </AspectRatio>
    </Box>
  );
};

export default LatestContent;
