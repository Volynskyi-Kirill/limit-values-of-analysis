import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function AnalysisCardSkeleton() {
  return (
    <Card className='w-full'>
      <CardHeader className='space-y-2'>
        <Skeleton className='h-5 w-1/2' />
        <Skeleton className='h-4 w-full' />
      </CardHeader>
      <CardContent className='space-y-2'>
        <Skeleton className='h-4 w-3/4' />
        <Skeleton className='h-4 w-1/2' />
      </CardContent>
    </Card>
  );
}
