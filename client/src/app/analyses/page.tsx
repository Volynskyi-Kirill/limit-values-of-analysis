'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { withAuth } from '@/lib/auth';
import { AnalysisCard } from '@/components/AnalysisCard';
import { API_ROUTES } from '@/lib/config/apiRoutes';
import { LOCAL_STORAGE_KEYS } from '@/lib/constants';

export type AnalysesData = {
  [key: string]: {
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
};

async function fetchAnalyses(userId: number): Promise<AnalysesData> {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
  const url = API_ROUTES.ANALYSES.BY_USER(userId);

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch analyses');
  }

  return response.json();
}

function AnalysesPage() {
  const { user } = useAuth();
  const [analyses, setAnalyses] = useState<AnalysesData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAnalyses() {
      try {
        const data = await fetchAnalyses(user?.id as number);
        setAnalyses(data);
      } catch (err) {
        console.log('err: ', err);
        setError(
          'Неможливо завантажити аналізи. Будь ласка, спробуйте пізніше.'
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadAnalyses();
  }, [user?.id]);

  if (isLoading) {
    return (
      <div className='container mx-auto p-4'>Завантаження аналізів...</div>
    );
  }

  if (error) {
    return <div className='container mx-auto p-4 text-red-500'>{error}</div>;
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-6'>Мої аналізи</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {analyses &&
          Object.entries(analyses).map(([key, analysis]) => (
            <AnalysisCard key={key} analysis={analysis} />
          ))}
      </div>
    </div>
  );
}

export default withAuth(AnalysesPage);
