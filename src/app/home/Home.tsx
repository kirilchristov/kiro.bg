'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';
import Pagination from '../components/Pagination/Pagination';
import {PostData} from '../../../lib/types';
import {useRouter, useSearchParams} from 'next/navigation';
import DateFormatter from '../components/DateFormatter/DateFormatter';
import ImageContent from '../components/Image/ImageContent';
import ListPostItem from '../components/ListPostItem/ListPostItem';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPage = parseInt(searchParams.get('page') || '1', 10);

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
    <div>
      <h1>Kiro.bg</h1>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          setCurrentPage(page);
          router.push(`/?page=${page}`);
        }}
      />
      <div>
        <ul style={{listStyle: 'none', padding: 0}}>
          {!posts.length && <h1>Чекай малко...</h1>}
          {posts.map(({id, title, date, slug, postImage}) => (
            <li key={id}>
              <ListPostItem
                id={id}
                title={title}
                date={date}
                slug={slug}
                postImage={postImage}
              />
            </li>
          ))}
        </ul>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          setCurrentPage(page);
          router.push(`/?page=${page}`);
        }}
      />
    </div>
  );
}
