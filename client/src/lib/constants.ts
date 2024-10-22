export enum Gender {
  male = 'male',
  female = 'female',
}

export enum TestStatus {
  DONE = 'DONE',
  IN_PROGRESS = 'IN_PROGRESS',
}

export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER: 'user',
} as const;
