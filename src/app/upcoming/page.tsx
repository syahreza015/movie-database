import UpcomingListComponentPage from '@/components/client/upcoming';
import NavbarComponent from '@/components/global/navbar';
import MovieCardSkeleton from '@/components/skeleton/movie';
import { Suspense } from 'react';

const UpcomingPage = () => {
  return (
    <main className="min-h-screen flex flex-col justify-start items-stretch">
      <NavbarComponent />
      <div className="grid flex-grow grid-cols-1 gap-2 p-4 bg-white dark:bg-stone-950 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
        <Suspense
          fallback={Array.from({ length: 20 }, (_, index) => index + 1).map(
            (item) => (
              <MovieCardSkeleton key={item} />
            )
          )}>
          <UpcomingListComponentPage />
        </Suspense>
      </div>
    </main>
  );
};

export default UpcomingPage;
