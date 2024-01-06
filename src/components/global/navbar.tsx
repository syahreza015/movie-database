import Link from 'next/link';
import NavbarMenuComponent from '../client/menu';
import SearchButton from '../button/search';
import DrawerButton from '../button/drawer';
import dynamic from 'next/dynamic';
import { AiOutlineLoading } from 'react-icons/ai';

const ThemeButton = dynamic(() => import('@/components/button/theme'), {
  ssr: false,
  loading: () => (
    <div className="grid rounded-full place-items-center aspect-square">
      <AiOutlineLoading
        size={14}
        strokeWidth={2.5}
        color="blue"
        className="animate-spin"
      />
    </div>
  ),
});

const NavbarComponent = () => {
  return (
    <nav className="sticky top-0 z-40 flex items-stretch justify-start gap-5 px-5 py-2 bg-white h-14 dark:bg-stone-950">
      <DrawerButton />
      <Link
        href={`/`}
        className="items-center justify-center hidden text-xl font-semibold text-black md:flex dark:text-white">
        <span className="text-blue-600 capitalize">movie</span>
        <span className="capitalize">database</span>
      </Link>
      <NavbarMenuComponent />
      <SearchButton className="ml-auto" />
      <ThemeButton />
    </nav>
  );
};

export default NavbarComponent;
