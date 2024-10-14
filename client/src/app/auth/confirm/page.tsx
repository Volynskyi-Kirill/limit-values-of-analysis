'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { API_ROUTES } from '@/lib/config/apiRoutes';
import { useAuth } from '@/components/auth/AuthProvider';

export default function ConfirmAuthPage() {
  const [message, setMessage] = useState('Подтверждение авторизации...');
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { login } = useAuth();

  useEffect(() => {
    const confirmAuth = async () => {
      if (!token) {
        setMessage('Отсутствует токен авторизации');
        return;
      }

      try {
        const response = await fetch(API_ROUTES.AUTH.CONFIRM, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        if (response.ok) {
          setMessage('Авторизация успешна');
          login(token);
          setTimeout(() => router.push('/dashboard'), 2000);
        } else {
          setMessage('Ошибка авторизации');
        }
      } catch (error) {
        console.error('error: ', error);
        setMessage('Произошла ошибка. Попробуйте еще раз');
      }
    };

    confirmAuth();
  }, [token, router, login]);

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Подтверждение входа</CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Здесь можно добавить индикатор загрузки или дополнительную информацию */}
        </CardContent>
      </Card>
    </div>
  );
}
