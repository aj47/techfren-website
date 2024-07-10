import { Link, HStack, IconButton, useColorMode } from "@chakra-ui/react";
import { FaTiktok, FaYoutube, FaTwitch, FaInstagram, FaTwitter, FaDiscord } from "react-icons/fa";

/**
 * A social media links component.
 * 
 * Displays a horizontal stack of icon buttons that link to various social media platforms.
 * 
 * @returns {JSX.Element} A horizontal stack of social media icon buttons.
 */
export default function Socials() {
  const { colorMode } = useColorMode();

  const iconButtonProps = {
    size: "lg",
    fontSize: "3xl", // Increased from 2xl to 3xl
    color: "#00ff00",
    bg: "rgba(0, 0, 0, 0.7)",
    _hover: {
      bg: "rgba(0, 255, 0, 0.1)",
    },
  };

  return (
    <HStack spacing={4} justify="center" m={4}>
      <IconButton
        as={Link}
        href="https://tiktok.com/@techfren"
        icon={<FaTiktok />}
        aria-label="TikTok"
        isExternal
        {...iconButtonProps}
      />
      <IconButton
        as={Link}
        href="https://instagram.com/techfren"
        icon={<FaInstagram />}
        aria-label="Instagram"
        isExternal
        {...iconButtonProps}
      />
      <IconButton
        as={Link}
        href="https://youtube.com/@techfren"
        icon={<FaYoutube />}
        aria-label="YouTube"
        isExternal
        {...iconButtonProps}
      />
      <IconButton
        as={Link}
        href="https://twitch.tv/techfren"
        icon={<FaTwitch />}
        aria-label="Twitch"
        isExternal
        {...iconButtonProps}
      />
      <IconButton
        as={Link}
        href="https://twitter.com/techfrenAJ"
        icon={<FaTwitter />}
        aria-label="Twitter"
        isExternal
        {...iconButtonProps}
      />
      <IconButton
        as={Link}
        href="https://discord.gg/cK9WeQ7jPq"
        icon={<FaDiscord />}
        aria-label="Discord"
        isExternal
        {...iconButtonProps}
      />
    </HStack>
  );
}
