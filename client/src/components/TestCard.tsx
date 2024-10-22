import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Test = {
  id: number;
  resultValue: number | null;
  resultText: string | null;
  status: string;
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
  const { indicatorRange, resultValue, resultText, testDate } = test;
  const { indicator, minValue, maxValue, result } = indicatorRange;

  let status: 'normal' | 'warning' | 'error' = 'normal';
  let statusText = 'Норма';

  if (resultValue !== null && minValue !== null && maxValue !== null) {
    if (resultValue < minValue || resultValue > maxValue) {
      status = 'error';
      statusText = 'Відхилення';
    }
  } else if (resultText && result) {
    if (resultText.toLowerCase() !== result.toLowerCase()) {
      status = 'error';
      statusText = 'Відхилення';
    }
  }

  const statusColors = {
    normal: 'bg-green-50 border-green-200',
    warning: 'bg-yellow-50 border-yellow-200',
    error: 'bg-red-50 border-red-200',
  };

  return (
    <Card className={`w-full ${statusColors[status]}`}>
      <CardHeader>
        <div className='flex justify-between items-start'>
          <div>
            <CardTitle>{indicator.name}</CardTitle>
            <CardDescription>{indicator.description}</CardDescription>
          </div>
          <Badge variant={status === 'normal' ? 'default' : 'destructive'}>
            {statusText}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className='font-semibold'>
          Результат: {resultValue !== null ? resultValue : resultText}{' '}
          {indicator.unit}
        </p>
        {minValue !== null && maxValue !== null ? (
          <p className='text-sm text-muted-foreground'>
            Норма: {minValue} - {maxValue} {indicator.unit}
          </p>
        ) : result ? (
          <p className='text-sm text-muted-foreground'>
            Очікуваний результат: {result}
          </p>
        ) : null}
      </CardContent>
      <CardFooter>
        <p className='text-sm text-muted-foreground'>
          Дата аналізу: {new Date(testDate).toLocaleDateString()}
        </p>
      </CardFooter>
    </Card>
  );
}
