'use client';

import { useSearchStore } from '@/lib/utils/store';
import { useDebounce } from '@uidotdev/usehooks';
import { useContext, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import FocusLock from 'react-focus-lock';
import { AiOutlineLoading } from 'react-icons/ai';
import { IoAlertCircleOutline } from 'react-icons/io5';
import { MdClose } from 'react-icons/md';
import { EnvProvider } from '../wrapper/env';
import MovieCardSkeleton from '../skeleton/movie';
import MovieCardComponent from '../card/movie';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const SearchComponent = () => {
  const placeholder = Array.from({ length: 20 }, (_, index) => index + 1);
  const searchParams = useSearchParams();
  const [isLoading, setisLoading] = useState(false);
  const [isFetched, setisfetched] = useState(false);
  const [isError, setisError] = useState(false);
  const { openSearch, setOpenSearch } = useSearchStore();
  const [data, setData] = useState<Movie[] | undefined>(undefined);
  const [query, setQuery] = useState<string | undefined | null>(
    searchParams.get('search')
  );
  const debouncedQuery = useDebounce(query, 550);
  const env = useContext(EnvProvider);
  const router = useRouter();
  const pathName = usePathname();
  const CloseSearchbar = () => {
    setTimeout(() => {
      setOpenSearch(false);
    }, 150);
  };
  const fetchData = async () => {
    setisfetched(false);
    const response = await fetch(
      `${env?.SEARCH_MOVIE_ENDPOINT}?query=${debouncedQuery}`,
      {
        method: 'GET',
        cache: 'no-store',
        headers: {
          Authorization: `Bearer ${env?.ACCESS_TOKEN}`,
        },
      }
    );
    const result = await response.json();
    if (!response.ok) {
      setisError(true);
      setisfetched(true);
      return setisLoading(false);
    }
    const newData: Movie[] = result.results;
    setisLoading(false);
    setData(newData);
    setisfetched(true);
  };
  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setOpenSearch(false);
      }
    });
    return window.removeEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setOpenSearch(false);
      }
    });
  }, []);
  useEffect(() => {
    if (!query) {
      return;
    }
    if (query.length > 0) {
      fetchData();
    }
  }, [debouncedQuery]);
  useEffect(() => {
    setData(undefined);
    if (query) {
      router.replace(`${pathName}?search=${query}`);
      setisLoading(true);
    }
    if (query?.length === 0) {
      router.replace(pathName);
      setisLoading(false);
    }
  }, [query]);
  const TopComponent = useMemo(() => {
    if (isLoading) {
      return (
        <AiOutlineLoading
          size={24}
          color="blue"
          className="absolute mx-auto animate-spin top-4 right-8"
        />
      );
    }
    if (isError) {
      return (
        <div className="absolute flex items-center justify-center gap-2 top-4 right-8">
          <IoAlertCircleOutline
            size={22}
            color="red"
          />
          <span className="text-sm font-medium text-red-600">
            failed to fetch data
          </span>
        </div>
      );
    }
    if (data?.length === 0 && isFetched) {
      return (
        <div className="absolute flex items-center justify-center gap-2 top-4 right-8 opacity-85">
          <IoAlertCircleOutline
            size={22}
            color="black"
          />
          <span className="text-sm font-medium">
            no data to show
          </span>
        </div>
      );
    }
    return (
      <span className="absolute hidden py-1 ml-auto text-xs font-semibold text-blue-600 capitalize rounded-full dark:text-white md:block top-4 right-8">
        press esc button to close
      </span>
    );
  }, [isLoading, isError, query]);
  const MainComponent = useMemo(() => {
    if (isLoading) {
      return placeholder.map((item) => (
        <MovieCardSkeleton
          key={item}
          className="w-full"
        />
      ));
    }
    if (isError) {
      return (
        <div className="grid col-span-full place-items-center">
          <div className="flex items-center justify-center gap-2">
            <IoAlertCircleOutline
              size={22}
              color="red"
            />
            <span className="text-sm font-medium text-red-600">
              failed to fetch data
            </span>
          </div>
        </div>
      );
    }
    return data?.map((data) => (
      <MovieCardComponent
        key={data.id}
        data={data}
        onClickEvent={CloseSearchbar}
      />
    ));
  }, [isLoading, isError, data]);
  return (
    openSearch &&
    createPortal(
      <FocusLock>
        <main className="fixed inset-0 z-50 flex flex-col items-stretch justify-start gap-1 p-2 pb-0 bg-black/80">
          <input
            value={query || ''}
            onChange={(e) => {
              setQuery(e.currentTarget.value);
            }}
            className="px-5 py-2 bg-white border rounded-full border-stone-400 focus:border-transparent dark:focus:bg-stone-800 focus:bg-stone-50 dark:bg-stone-800 placeholder:capitalize"
            placeholder="search movie title"
          />
          <div className="flex items-stretch justify-start gap-4">
            {TopComponent}
          </div>
          {data && (
            <div className="relative grid grid-cols-1 gap-2 overflow-y-scroll rounded-lg sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
              {MainComponent}
            </div>
          )}
          <button
            onClick={() => {
              setOpenSearch(false);
            }}
            className="absolute grid h-8 translate-x-1/2 bg-white rounded-full aspect-square place-items-center bottom-2 right-1/2 md:hidden bg-opacity-70 hover:bg-opacity-80 dark:bg-black">
            <MdClose
              size={24}
              color="red"
            />
          </button>
        </main>
      </FocusLock>,
      document.body
    )
  );
};

export default SearchComponent;
