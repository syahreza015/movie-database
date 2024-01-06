import UpcomingClientList from '@/components/client/list/upcoming';
import NavbarComponent from '@/components/global/navbar';

const UpcomingPage = () => {
  return (
    <main className="min-h-screen flex flex-col justify-start items-stretch">
      <NavbarComponent />
      <div className="grid flex-grow grid-cols-1 gap-2 p-4 bg-white dark:bg-stone-950 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
        <UpcomingClientList/>
      </div>
    </main>
  );
};

export default UpcomingPage;
