import parseHtmlToReact from '@/app/utulities/parseHtmlToReact';
import markdownToHtml from '../../../../lib/markdownToHtml';
import {getPostData} from '../../../../lib/posts';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PostPage({params}: Props) {
  const {slug} = await params;
  const postData = await getPostData(slug);

  // console.log('postData', postData.contentHtml);

  if (!postData) {
    return <div>Post not found</div>;
  }

  const htmlContent = await markdownToHtml(postData.contentHtml || '');

  console.log('htmlContent', htmlContent);
  const content = parseHtmlToReact(htmlContent);

  // console.log('content', content);

  return (
    <article>
      <h1>{postData.title}</h1>
      <p>{postData.date}</p>
      <div>{content}</div>
    </article>
  );
}
