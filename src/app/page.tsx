import Home from '../components/Home/Home';
import {Suspense} from 'react';
import {generalMetadata} from './utulities/generalMetadata';
import {getPaginatedPostsData} from './lib/api';

export const generateMetadata = async () => {
  return generalMetadata();
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {page?: string; searchTerm?: string};
}) {
  const page = parseInt(searchParams?.page || '1', 10);
  const searchTerm = searchParams?.searchTerm || '';
  const POSTS_PER_PAGE = 10;

  const {posts, totalPages} = await getPaginatedPostsData(
    page,
    POSTS_PER_PAGE,
    searchTerm
  );

  return (
    <Suspense fallback={<div>Зареждам...</div>}>
      <Home
        initialPosts={posts}
        initialTotalPages={totalPages}
      />
    </Suspense>
  );
}
