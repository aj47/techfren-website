import { Link, HStack, IconButton } from "@chakra-ui/react";
import { FaTiktok, FaYoutube, FaTwitch, FaInstagram, FaTwitter } from "react-icons/fa";


/**
 * A social media links component.
 * 
 * Displays a horizontal stack of icon buttons that link to various social media platforms.
 * 
 * @returns {JSX.Element} A horizontal stack of social media icon buttons.
 */
export default function Socials() {
  return (
    <HStack spacing={4} justify="center" mt={4}>
      <IconButton
        as={Link}
        href="https://tiktok.com/@techfren"
        icon={<FaTiktok />}
        aria-label="TikTok"
        isExternal
      />
      <IconButton
        as={Link}
        href="https://instagram.com/techfren"
        icon={<FaInstagram />}
        aria-label="Instagram"
        isExternal
      />
      <IconButton
        as={Link}
        href="https://youtube.com/techfren"
        icon={<FaYoutube />}
        aria-label="YouTube"
        isExternal
      />
      <IconButton
        as={Link}
        href="https://twitch.tv/techfren"
        icon={<FaTwitch />}
        aria-label="Twitch"
        isExternal
      />
      <IconButton
        as={Link}
        href="https://twitter.com/techfrenAJ"
        icon={<FaTwitter />}
        aria-label="Twitter"
        isExternal
      />
    </HStack>
  );
}
