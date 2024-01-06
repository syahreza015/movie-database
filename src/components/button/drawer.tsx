'use client';

import { useDrawerStore } from '@/lib/utils/store';
import { HiMenuAlt2 } from 'react-icons/hi';

const DrawerButton = () => {
  const {setOpenDrawer} = useDrawerStore()
  return (
    <button onClick={() => {
      setOpenDrawer(true)
    }} className="grid md:hidden rounded-full place-items-center aspect-square hover:bg-stone-100 dark:hover:bg-stone-800">
      <HiMenuAlt2
        color="black"
        size={26}
        className="dark:fill-white"
      />
    </button>
  );
};

export default DrawerButton;
