'use client';

import { useEffect, useState } from 'react';
import { MdOutlineKeyboardDoubleArrowUp } from 'react-icons/md';

const ScrollTopButton = () => {
  const [currentWindowPosition, setCurrentWindowPosition] = useState<number>(
    window.scrollY
  );
  useEffect(() => {
    window.addEventListener('scroll', () => {
      setCurrentWindowPosition(window.scrollY);
    });
    return window.removeEventListener('scroll', () => {
      setCurrentWindowPosition(window.scrollY);
    });
  }, []);
  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      window.scrollTo({
        top: 0,
        behavior: 'instant',
      });
    });
  }, []);
  const condition = currentWindowPosition > 150;
  return (
    condition && (
      <button
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }}
        className="grid p-2 bg-blue-600 rounded-full place-items-center aspect-square z-50 fixed bottom-8 right-4">
        <MdOutlineKeyboardDoubleArrowUp
          size={28}
          color="white"
        />
      </button>
    )
  );
};

export default ScrollTopButton;
