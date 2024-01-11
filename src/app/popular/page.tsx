import PopularListComponentPage from '@/components/client/popular';
import NavbarComponent from '@/components/global/navbar';
import MovieCardSkeleton from '@/components/skeleton/movie';
import { Suspense } from 'react';

const PopularPage = () => {
  return (
    <main className="flex flex-col items-stretch justify-start min-h-screen">
      <NavbarComponent />
      <div className="grid place-content-start flex-grow grid-cols-1 gap-2 p-4 bg-white dark:bg-stone-950 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
        <Suspense
          fallback={Array.from({ length: 20 }, (_, index) => index + 1).map(
            (item) => (
              <MovieCardSkeleton key={item} />
            )
          )}>
          <PopularListComponentPage />
        </Suspense>
      </div>
    </main>
  );
};

export default PopularPage;
