import validEnv from '@/lib/utils/env';
import { IoAlertCircleOutline } from 'react-icons/io5';
import { FaPlay } from 'react-icons/fa';
import ImageComponent from '../card/image';
import Link from 'next/link';

const OneMovieData = async ({ id }: { id: string }) => {
  const response = await fetch(`${validEnv.MOVIE_ENDPOINT}/${id}`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${validEnv.ACCESS_TOKEN}`,
    },
  });
  const result = await response.json();
  if (!response.ok) {
    return (
      <div className="grid w-full border rounded-lg place-items-center h-96 dark:bg-stone-400 border-stone-300 dark:border-stone-700 bg-stone-300">
        <div className="flex items-center justify-center gap-2 px-4 py-1 rounded-md">
          <IoAlertCircleOutline
            size={20}
            color="red"
          />
          <span className="text-sm font-medium text-red-600 capitalize">
            failed to fetch data
          </span>
        </div>
      </div>
    );
  }
  const data: FullMovie = result;
  return (
    <div className="flex flex-col items-stretch justify-start gap-4 md:flex-row">
      <div className="relative w-full rounded-md aspect-square bg-stone-400">
        <ImageComponent data={data} />
      </div>
      <div className="flex flex-col flex-wrap items-stretch justify-start flex-grow w-full gap-4 md:w-4/5">
        <div className="flex items-stretch justify-start gap-4">
          <span className="text-2xl font-bold capitalize">{data.title}</span>
          <span className="p-2 text-sm font-bold text-blue-700">
            {data.vote_average}
          </span>
        </div>
        <Link
          href={data.homepage}
          target="_blank"
          className="text-sm font-medium place-items-center hover:underline hover:text-blue-600">
          {data.title}
        </Link>
        <div className="flex flex-wrap items-center justify-start gap-2">
          {data.genres.map((data) => (
            <span
              key={data.id}
              className="grid px-5 py-1 text-sm font-medium text-white bg-blue-700 rounded-full place-items-center">
              {data.name}
            </span>
          ))}
          {data.adult && (
            <span className="grid px-5 py-1 text-sm font-medium text-white bg-red-700 rounded-full place-items-center">
              adult
            </span>
          )}
        </div>
        <span className="font-medium">{data.overview}</span>
        <div className="flex items-center justify-start gap-4">
          <span className="font-medium capitalize">languages: </span>
          <div className="flex flex-wrap items-center justify-start gap-2">
            {data.spoken_languages.map((data) => (
              <span
                className="font-medium"
                key={data.iso_639_1}>
                {data.name}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-start gap-4">
          <span className="font-medium capitalize">production companies: </span>
          <div className="flex flex-wrap items-center justify-start gap-2">
            {data.production_companies.map((data) => (
              <span
                className="font-medium"
                key={data.id}>
                {data.name}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-stretch justify-start gap-4">
          <button
            disabled={!data.video}
            className="flex items-center justify-center gap-2 px-10 py-2 font-medium text-white capitalize bg-blue-700 rounded-full disabled:bg-stone-400 w-min">
            <span>play</span>
            <FaPlay
              size={12}
              color="white"
            />
          </button>
          {!data.video && (
            <span className="text-xs font-medium text-red-700 grid place-items-center">
              video not available
            </span>
          )}
        </div>
        <div className="flex items-stretch justify-start mt-4">
          <span className="text-xs font-medium">released at <span className='text-blue-700 font-medium'>{data.release_date}</span></span>
          <span className="ml-auto text-xs font-medium">popularity: <span className='text-blue-700'>{data.popularity}</span></span>
        </div>
      </div>
    </div>
  );
};

export default OneMovieData;
