import TopRatedClientList from '@/components/client/list/topRated';
import NavbarComponent from '@/components/global/navbar';

const TopRatedpage = () => {
  return (
    <main className="flex flex-col items-stretch justify-start min-h-screen">
      <NavbarComponent />
      <div className="grid flex-grow grid-cols-1 gap-2 p-4 bg-white dark:bg-stone-950 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
        <TopRatedClientList />
      </div>
    </main>
  );
};

export default TopRatedpage;
