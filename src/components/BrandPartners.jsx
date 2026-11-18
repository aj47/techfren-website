import { Box, Image, Link, Text, Tooltip, Wrap, WrapItem } from "@chakra-ui/react";
import { mediaKit } from "../mediakit";

const BrandPartners = () => (
  <Box maxW="3xl" mx="auto" mt={5}>
    <Text fontSize="xs" textTransform="uppercase" letterSpacing="0.1em" opacity={0.8} mb={2}>
      Brands I&apos;ve worked with
    </Text>
    <Wrap justify="center" spacing={{ base: 2, md: 3 }}>
      {mediaKit.brandPartners.map(partner => (
        <WrapItem key={partner.name}>
          <Tooltip label={partner.name} hasArrow>
            <Link href="/mediakit" aria-label={partner.name} display="block">
              <Image
                src={`/mediakit/logo-${partner.logo}.png`}
                alt={partner.name}
                boxSize={{ base: "32px", md: "40px" }}
                borderRadius="md"
                bg="white"
                p="3px"
                objectFit="contain"
                border="1px solid #00ff00"
                loading="lazy"
                transition="transform 0.15s"
                _hover={{ transform: "scale(1.1)" }}
              />
            </Link>
          </Tooltip>
        </WrapItem>
      ))}
    </Wrap>
  </Box>
);

export default BrandPartners;
