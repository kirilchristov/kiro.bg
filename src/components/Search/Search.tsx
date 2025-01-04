'use client';

import {useEffect, useRef, useState} from 'react';
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
  const [isSearchActive, setIsSearchActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node)
      ) {
        setIsSearchActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const handleIconClick = () => {
    setIsSearchActive(true);
    inputRef.current?.focus();
  };

  return (
    <Box my={4} ref={searchBoxRef}>
      {isSearchActive ? (
        <Stack display="flex" flexDirection="row">
          <Input
            ref={inputRef}
            placeholder="Търси..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
            size="md"
            variant="outline"
            focusRingColor={BLUE_MAIN}
          />
        </Stack>
      ) : (
        <IconButton
          aria-label="Open search bar"
          color={BLUE_MAIN}
          variant="ghost"
          onClick={handleIconClick}
        >
          <LuSearch />
        </IconButton>
      )}
    </Box>
  );
};

export default SearchPosts;
