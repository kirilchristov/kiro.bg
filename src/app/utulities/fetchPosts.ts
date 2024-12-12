'use server';

export async function fetchPosts(page: number, searchTerm: string = '') {
  try {
    const url = `${
      process.env.NEXT_PUBLIC_SITE_URL || ''
    }/api/posts?page=${page}&searchTerm=${encodeURIComponent(searchTerm)}`;

    const response = await fetch(url, {
      cache: 'no-store', // Prevent cache for server-side
    });

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {posts: [], totalPages: 1};
  }
}
