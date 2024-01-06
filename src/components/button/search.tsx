'use client';

import cn from '@/lib/utils/cn';
import { useSearchStore } from '@/lib/utils/store';
import { IoIosSearch } from 'react-icons/io';

const SearchButton = ({ className }: { className?: string }) => {
  const { setOpenSearch } = useSearchStore();
  return (
    <button
      onClick={() => {
        setOpenSearch(true);
      }}
      className={cn(
        'flex items-center justify-start h-min my-auto ml-auto pl-5 pr-2 gap-5 py-1 border rounded-full border-stone-300 dark:border-stone-700',
        className
      )}>
      <span className="text-sm capitalize text-black/60 dark:text-white font-medium">search movie</span>
      <IoIosSearch
        size={16}
        color="blue"
        className="dark:fill-white relative top-[1px]"
      />
    </button>
  );
};

export default SearchButton;
