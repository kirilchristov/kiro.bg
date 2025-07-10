'use server';

export async function fetchPosts(page: number, searchTerm: string = '') {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
      ? process.env.NEXT_PUBLIC_SITE_URL
      : '';
    const url = `${baseUrl}/api/posts?page=${page}&searchTerm=${encodeURIComponent(searchTerm)}`;

    const response = await fetch(url, {
      // next: {revalidate: 3600}, // Cache for 1 hour
      cache: 'no-store',
      next: {revalidate: 0},
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
