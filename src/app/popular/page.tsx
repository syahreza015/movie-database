import PopularListComponentPage from '@/components/client/popular';
import NavbarComponent from '@/components/global/navbar';

const PopularPage = () => {
  return (
    <main className="flex flex-col items-stretch justify-start min-h-screen">
      <NavbarComponent />
      <div className="grid place-content-start flex-grow grid-cols-1 gap-2 p-4 bg-white dark:bg-stone-950 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
        <PopularListComponentPage />
      </div>
    </main>
  );
};

export default PopularPage;
