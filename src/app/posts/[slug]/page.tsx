import { getPostData } from '../../../../lib/posts';

type Props = {
  params: {
    slug: string; // The slug of the post from the dynamic route
  };
};

export default async function PostPage({ params }: Props) {
  console.log('Paramigo', await params);
  const postData = await getPostData(params.slug);
  console.log('PostData', postData);

  return (
    <article>
      <h1>{postData.title}</h1>
      <p>{postData.date}</p>
      {/* <p>Category: {postData.categories}</p> */}
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
  );
}
