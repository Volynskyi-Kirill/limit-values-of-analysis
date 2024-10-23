'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { TestStatus } from '@/lib/constants';
import { useState } from 'react';
import { Loader } from './ui/loader';

type Analysis = {
  testType: {
    id: number;
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
  const [isLoading, setIsLoading] = useState(false);
  const isCompleted = analysis.tests.every(
    (test) => test.status === TestStatus.DONE
  );
  const status = isCompleted ? 'Завершено' : 'Очікування';
  const testDate = new Date(analysis.tests[0].testDate);
  const formattedTestDate = testDate.toISOString();

  const handleLinkClick = () => {
    setIsLoading(true);
  };

  return (
    <Link
      href={`/analyses/${analysis.testType.id}/${formattedTestDate}`}
      onClick={handleLinkClick}
    >
      {isLoading && <Loader />}
      <Card
        className={`w-full h-full ${
          isCompleted ? 'bg-green-50' : 'bg-yellow-50'
        } hover:shadow-md transition-shadow`}
      >
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
            Дата здачі останнього показника: {testDate.toLocaleDateString()}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
