import NavbarComponent from '@/components/global/navbar';
import OneMovieData from '@/components/list/oneMovie';
import OneMovieSkeleton from '@/components/skeleton/oneMovie';
import { Suspense } from 'react';

const Moviepage = ({ params }: { params: { id: string } }) => {
  return (
    <main className="flex flex-col items-stretch justify-start min-h-screen">
      <NavbarComponent />
      <div className="flex-grow bg-white dark:bg-stone-950 p-4">
        <Suspense fallback={<OneMovieSkeleton />}>
          <OneMovieData id={params.id} />
        </Suspense>
      </div>
    </main>
  );
};

export default Moviepage;
