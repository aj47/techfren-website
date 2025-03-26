import { Box, Button, Text, Collapse, useTheme, useBreakpointValue } from "@chakra-ui/react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState } from "react";

export default function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const theme = useTheme();
  
  // Responsive text size
  const fontSize = useBreakpointValue({ base: "xs", sm: "sm" });
  const buttonPadding = useBreakpointValue({ base: "2", sm: "4" });
  const iconSize = useBreakpointValue({ base: "12px", sm: "14px" });

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <Box mb={2}>
      <Button
        variant="outline"
        colorScheme="green"
        onClick={toggleOpen}
        width="100%"
        mb={2}
        py={buttonPadding}
        rightIcon={isOpen ? <FaChevronUp size={iconSize} /> : <FaChevronDown size={iconSize} />}
        color="#00ff00"
        borderColor="#00ff00"
        size={useBreakpointValue({ base: "sm", sm: "md" })}
        bg="rgba(0, 0, 0, 0.8)"
        _hover={{
          bgColor: "rgba(0, 255, 0, 0.2)",
          borderColor: "#00ff00",
          color: "#00ff00",
        }}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text 
          fontSize={fontSize}
          textShadow="0 0 5px #00ff00"
          fontFamily={theme.fonts.heading}
          isTruncated
          maxW="90%"
        >
          {title}
        </Text>
      </Button>
      <Collapse in={isOpen}>
        <Box p={useBreakpointValue({ base: 2, sm: 4 })}>
          {children}
        </Box>
      </Collapse>
    </Box>
  );
}
