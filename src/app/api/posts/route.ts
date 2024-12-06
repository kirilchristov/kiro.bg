import {NextResponse} from 'next/server';
import {getPaginatedPostsData} from '../../../../lib/posts';

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const POST_PER_PAGE = 10;

  try {
    const {posts, totalPages} = await getPaginatedPostsData(
      page,
      POST_PER_PAGE
    );
    return NextResponse.json({posts, totalPages});
  } catch (error) {
    console.error('Error fetching paginated posts:', error);
    return NextResponse.json({error: 'Failed to fetch posts'}, {status: 500});
  }
}
