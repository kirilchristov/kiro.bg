import {Box, Flex, Heading} from '@chakra-ui/react';
import Link from 'next/link';

const Header = () => {
  return (
    <Box p={4} position="sticky" top="0" minH="50px" bg="white" zIndex="sticky">
      <Link href="/">
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
        >
          <Heading size="lg">Kiro.bg</Heading>
          <Heading size="sm" color="GrayText">
            Eкс-блог и настоящ архив от глупости!
          </Heading>
        </Flex>
      </Link>
    </Box>
  );
};

export default Header;
