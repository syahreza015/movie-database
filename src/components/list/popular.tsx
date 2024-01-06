import validEnv from '@/lib/utils/env';
import { IoAlertCircleOutline } from 'react-icons/io5';
import MovieCardComponent from '../card/movie';

const PopularListComponent = async () => {
  const response = await fetch(`${validEnv.POPULAR_MOVIE_ENDPOINT}`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${validEnv.ACCESS_TOKEN}`,
    },
  });
  const result = await response.json();
  if (!response.ok) {
    return (
      <div className="grid w-full border rounded-lg place-items-center border-stone-300 dark:border-stone-700 bg-stone-300">
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
  const data: Movie[] = result.results;
  return data.map((data) => {
    return (
      <MovieCardComponent
        key={data.id}
        data={data}
      />
    );
  });
};

export default PopularListComponent;
