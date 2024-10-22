'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { withAuth } from '@/lib/auth';
import { TestCard } from '@/components/TestCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { API_ROUTES } from '@/lib/config/apiRoutes';
import { useAuth } from '@/components/auth/AuthProvider';
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
      id: number;
      name: string;
      unit: string;
      description: string;
      testType: {
        id: number;
        name: string;
        description: string;
      };
    };
  };
};

async function fetchAnalysisDetails(
  userId: number,
  testTypeId: number
): Promise<Test[]> {
  const token = localStorage.getItem('authToken');
  const url = API_ROUTES.ANALYSES.BY_USER_TEST_TYPE(userId, testTypeId);

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch analysis details');
  }

  return response.json();
}

function AnalysisDetailsPage() {
  const { user } = useAuth();
  const [tests, setTests] = useState<Test[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const testTypeId = params.id as string;

  useEffect(() => {
    async function loadAnalysisDetails() {
      try {
        const data = await fetchAnalysisDetails(
          user?.id as number,
          parseInt(testTypeId)
        );
        setTests(data);
      } catch (err) {
        console.log('err: ', err);
        setError(
          'Не вдалося завантажити деталі аналізу. Будь ласка, спробуйте пізніше.'
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadAnalysisDetails();
  }, [testTypeId, user?.id]);

  if (isLoading) {
    return (
      <div className='container mx-auto p-4'>
        Завантаження деталей аналізу...
      </div>
    );
  }

  if (error) {
    return <div className='container mx-auto p-4 text-red-500'>{error}</div>;
  }

  if (!tests || tests.length === 0) {
    return (
      <div className='container mx-auto p-4'>Дані аналізу не знайдено.</div>
    );
  }

  return (
    <div className='container mx-auto p-4'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>
          {tests[0].indicatorRange.indicator.testType.name}
        </h1>
        <Link href='/analyses'>
          <Button variant='outline'>Назад до списку аналізів</Button>
        </Link>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {tests.map((test) => (
          <TestCard key={test.id} test={test} />
        ))}
      </div>
    </div>
  );
}

export default withAuth(AnalysisDetailsPage);
