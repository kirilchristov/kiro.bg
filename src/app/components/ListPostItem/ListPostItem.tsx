import Link from 'next/link';
import DateFormatter from '../DateFormatter/DateFormatter';
import ImageContent from '../Image/ImageContent';

type ListPostItemProps = {
  id: string;
  slug: string;
  title: string;
  date: string;
  postImage?: string;
};

export default function ListPostItem({
  id,
  slug,
  title,
  date,
  postImage,
}: ListPostItemProps) {
  return (
    <>
      <Link href={`/${slug}`}>
        {postImage && <ImageContent src={postImage} alt={title} />}
        <h2>{title}</h2>
      </Link>
      <DateFormatter dateString={date} />
    </>
  );
}
