import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

type Test = {
  id: number;
  resultValue: number | null;
  resultText: string | null;
  status: 'DONE' | 'IN_PROGRESS';
  testDate: string;
  indicatorRange: {
    gender: string;
    minValue: number | null;
    maxValue: number | null;
    result: string | null;
    indicator: {
      name: string;
      unit: string;
      description: string;
    };
  };
};

export function TestCard({ test }: { test: Test }) {
  const { indicatorRange, resultValue, resultText, status, testDate } = test;
  const { indicator, minValue, maxValue, result } = indicatorRange;

  let cardStatus: 'normal' | 'warning' | 'error' | 'processing' = 'normal';
  let statusText = 'Норма';

  if (status === 'IN_PROGRESS') {
    cardStatus = 'processing';
    statusText = 'Обробляється';
  } else if (resultValue !== null && minValue !== null && maxValue !== null) {
    if (resultValue < minValue || resultValue > maxValue) {
      cardStatus = 'error';
      statusText = 'Відхилення';
    }
  } else if (resultText && result) {
    if (resultText.toLowerCase() !== result.toLowerCase()) {
      cardStatus = 'error';
      statusText = 'Відхилення';
    }
  }

  const statusColors = {
    normal: 'bg-green-50 border-green-200',
    warning: 'bg-yellow-50 border-yellow-200',
    error: 'bg-red-50 border-red-200',
    processing: 'bg-blue-50 border-blue-200',
  };

  const statusBadgeVariant: Record<
    'normal' | 'warning' | 'error' | 'processing',
    BadgeProps['variant']
  > = {
    normal: 'default',
    warning: 'secondary',
    error: 'destructive',
    processing: 'secondary',
  };

  return (
    <Card className={`w-full ${statusColors[cardStatus]}`}>
      <CardHeader>
        <div className='flex justify-between items-start'>
          <div>
            <CardTitle className='text-lg'>{indicator.name}</CardTitle>
            <CardDescription className='mt-1'>
              {indicator.description}
            </CardDescription>
          </div>
          <Badge variant={statusBadgeVariant[cardStatus]} className='ml-2'>
            {statusText}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className='pt-4'>
        <div className='flex justify-between items-center mb-2'>
          <span className='text-sm font-medium'>Одиниці виміру:</span>
          <span className='text-sm'>{indicator.unit}</span>
        </div>
        <Separator className='my-2' />
        <div className='flex justify-between items-center mb-2'>
          <span className='text-sm font-medium'>Результат:</span>
          <span className='text-lg font-semibold'>
            {status === 'IN_PROGRESS'
              ? 'Обробляється'
              : resultValue !== null
              ? resultValue
              : resultText}
          </span>
        </div>
        <Separator className='my-2' />
        {minValue !== null && maxValue !== null ? (
          <div className='flex justify-between items-center'>
            <span className='text-sm font-medium'>Норма:</span>
            <span className='text-sm'>
              {minValue} - {maxValue}
            </span>
          </div>
        ) : result ? (
          <div className='flex justify-between items-center'>
            <span className='text-sm font-medium'>Очікуваний результат:</span>
            <span className='text-sm'>{result}</span>
          </div>
        ) : null}
      </CardContent>
      <CardFooter>
        <p className='text-sm text-muted-foreground w-full text-right'>
          Дата аналізу: {new Date(testDate).toLocaleDateString()}
        </p>
      </CardFooter>
    </Card>
  );
}
