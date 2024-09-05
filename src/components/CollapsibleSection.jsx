import { Box, Text, Collapse } from "@chakra-ui/react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { useState } from "react";

export default function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <Box mb={4}>
      <Box
        as="button"
        onClick={toggleOpen}
        width="100%"
        textAlign="left"
        bg="transparent"
        border="none"
        cursor="pointer"
        _hover={{ color: "green.300" }}
        transition="color 0.2s"
      >
        <Text
          fontSize="xs"
          fontFamily="'Press Start 2P', cursive"
          display="flex"
          alignItems="center"
        >
          {isOpen ? <FaChevronDown /> : <FaChevronRight />}
          <Box as="span" ml={2}>
            {title}
          </Box>
        </Text>
      </Box>
      <Collapse in={isOpen}>
        <Box pl={6} mt={2} borderLeft="1px dashed #00ff00">
          {children}
        </Box>
      </Collapse>
    </Box>
  );
}
