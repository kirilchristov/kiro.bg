'use client';

import {BLUE_500} from '@/app/utulities/colors';
import {useColorMode} from '@/components/ui/color-mode';
import {Box, Flex, Heading} from '@chakra-ui/react';
import Link from 'next/link';
import {useSearch} from '../Search/SearchProvider/SearchProvider';
import SearchPosts from '../Search/Search';
import {Suspense} from 'react';

const Header = () => {
  const {colorMode} = useColorMode();
  const {setPosts} = useSearch();

  const bgColor = colorMode === 'dark' ? 'gray.800' : 'white';
  const mainTextColor = BLUE_500;
  const subTextColor = colorMode === 'dark' ? 'gray.300' : 'gray.600';

  return (
    <Box
      px={4}
      position="sticky"
      top="0"
      minH="50px"
      bg={bgColor}
      zIndex="sticky"
      borderBottom="2px solid"
      borderColor={BLUE_500}
    >
      <Flex align="center" justify="space-between">
        <Flex flexDirection="column">
          <Link href="/">
            <Heading size="lg" color={mainTextColor}>
              kiro.bg
            </Heading>
          </Link>
          <Heading
            size="sm"
            color={subTextColor}
            display={{base: 'none', sm: 'block'}}
          >
            Eкс-блог и настоящ архив от глупости!
          </Heading>
        </Flex>
        <Box>
          <Suspense>
            <SearchPosts onSearchResults={setPosts} />
          </Suspense>
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
