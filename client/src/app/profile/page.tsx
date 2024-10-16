'use client';

import { useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { fetchUserProfile } from '@/lib/api';
import { withAuth } from '@/lib/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, MailIcon, UserIcon } from 'lucide-react';
import { Gender } from '@/lib/constants';

function ProfilePage() {
  const { user, setUser } = useAuth();

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const userData = await fetchUserProfile();
        setUser(userData);
      } catch (error) {
        console.error('Failed to load user profile:', error);
      }
    };

    if (!user) {
      loadUserProfile();
    }
  }, [user, setUser]);

  if (!user) {
    return <div>Загрузка профиля...</div>;
  }

  return (
    <div className='container mx-auto p-4'>
      <Card className='max-w-2xl mx-auto'>
        <CardHeader>
          <div className='flex items-center space-x-4'>
            <div>
              <CardTitle className='text-2xl'>
                {user.lastName} {user.firstName} {user.patronymic}
              </CardTitle>
              <p className='text-sm text-muted-foreground'>{user.email}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div className='flex items-center space-x-2'>
              <UserIcon className='text-muted-foreground' />
              <span>
                Пол: {user.gender === Gender.male ? 'Мужской' : 'Женский'}
              </span>
            </div>
            <div className='flex items-center space-x-2'>
              <CalendarIcon className='text-muted-foreground' />
              <span>
                Дата рождения: {new Date(user.birthDate).toLocaleDateString()}
              </span>
            </div>
            <div className='flex items-center space-x-2'>
              <MailIcon className='text-muted-foreground' />
              <span>Email: {user.email}</span>
            </div>
            <div className='text-sm text-muted-foreground'>
              <p>Аккаунт создан: {new Date(user.createdAt).toLocaleString()}</p>
              <p>
                Последнее обновление:{' '}
                {new Date(user.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default withAuth(ProfilePage);
