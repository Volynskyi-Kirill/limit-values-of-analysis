'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
  const [message, setMessage] = useState('Підтвердження авторизації...');
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    const confirmAuth = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const token = searchParams.get('token');

      if (!token) {
        setMessage('Немає токен авторизації');
        return;
      }

      try {
        const response = await fetch(API_ROUTES.AUTH.CONFIRM, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        if (response.ok) {
          setMessage('Авторизація успішна');
          login(token);
          setTimeout(() => router.push('/profile'), 500);
        } else {
          setMessage('Помилка авторизації');
        }
      } catch (error) {
        console.error('error: ', error);
        setMessage('Сталася помилка. Спробуйте ще раз');
      }
    };

    confirmAuth();
  }, [router, login]);

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Підтвердження входу</CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Здесь можно добавить индикатор загрузки или дополнительную информацию */}
        </CardContent>
      </Card>
    </div>
  );
}
