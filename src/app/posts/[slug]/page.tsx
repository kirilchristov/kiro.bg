import parseHtmlToReact from '@/app/utulities/parseHtmlToReact';
import {getAllPostSlugs, getPostData} from '../../lib/api';
import SinglePost from '@/components/SinglePost/SinglePost';
import {postMetadata} from '@/app/utulities/postMetadata';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({slug}));
}

export default async function PostPage({params}: Props) {
  const {slug} = await params;
  const decodedSlug = decodeURIComponent(slug);
  const postData = await getPostData(decodedSlug);

  if (!postData) {
    return <div>Post not found</div>;
  }

  const reactContent = parseHtmlToReact(postData.content);

  return (
    <SinglePost
      title={postData.title}
      date={postData.date}
      content={reactContent}
    />
  );
}

export async function generateMetadata({params}: Props) {
  const {slug} = await params;
  const decodedSlug = decodeURIComponent(slug);
  const postData = await getPostData(decodedSlug);

  if (!postData) {
    return {
      title: 'Post Not Found',
      description: 'The requested post does not exist.',
    };
  }

  return postMetadata(postData);
}
