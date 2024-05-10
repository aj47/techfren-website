import { Box, Button, Text, Collapse } from "@chakra-ui/react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState } from "react";
export default function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <Box mb={10}>
      <Button
        variant="outline"
        colorScheme="gray"
        onClick={toggleOpen}
        width="100%"
        mb={4}
        rightIcon={isOpen ? <FaChevronUp /> : <FaChevronDown />}
        _hover={{
          bgColor: "gray.500", // Darker hover background color
          borderColor: "gray.600",
          color: "gray.800", // Darker text color on hover
        }}
      >
        <Text fontSize="xl">
          {" "}
          {/* Increased title font size to extra large */}
          {title}
        </Text>
      </Button>
      <Collapse in={isOpen}>
        <Box p={4}>{children}</Box>
      </Collapse>
    </Box>
  );
}
