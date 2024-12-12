'use client';

import {useEffect, useState} from 'react';
import Pagination from '../Pagination/Pagination';
import {PostData} from '../../app/lib/types';
import {useRouter, useSearchParams} from 'next/navigation';
import ListPostItem from '../ListPostItem/ListPostItem';
import {Box} from '@chakra-ui/react/box';
import {Spinner} from '@chakra-ui/react/spinner';
import {Separator, Stack} from '@chakra-ui/react';
import SearchPosts from '../Search/Search';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPage = parseInt(searchParams?.get('page') || '1', 10);

  const [posts, setPosts] = useState<PostData[]>([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/posts?page=${currentPage}`);
        const data = await response.json();

        if (response.ok) {
          setPosts(data.posts);
          setTotalPages(data.totalPages);
        } else {
          console.error('Failed to fetch posts:', data.error);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [currentPage]);

  return (
    <>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          setCurrentPage(page);
          router.push(`/?page=${page}`);
        }}
      />
      <SearchPosts onSearchResults={setPosts} />
      <Box mt={6}>
        {!posts.length ? (
          totalPages > 1 ? (
            'Нищо не намирам'
          ) : (
            <Box display="flex" justifyContent="center" alignItems="center">
              <Spinner size="xl" />
            </Box>
          )
        ) : (
          <Stack gap={6}>
            {posts.map(({id, title, date, slug, postImage}) => (
              <Box key={id} p={2}>
                <ListPostItem
                  id={id}
                  title={title}
                  date={date}
                  slug={slug}
                  postImage={postImage}
                />
                <Separator />
              </Box>
            ))}
          </Stack>
        )}
      </Box>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          setCurrentPage(page);
          router.push(`/?page=${page}`);
        }}
      />
    </>
  );
}
