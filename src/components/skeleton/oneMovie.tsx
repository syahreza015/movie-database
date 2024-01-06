import { FaPlay } from 'react-icons/fa';

const OneMovieSkeleton = () => {
  return (
    <div className="flex flex-col items-stretch justify-start gap-4 md:flex-row">
      <div className="w-full rounded-md bg-stone-400 animate-pulse aspect-square"></div>
      <div className="flex flex-col items-stretch justify-start flex-grow gap-4 w-full md:w-4/5">
        <div className="flex items-stretch justify-start gap-4">
          <span className="h-8 rounded-full bg-stone-400 animate-pulse w-32"></span>
          <span className="h-4 rounded-full w-16 my-auto bg-stone-400 animate-pulse"></span>
          <span className="h-5 rounded-full w-28 bg-stone-400 animate-pulse ml-auto my-auto"></span>
        </div>
        <div className='h-5 rounded-full bg-stone-400 animate-pulse'></div>
        <div className="flex flex-wrap items-center justify-start gap-2">
          {Array.from({ length: 3 }, (_, index) => index + 1).map((item) => (
            <span
              key={item}
              className="h-6 rounded-full w-24 bg-stone-400 animate-pulse"></span>
          ))}
        </div>
        <span className="w-full h-44 rounded-md bg-stone-400 animate-pulse">
        </span>
        <div className="flex items-center justify-start gap-4">
          <span className="h-5 rounded-full w-20 bg-stone-400 animate-pulse"> </span>
          <div className="flex flex-wrap items-center justify-start gap-2">
            {Array.from({ length: 3 }, (_, index) => index + 1).map((item) => (
              <span
                className="h-5 w-20 rounded-full bg-stone-400 animate-pulse"
                key={item}></span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-start gap-4">
          <span className="h-5 rounded-full w-20 bg-stone-400 animate-pulse"> </span>
          <div className="flex flex-wrap items-center justify-start gap-2">
            {Array.from({ length: 3 }, (_, index) => index + 1).map((item) => (
              <span
                className="h-5 w-20 rounded-full bg-stone-400 animate-pulse"
                key={item}></span>
            ))}
          </div>
        </div>
        <span className="h-10 rounded-full w-32 bg-stone-400 animate-pulse"></span>
        <div className="mt-4 flex justify-start items-stretch">
          <span className="h-5 rounded-full bg-stone-400 animate-pulse w-24"></span>
          <span className="h-5 rounded-full bg-stone-400 animate-pulse w-24 ml-auto"></span>
        </div>
      </div>
    </div>
  );
};

export default OneMovieSkeleton;
