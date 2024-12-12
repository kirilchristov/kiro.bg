import Home from '../components/Home/Home';
import {Suspense} from 'react';
import {generalMetadata} from './utulities/generalMetadata';

export const generateMetadata = async () => {
  return generalMetadata();
};

export default function Page() {
  return (
    <Suspense fallback={<div>Зареждам...</div>}>
      <Home />
    </Suspense>
  );
}
