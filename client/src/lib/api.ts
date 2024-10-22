import { User } from '@/components/auth/AuthProvider';
import { API_ROUTES } from './config/apiRoutes';
import { LOCAL_STORAGE_KEYS } from './constants';

export async function fetchUserProfile(): Promise<User> {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
  const response = await fetch(API_ROUTES.USER.ME, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }

  return response.json();
}
