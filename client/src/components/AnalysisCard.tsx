import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Analysis = {
  testType: {
    name: string;
    description: string;
  };
  tests: {
    id: number;
    status: string;
    testDate: string;
  }[];
};

export function AnalysisCard({ analysis }: { analysis: Analysis }) {
  const isCompleted = analysis.tests.every((test) => test.status === 'DONE');
  const status = isCompleted ? 'Завершено' : 'Очікування';
  const latestDate = new Date(
    Math.max(...analysis.tests.map((t) => new Date(t.testDate).getTime()))
  );

  return (
    <Card className={`w-full ${isCompleted ? 'bg-green-50' : 'bg-yellow-50'}`}>
      <CardHeader>
        <div className='flex justify-between items-start'>
          <div>
            <CardTitle>{analysis.testType.name}</CardTitle>
            <CardDescription>{analysis.testType.description}</CardDescription>
          </div>
          <Badge variant={isCompleted ? 'default' : 'secondary'}>
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className='text-sm text-muted-foreground'>
          Кількість показників: {analysis.tests.length}
        </p>
        <p className='text-sm text-muted-foreground'>
          Дата здачі останнього показника: {latestDate.toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}
