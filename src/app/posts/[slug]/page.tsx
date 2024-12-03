import {getPostData} from '../../../../lib/posts';

type Props = {
  params: {
    slug: string;
  };
};

export default async function PostPage({params}: Props) {
  const {slug} = await params;
  const postData = await getPostData(slug);

  return (
    <article>
      <h1>{postData.title}</h1>
      <p>{postData.date}</p>
      {/* <p>Category: {postData.categories}</p> */}
      <div dangerouslySetInnerHTML={{__html: postData.contentHtml}} />
    </article>
  );
}
