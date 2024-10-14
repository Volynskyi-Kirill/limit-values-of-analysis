'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { API_ROUTES } from '@/lib/config/apiRoutes';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(API_ROUTES.AUTH.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setMessage('Ссылка для входа отправлена на вашу почту');
      } else {
        setMessage('Произошла ошибка. Попробуйте еще раз');
      }
    } catch (error) {
      console.error('error: ', error);
      setMessage('Произошла ошибка. Попробуйте еще раз');
    }
    setIsLoading(false);
  };

  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>Вход</CardTitle>
        <CardDescription>Введите email для получения ссылки</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <Input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading ? 'Отправка...' : 'Отправить ссылку'}
          </Button>
        </form>
        {message && <p className='mt-4 text-center text-sm'>{message}</p>}
      </CardContent>
    </Card>
  );
}
