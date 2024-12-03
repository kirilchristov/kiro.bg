import Link from 'next/link';
import {getSortedPostsData} from '../../../lib/posts';
import {PostData} from '../../../lib/types';

export default function Home() {
  const allPostsData: PostData[] = getSortedPostsData();

  return (
    <div>
      <h1>Kiro.bg</h1>
      <ul>
        {allPostsData.map(({id, title, date, slug}) => (
          <li key={id}>
            <Link href={`/${slug}`}>
              <h2>{title}</h2> My slug is: {slug}
            </Link>
            <p>{date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
