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
import { TestStatus } from '@/lib/constants';

type Test = {
  id: number;
  resultValue: number | null;
  resultText: string | null;
  status: TestStatus;
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

const CARD_STATUSES = {
  NORMAL: 'NORMAL',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
  PROCESSING: 'PROCESSING',
} as const;

const STATUS_TEXTS = {
  [CARD_STATUSES.NORMAL]: 'Норма',
  [CARD_STATUSES.PROCESSING]: 'Обробляється',
  [CARD_STATUSES.ERROR]: 'Відхилення',
};

const LABELS = {
  UNIT: 'Одиниці виміру:',
  RESULT: 'Результат:',
  NORM: 'Норма:',
  EXPECTED_RESULT: 'Очікуваний результат:',
  DATE: 'Дата аналізу:',
};

const statusColors: Record<
  (typeof CARD_STATUSES)[keyof typeof CARD_STATUSES],
  string
> = {
  [CARD_STATUSES.NORMAL]: 'bg-green-50 border-green-200',
  [CARD_STATUSES.WARNING]: 'bg-yellow-50 border-yellow-200',
  [CARD_STATUSES.ERROR]: 'bg-red-50 border-red-200',
  [CARD_STATUSES.PROCESSING]: 'bg-blue-50 border-blue-200',
};

const statusBadgeVariant: Record<
  (typeof CARD_STATUSES)[keyof typeof CARD_STATUSES],
  BadgeProps['variant']
> = {
  [CARD_STATUSES.NORMAL]: 'default',
  [CARD_STATUSES.WARNING]: 'secondary',
  [CARD_STATUSES.ERROR]: 'destructive',
  [CARD_STATUSES.PROCESSING]: 'secondary',
};

const getStatusInfo = (test: Test) => {
  const { resultValue, resultText, status, indicatorRange } = test;
  const { minValue, maxValue, result } = indicatorRange;

  const isInProgress = status === TestStatus.IN_PROGRESS;
  const isResultOutOfBounds =
    resultValue !== null &&
    minValue !== null &&
    maxValue !== null &&
    (resultValue < minValue || resultValue > maxValue);
  const isResultTextMismatch =
    resultText && result && resultText.toLowerCase() !== result.toLowerCase();

  if (isInProgress) {
    return {
      cardStatus: CARD_STATUSES.PROCESSING,
      statusText: STATUS_TEXTS[CARD_STATUSES.PROCESSING],
    };
  }

  if (isResultOutOfBounds) {
    return {
      cardStatus: CARD_STATUSES.ERROR,
      statusText: STATUS_TEXTS[CARD_STATUSES.ERROR],
    };
  }

  if (isResultTextMismatch) {
    return {
      cardStatus: CARD_STATUSES.ERROR,
      statusText: STATUS_TEXTS[CARD_STATUSES.ERROR],
    };
  }

  return {
    cardStatus: CARD_STATUSES.NORMAL,
    statusText: STATUS_TEXTS[CARD_STATUSES.NORMAL],
  };
};

export function TestCard({ test }: { test: Test }) {
  const { indicatorRange, resultValue, resultText, testDate } = test;
  const { indicator, minValue, maxValue, result } = indicatorRange;

  const { cardStatus, statusText } = getStatusInfo(test);

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
          <span className='text-sm font-medium'>{LABELS.UNIT}</span>
          <span className='text-sm'>{indicator.unit}</span>
        </div>
        <Separator className='my-2' />
        <div className='flex justify-between items-center mb-2'>
          <span className='text-sm font-medium'>{LABELS.RESULT}</span>
          <span className='text-lg font-semibold'>
            {test.status === TestStatus.IN_PROGRESS
              ? STATUS_TEXTS[CARD_STATUSES.PROCESSING]
              : resultValue ?? resultText}
          </span>
        </div>
        <Separator className='my-2' />
        {minValue !== null && maxValue !== null ? (
          <div className='flex justify-between items-center'>
            <span className='text-sm font-medium'>{LABELS.NORM}</span>
            <span className='text-sm'>
              {minValue} - {maxValue}
            </span>
          </div>
        ) : result ? (
          <div className='flex justify-between items-center'>
            <span className='text-sm font-medium'>
              {LABELS.EXPECTED_RESULT}
            </span>
            <span className='text-sm'>{result}</span>
          </div>
        ) : null}
      </CardContent>
      <CardFooter>
        <p className='text-sm text-muted-foreground w-full text-right'>
          {LABELS.DATE} {new Date(testDate).toLocaleDateString()}
        </p>
      </CardFooter>
    </Card>
  );
}
