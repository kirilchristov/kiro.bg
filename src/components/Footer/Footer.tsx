import {BLUE_MAIN} from '@/app/utulities/colors';
import {Box, Text} from '@chakra-ui/react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      as="footer"
      w="100%"
      p={4}
      bg={BLUE_MAIN}
      color="white"
      textAlign="center"
    >
      <Text fontSize="sm">
        © 2007 - {currentYear} Kiro.bg - Ако взимаш, цитирай!
      </Text>
      <Text fontSize="2xs">
        Част от използваните снимкови материали преди 2018 са взимани без права
        от интернет.
      </Text>
    </Box>
  );
}
