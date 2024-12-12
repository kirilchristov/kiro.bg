// app/404.tsx
'use client';

import {Suspense} from 'react';
import {useSearchParams} from 'next/navigation';

function NotFoundContent() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams?.get('searchTerm');

  return (
    <div>
      <h1>Page Not Found</h1>
      <p>Search Term: {searchTerm || 'Not Found'}</p>
    </div>
  );
}

export default function NotFound() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <NotFoundContent />
    </Suspense>
  );
}
