const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const API_ROUTES = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/link`,
    CONFIRM: `${BASE_URL}/auth/confirm`,
  },
  USER: {
    ME: `${BASE_URL}/user/me`,
  },
  ANALYSES: {
    BY_USER: (userId: number) => `${BASE_URL}/analyses/user/${userId}`,
    BY_USER_TEST_TYPE: (userId: number, testTypeId: number, testDate: string) =>
      `${BASE_URL}/analyses/user/${userId}/testType/${testTypeId}/${testDate}`,
  },
};
