'use client';

import cn from '@/lib/utils/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface INavbarMenu {
  name: string;
  address: string;
}

export const NavbarMenus: INavbarMenu[] = [
  {
    name: 'popular',
    address: '/popular',
  },
  {
    name: 'top rated',
    address: '/top-rated',
  },
  {
    name: 'upcoming',
    address: '/upcoming',
  },
];

export const MenuComponent = ({
  currentPath,
  data,
  className,
  onClickEvent,
}: {
  currentPath: string;
  data: INavbarMenu;
  className?: string;
  onClickEvent?: () => void;
}) => {
  return (
    <Link
      onClick={onClickEvent}
      href={data.address}
      className={cn(
        'capitalize text-opacity-80',
        currentPath === data.address && 'text-opacity-100 text-blue-600',
        className
      )}>
      {data.name}
    </Link>
  );
};

const NavbarMenuComponent = ({
  className,
  onCLickEvent,
}: {
  className?: string;
  onCLickEvent?: () => void;
}) => {
  const currentPath = usePathname();
  return (
    <div className="px-5 py-2 hidden font-semibold text-black dark:text-white md:flex justify-start items-center gap-5">
      {NavbarMenus.map((data) => {
        return (
          <MenuComponent
            currentPath={currentPath}
            data={data}
            key={data.address}
            className={className}
            onClickEvent={onCLickEvent}
          />
        );
      })}
    </div>
  );
};

export default NavbarMenuComponent;
