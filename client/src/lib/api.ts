import { User } from '@/components/auth/AuthProvider';
import { API_ROUTES } from './config/apiRoutes';

export async function fetchUserProfile(): Promise<User> {
  const token = localStorage.getItem('authToken');
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
