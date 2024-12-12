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

  const initialPage = searchParams?.get('page') || '1';
  const initialSearchTerm = searchParams?.get('searchTerm') || '';

  const {posts, setPosts} = useSearch();
  const [currentPage, setCurrentPage] = useState<string>(initialPage);
  const [inputPage, setInputPage] = useState<string>(initialPage);
  const [totalPages, setTotalPages] = useState<string>('1');

  const handlePageChange = (page: string) => {
    const pageNumber = Number(page);

    if (pageNumber >= 1 && pageNumber <= Number(totalPages)) {
      setCurrentPage(page);
      setInputPage(page);
      router.push(
        `/?searchTerm=${encodeURIComponent(initialSearchTerm)}&page=${page}`
      );
    }
  };

  const handleInputSubmit = () => {
    const pageNumber = Number(inputPage);

    if (
      !inputPage ||
      isNaN(pageNumber) ||
      pageNumber < 1 ||
      pageNumber > Number(totalPages)
    ) {
      alert(`Моля въведете номер на страница между 1 и ${totalPages}`);
    } else {
      handlePageChange(inputPage);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPosts(Number(currentPage), initialSearchTerm);

      setPosts(data.posts);
      setTotalPages(String(data.totalPages));
    };

    fetchData();
  }, [currentPage, initialSearchTerm, setPosts]);

  return (
    <>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        inputPage={inputPage}
        onPageChange={handlePageChange}
        onInputChange={setInputPage}
        onInputSubmit={handleInputSubmit}
      />

      <Box mt={6}>
        {!posts.length ? (
          totalPages === '0' ? (
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
        inputPage={inputPage}
        onPageChange={handlePageChange}
        onInputChange={setInputPage}
        onInputSubmit={handleInputSubmit}
      />
    </>
  );
}
