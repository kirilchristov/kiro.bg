import Link from 'next/link';
import {getSortedPostsData} from '../../../lib/posts';
import {PostData} from '../../../lib/types';
import DateFormatter from '../components/DateFormatter/DateFormatter';

export default function Home() {
  const allPostsData: PostData[] = getSortedPostsData();

  return (
    <div>
      <h1>Kiro.bg</h1>
      <ul>
        {allPostsData.map(({id, title, date, slug}) => (
          <li key={id}>
            <Link href={`/${slug}`}>
              <h2>{title}</h2>
            </Link>
            <div>
              <DateFormatter dateString={date} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
