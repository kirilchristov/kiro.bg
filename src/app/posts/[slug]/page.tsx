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

  if (!postData) {
    // return 404
  }

  const content = await markdownToHtml(postData.contentHtml || '');

  // console.log('content', content);

  return (
    <article>
      <h1>{postData.title}</h1>
      <p>{postData.date}</p>
      {/* <p>Category: {postData.categories}</p> */}
      <div dangerouslySetInnerHTML={{__html: content}} />
    </article>
  );
}
