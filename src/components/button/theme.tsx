'use client';

import { useTheme } from 'next-themes';
import { MdSunny } from 'react-icons/md';
import { IoMoonSharp } from 'react-icons/io5';
import cn from '@/lib/utils/cn';

const ThemeButton = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
      }}
      className={cn(
        'grid rounded-full aspect-square place-items-center hover:bg-stone-100 dark:hover:bg-stone-800',
        className
      )}>
      {theme === 'light' ? (
        <MdSunny
          size={20}
          color="blue"
        />
      ) : (
        <IoMoonSharp
          color="blue"
          size={20}
        />
      )}
    </button>
  );
};

export default ThemeButton;
