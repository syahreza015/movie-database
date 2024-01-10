'use client';

import MovieCardComponent from '@/components/card/movie';
import { EnvProvider } from '@/components/wrapper/env';
import { useIntersectionObserver } from '@uidotdev/usehooks';
import { useContext, useEffect, useMemo, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { IoAlertCircleOutline } from 'react-icons/io5';

const PopularClientList = ({ initialData }: { initialData: Movie[] }) => {
  const env = useContext(EnvProvider);
  const [currentPage, setCurrentPage] = useState(1);
  const [availablePage, setAvailablePage] = useState(99);
  const [isLoading, setisLoading] = useState(true);
  const [isError, setisError] = useState(false);
  const [data, setData] = useState<Movie[]>(initialData);
  const [ref, entry] = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0,
  });
  const fetchData = async () => {
    setisLoading(true);
    const response = await fetch(
      `${env?.UPCOMING_MOVIE_ENDPOINT}?page=${currentPage}`,
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
    setisLoading(false);
  };
  useEffect(() => {
    if (currentPage > 1) {
      fetchData();
    }
  }, [currentPage]);
  useEffect(() => {
    if (entry?.isIntersecting) {
      data && setCurrentPage((prev) => prev + 1);
    }
  }, [ref, entry]);
  useEffect(() => {
    console.log({
      currentPage: currentPage,
      data: data,
    });
  }, [currentPage, data]);
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
      {data.map((data) => (
        <MovieCardComponent
          data={data}
          key={data.id}
          className="w-full"
        />
      ))}
      <div
        ref={ref}
        className="grid col-span-full place-items-center">
        {LoaderComponent}
      </div>
    </>
  );
};

export default PopularClientList;
