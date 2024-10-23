import { AnalysisCardSkeleton } from '@/components/AnalysisCardSkeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='container mx-auto p-4'>
      <div className='flex justify-between items-center mb-6'>
        <Skeleton className='h-8 w-1/4' />
        <Skeleton className='h-10 w-24' />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {[...Array(6)].map((_, index) => (
          <AnalysisCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
