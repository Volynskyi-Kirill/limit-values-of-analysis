'use client';

import Link from 'next/link';
import { useAuth } from './auth/AuthProvider';
import { Button } from '@/components/ui/button';

export function NavigationMenu() {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className='bg-primary text-primary-foreground p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link href='/dashboard' className='text-lg font-bold'>
          Мое приложение
        </Link>
        <div className='space-x-4'>
          <Link href='/profile' className='hover:underline'>
            Профиль
          </Link>
          <Link href='/tests' className='hover:underline'>
            Анализы
          </Link>
          <Button variant='secondary' onClick={logout}>
            Выйти
          </Button>
        </div>
      </div>
    </nav>
  );
}
