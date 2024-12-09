import {Box, Text} from '@chakra-ui/react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      as="footer"
      w="100%"
      p={4}
      bg="gray.800"
      color="white"
      textAlign="center"
    >
      <Text fontSize="sm">
        © 2007 - {currentYear} Kiro.bg - При кражба, цитирай!
      </Text>
    </Box>
  );
}
