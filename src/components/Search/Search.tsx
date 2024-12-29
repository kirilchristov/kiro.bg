'use client';

import {useEffect, useState} from 'react';
import {Box, Input, Stack, IconButton} from '@chakra-ui/react';
import {BLUE_MAIN} from '@/app/utulities/colors';
import {LuSearch} from 'react-icons/lu';
import {useRouter, useSearchParams} from 'next/navigation';
import {fetchPosts} from '@/app/utulities/fetchPosts';
import {PostData} from '@/app/lib/types';

type SearchPostsProps = {
  // eslint-disable-next-line no-unused-vars
  onSearchResults: (posts: PostData[]) => void;
};

const SearchPosts = ({onSearchResults}: SearchPostsProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchTermFromQuery = searchParams?.get('searchTerm') || '';
    if (!searchTermFromQuery) {
      setSearchTerm('');
    }
  }, [searchParams]);

  const handleSearch = async () => {
    router.push(`/?searchTerm=${encodeURIComponent(searchTerm)}&page=1`);

    try {
      const data = await fetchPosts(1, searchTerm);
      onSearchResults(data.posts);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box my={4}>
      <Stack display="flex" flexDirection="row">
        <Input
          placeholder="Търси..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
          size="md"
          variant="outline"
          focusRingColor={BLUE_MAIN}
        />
        <IconButton
          aria-label="Search database"
          bg={BLUE_MAIN}
          onClick={handleSearch}
        >
          <LuSearch />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default SearchPosts;
