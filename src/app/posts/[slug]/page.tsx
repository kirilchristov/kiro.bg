import parseHtmlToReact from '@/app/utulities/parseHtmlToReact';
import {getPostData} from '../../lib/api';
import DateFormatter from '@/app/components/DateFormatter/DateFormatter';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PostPage({params}: Props) {
  const {slug} = await params;
  const postData = await getPostData(slug);

  if (!postData) {
    return <div>Post not found</div>;
  }

  const reactContent = parseHtmlToReact(postData.content)

  return (
    <article>
      <h1>{postData.title}</h1>
      <DateFormatter dateString={postData.date} />
      <div>{reactContent}</div>
    </article>
  );
}

export async function generateMetadata({params}: Props) {
  const {slug} = await params;
  const postData = await getPostData(slug);

  if (!postData) {
    return {
      title: 'Post Not Found',
      description: 'The requested post does not exist.',
    };
  }

  return {
    title: `Kiro.bg - ${postData.title}`,
    description: postData.summary || 'Read more about this post.',
    openGraph: {
      title: postData.title,
      description: postData?.summary || 'Read more about this post.',
      url: `/posts/${postData.slug}`,
      type: 'article',
      images: [
        {
          url: postData?.postImage,
          width: 'auto',
          height: 'auto',
          alt: postData.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: postData.title,
      description: postData.summary,
      images: postData.postImage ? [postData.postImage] : undefined,
    },
  };
}
