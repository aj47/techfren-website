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
    <Box mb={0}>
      <Button
        variant="outline"
        colorScheme="green"
        onClick={toggleOpen}
        width="100%"
        mb={4}
        rightIcon={isOpen ? <FaChevronUp /> : <FaChevronDown />}
        color="#00ff00"
        borderColor="#00ff00"
        _hover={{
          bgColor: "rgba(0, 255, 0, 0.2)",
          borderColor: "#00ff00",
          color: "#00ff00",
        }}
      >
        <Text fontSize="xl" textShadow="0 0 5px #00ff00">
          {title}
        </Text>
      </Button>
      <Collapse in={isOpen}>
        <Box p={4}>
          {children}
        </Box>
      </Collapse>
    </Box>
  );
}
