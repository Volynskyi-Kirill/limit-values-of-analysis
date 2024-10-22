'use client';

import { useAuth } from '@/components/auth/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function withAuth(Component: React.ComponentType) {
  return function ProtectedRoute(props: any) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push('/login');
      }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
      return <div>Завантаження...</div>; //TODO loader
    }

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}
