'use client';

import MovieCardComponent from '@/components/card/movie';
import MovieCardSkeleton from '@/components/skeleton/movie';
import { EnvProvider } from '@/components/wrapper/env';
import { useIntersectionObserver } from '@uidotdev/usehooks';
import { useContext, useEffect, useMemo, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { IoAlertCircleOutline } from 'react-icons/io5';

const TopRatedClientList = () => {
  const placeholder = Array.from(
    {
      length: 20,
    },
    (_, index) => index + 1
  );
  const env = useContext(EnvProvider);
  const [currentPage, setCurrentPage] = useState(1);
  const [availablePage, setAvailablePage] = useState(99);
  const [isFetched, setisfetched] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [isError, setisError] = useState(false);
  const [data, setData] = useState<undefined | Movie[]>(undefined);
  const [ref, entry] = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0,
  });
  const fetchData = async () => {
    setisLoading(true);
    const response = await fetch(
      `${env?.TOP_RATED_MOVIE_ENDPOINT}?page=${currentPage}`,
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
    const newAvailablePage: number = result.total_pages;
    if (currentPage === 1) {
      setData(newData);
    } else {
      setData([...data!, ...newData]);
    }
    setAvailablePage(newAvailablePage);
    setisfetched(true);
    setisLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [currentPage]);
  useEffect(() => {
    if (entry?.isIntersecting) {
      data && setCurrentPage((prev) => prev + 1);
    }
  }, [ref, entry]);
  const Component = useMemo(() => {
    if (isLoading && currentPage === 1) {
      return placeholder.map((item) => <MovieCardSkeleton key={item} />);
    }
    if (!data && isFetched && !isError) {
      return (
        <div className="grid col-span-full place-items-center">
          <div className="flex items-center justify-center gap-2 px-4 py-1 rounded-md">
            <IoAlertCircleOutline
              size={20}
              color="red"
            />
            <span className="text-sm font-medium text-red-600 capitalize">
              something went wrong
            </span>
          </div>
        </div>
      );
    }
    if (data?.length === 0 && isFetched) {
      return (
        <div className="grid col-span-full place-items-center">
          <div className="flex items-center justify-center gap-2 px-4 py-1 rounded-md opacity-85">
            <IoAlertCircleOutline
              size={20}
              color="black"
              className="dark:fill-white"
            />
            <span className="text-sm font-medium text-red-600 capitalize">
              no data to show
            </span>
          </div>
        </div>
      );
    }
    return data?.map((data) => (
      <MovieCardComponent
        data={data}
        key={data.id}
        className='w-full'
      />
    ));
  }, [isLoading, isError, data]);
  const LoaderComponent = useMemo(() => {
    if (isLoading) {
      return (
        <AiOutlineLoading
          size={24}
          strokeWidth={2.5}
          color="blue"
          className="animate-spin"
        />
      );
    }
    if (isError) {
      return (
        <div className="flex items-center justify-center gap-2 px-4 py-1 rounded-md">
          <IoAlertCircleOutline
            size={20}
            color="red"
          />
          <span className="text-sm font-medium text-red-600 capitalize">
            failed to fetch data
          </span>
        </div>
      );
    }
    if (currentPage > availablePage) {
      return (
        <div className="flex items-center justify-center gap-2 px-4 py-1 rounded-md">
          <IoAlertCircleOutline
            size={20}
            color="black"
            className="dark:fill-white"
          />
          <span className="text-sm font-medium capitalize">
            no more data to show
          </span>
        </div>
      );
    }
  }, [isError, availablePage, currentPage, isLoading]);
  return (
    <>
      {Component}
      <div
        ref={ref}
        className="grid col-span-full place-items-center">
        {LoaderComponent}
      </div>
    </>
  );
};

export default TopRatedClientList;
