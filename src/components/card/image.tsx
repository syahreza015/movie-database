'use client';

import Image from 'next/image';
import { useContext, useState } from 'react';
import { EnvProvider } from '../wrapper/env';
import { IoImagesSharp } from 'react-icons/io5';
import { AiOutlineLoading } from 'react-icons/ai';

const ImageComponent = ({ data }: { data: FullMovie | Movie }) => {
  const [isLoading, setisLoading] = useState(true);
  const [isError, setisError] = useState(false);
  const env = useContext(EnvProvider);
  return (
    <>
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
          className="rounded-lg object-fill bg-stone-300/7dark:border-stone-300/75"
        />
      )}
    </>
  );
};

export default ImageComponent;
