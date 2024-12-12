import {PostData} from '@/app/lib/types';
import {useState} from 'react';
import {Box, Input, Button, Stack} from '@chakra-ui/react';

type SearchPostsProps = {
  onSearchResults: (posts: PostData[]) => void;
};

const SearchPosts = ({onSearchResults}: SearchPostsProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    try {
      const res = await fetch(`/api/posts?searchTerm=${searchTerm}&page=1`);
      const data = await res.json();
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
        />
        <Button onClick={handleSearch} colorScheme="blue" variant="solid">
          Сърч!
        </Button>
      </Stack>
    </Box>
  );
};

export default SearchPosts;
