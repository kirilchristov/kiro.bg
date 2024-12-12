'use client';

import {useEffect, useState} from 'react';
import Pagination from '../Pagination/Pagination';
import {PostData} from '../../app/lib/types';
import {useRouter, useSearchParams} from 'next/navigation';
import ListPostItem from '../ListPostItem/ListPostItem';
import {Box, Spinner, Stack} from '@chakra-ui/react';
import {useSearch} from '../Search/SearchProvider/SearchProvider';
import {fetchPosts} from '@/app/utulities/fetchPosts';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPage = parseInt(searchParams?.get('page') || '1', 10);
  const initialSearchTerm = searchParams?.get('searchTerm') || '';

  const {posts, setPosts} = useSearch();
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPosts(currentPage, initialSearchTerm);

      setPosts(data.posts);
      setTotalPages(data.totalPages);
    };

    fetchData();
  }, [currentPage, initialSearchTerm, setPosts]);

  return (
    <>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          setCurrentPage(page);
          router.push(
            `/?searchTerm=${encodeURIComponent(initialSearchTerm)}&page=${page}`
          );
        }}
      />

      <Box mt={6}>
        {!posts.length ? (
          !totalPages ? (
            'Нищо не намирам'
          ) : (
            <Box display="flex" justifyContent="center" alignItems="center">
              <Spinner size="xl" />
            </Box>
          )
        ) : (
          <Stack gap={6}>
            {posts.map(({id, title, date, slug, postImage}: PostData) => (
              <Box key={id} p={2}>
                <ListPostItem
                  id={id}
                  title={title}
                  date={date}
                  slug={slug}
                  postImage={postImage}
                />
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
          router.push(
            `/?searchTerm=${encodeURIComponent(initialSearchTerm)}&page=${page}`
          );
        }}
      />
    </>
  );
}
