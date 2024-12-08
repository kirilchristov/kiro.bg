import {Box, Flex, Heading} from '@chakra-ui/react';

const Header = () => {
  return (
    <Box p={4} position="sticky" top="0" minH="50px" bg="white" zIndex="sticky">
      <Flex alignItems="center" justifyContent="space-between">
        <Heading size="lg">
          Kiro.bg - екс-блог и настоящ архив от глупости!
        </Heading>
      </Flex>
    </Box>
  );
};

export default Header;
