import TopRatedListComponentPage from '@/components/client/topRated';
import NavbarComponent from '@/components/global/navbar';
import MovieCardSkeleton from '@/components/skeleton/movie';
import { Suspense } from 'react';

const TopRatedpage = () => {
  return (
    <main className="flex flex-col items-stretch justify-start min-h-screen">
      <NavbarComponent />
      <div className="grid flex-grow grid-cols-1 gap-2 p-4 bg-white dark:bg-stone-950 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
        <Suspense
          fallback={Array.from({ length: 20 }, (_, index) => index + 1).map(
            (item) => (
              <MovieCardSkeleton key={item} />
            )
          )}>
          <TopRatedListComponentPage />
        </Suspense>
      </div>
    </main>
  );
};

export default TopRatedpage;
