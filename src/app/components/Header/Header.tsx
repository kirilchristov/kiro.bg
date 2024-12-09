'use client';

import {useColorMode} from '@/components/ui/color-mode';
import {Box, Flex, Heading} from '@chakra-ui/react';

const Header = () => {
  const {colorMode} = useColorMode();

  const bgColor = colorMode === 'light' ? 'white' : 'gray.800';
  const mainTextColor = colorMode === 'light' ? 'black' : 'white';
  const subTextColor = colorMode === 'light' ? 'gray.600' : 'gray.300';

  return (
    <Box
      p={4}
      position="sticky"
      top="0"
      minH="50px"
      bg={bgColor}
      zIndex="sticky"
    >
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
      >
        <Heading size="lg" color={mainTextColor}>
          Kiro.bg
        </Heading>
        <Heading size="sm" color={subTextColor}>
          Eкс-блог и настоящ архив от глупости!
        </Heading>
      </Flex>
    </Box>
  );
};

export default Header;
