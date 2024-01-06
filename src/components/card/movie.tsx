'use client';

import { useContext, useState } from 'react';
import { EnvProvider } from '../wrapper/env';
import cn from '@/lib/utils/cn';
import Image from 'next/image';
import { AiOutlineLoading } from 'react-icons/ai';
import { IoImagesSharp } from 'react-icons/io5';
import Link from 'next/link';

const MovieCardComponent = ({
  className,
  data,
  onClickEvent,
}: {
  className?: string;
  data: Movie;
  onClickEvent?: () => void;
}) => {
  const [isLoading, setisLoading] = useState(true);
  const [isError, setisError] = useState(false);
  const env = useContext(EnvProvider);
  return (
    <Link
      onClick={onClickEvent}
      href={`/movie/${data.id}`}
      className={cn(
        'h-full aspect-[5/6] rounded-lg flex flex-col justify-start items-stretch gap-2 relative border border-stone-800 dark:border-stone-300 bg-stone-300 group',
        className
      )}>
      {isLoading && (
        <div className="absolute inset-0 flex justify-end items-start p-2 z-20">
          <AiOutlineLoading
            size={20}
            strokeWidth={2.5}
            color="blue"
            className="animate-spin"
          />
        </div>
      )}
      {isError && (
        <div className="absolute inset-0 grid place-items-center p-2 z-20">
          <IoImagesSharp
            size={28}
            color="black"
            className="opacity-85"
          />
        </div>
      )}
      {!isError && (
        <Image
          loading="lazy"
          alt={data.title}
          src={`${env?.IMAGE_URL}/${data.poster_path}`}
          onLoad={() => {
            setisLoading(false);
          }}
          onError={() => {
            setisLoading(false);
            setisError(true);
          }}
          fill
          className="rounded-lg object-fill bg-stone-300/7dark:border-stone-300"
        />
      )}
      <span className="z-30 animate-slideInDown text-lg font-semibold text-white capitalize bg-black/30 hidden group-hover:block p-2 rounded-t-lg">
        {data.title}
      </span>
    </Link>
  );
};

export default MovieCardComponent;
