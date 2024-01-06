import cn from '@/lib/utils/cn';

const MovieCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'h-full aspect-[5/6] rounded-lg bg-stone-400 animate-pulse',
        className
      )}></div>
  );
};

export default MovieCardSkeleton;
