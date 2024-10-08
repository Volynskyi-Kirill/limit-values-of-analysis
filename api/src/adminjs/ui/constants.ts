import { Role } from '@prisma/client';

export const availableRolesForOwner = [
    { value: Role.SUPER_ADMIN, label: 'супер адмін' },
  { value: Role.ADMIN, label: 'адмін' },
  { value: Role.MED_WORKER, label: 'мед працівник' },
];

export const availableRolesForAdmin = [
  { value: Role.MED_WORKER, label: 'мед працівник' },
];
