import NavbarComponent from '@/components/global/navbar';
import PopularListComponent from '@/components/list/popular';
import TopRatedListComponent from '@/components/list/topRated';
import UpcomingListComponent from '@/components/list/upcoming';
import MovieCardSkeleton from '@/components/skeleton/movie';
import { Suspense } from 'react';

const LandingPage = () => {
  const placeholder = Array.from({ length: 20 }, (_, index) => index + 1);
  return (
    <main className="flex flex-col items-stretch justify-start min-h-screen">
      <NavbarComponent />
      <section className="flex flex-col items-stretch justify-start flex-grow gap-4 p-4 bg-white dark:bg-stone-950">
        <div className="flex flex-col items-stretch justify-start gap-4">
          <div className="flex items-stretch justify-start">
            <span className="px-5 text-lg py-1 font-medium text-white capitalize bg-blue-600 rounded-full">
              popular movies
            </span>
          </div>
          <div className="flex items-stretch justify-start gap-2 overflow-x-scroll h-96 outline-none">
            <Suspense
              fallback={placeholder.map((item) => (
                <MovieCardSkeleton key={item} />
              ))}>
              <PopularListComponent />
            </Suspense>
          </div>
        </div>
        <div className="flex flex-col items-stretch justify-start gap-4">
          <div className="flex items-stretch justify-start">
            <span className="px-5 text-lg py-1 font-medium text-white capitalize bg-blue-600 rounded-full">
              top rated movies
            </span>
          </div>
          <div className="flex items-stretch justify-start gap-2 overflow-x-scroll h-96 outline-none">
            <Suspense
              fallback={placeholder.map((item) => (
                <MovieCardSkeleton key={item} />
              ))}>
              <TopRatedListComponent />
            </Suspense>
          </div>
        </div>
        <div className="flex flex-col items-stretch justify-start gap-4">
          <div className="flex items-stretch justify-start">
            <span className="px-5 text-lg py-1 font-medium text-white capitalize bg-blue-600 rounded-full">
              upcoming movies
            </span>
          </div>
          <div className="flex items-stretch justify-start gap-2 overflow-x-scroll h-96 outline-none">
            <Suspense
              fallback={placeholder.map((item) => (
                <MovieCardSkeleton key={item} />
              ))}>
              <UpcomingListComponent />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
