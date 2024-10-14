const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const API_ROUTES = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/link`,
    CONFIRM: `${BASE_URL}/auth/confirm`,
  },
  //   USER: {
  //     PROFILE: `${BASE_URL}/user/profile`,
  //     SETTINGS: `${BASE_URL}/user/settings`,
  //   },
};
