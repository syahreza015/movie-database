'use client';

import { useDrawerStore } from '@/lib/utils/store';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { MenuComponent, NavbarMenus } from './menu';
import { usePathname } from 'next/navigation';
import FocusLock from 'react-focus-lock';
import NProgress from 'nprogress';
import cn from '@/lib/utils/cn';
import { useEffect } from 'react';

const DrawerComponent = () => {
  const { openDrawer, setOpenDrawer } = useDrawerStore();
  const currentPath = usePathname();
  const closeDrawer = () => {
    NProgress.start();
    setTimeout(() => {
      setOpenDrawer(false);
    }, 150);
  };
  useEffect(() => {
    NProgress.done();
  }, [currentPath]);
  return createPortal(
    <FocusLock>
      <main
        onClick={() => {
          setOpenDrawer(false)
        }}
        className={cn(
          'fixed inset-0 z-50 md:hidden items-stretch justify-start hidden bg-black/20',
          openDrawer && 'flex'
        )}>
        <aside
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="py-2 px-4 flex flex-col justify-start items-stretch gap-4 bg-white dark:bg-stone-800">
          <Link
            onClick={closeDrawer}
            href={`/`}
            className="items-center justify-center text-2xl font-semibold text-black flex dark:text-white">
            <span className="text-blue-600 capitalize">movie</span>
            <span className="capitalize">database</span>
          </Link>
          {NavbarMenus.map((data) => {
            return (
              <MenuComponent
                currentPath={currentPath}
                data={data}
                key={data.address}
                className="font-medium"
                onClickEvent={closeDrawer}
              />
            );
          })}
        </aside>
      </main>
    </FocusLock>,
    document.body
  );
};

export default DrawerComponent;
