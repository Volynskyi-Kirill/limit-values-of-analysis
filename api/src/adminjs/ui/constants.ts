import { Role } from '@prisma/client';

const roleAccess = {
  [Role.SUPER_ADMIN]: { label: 'супер адмін', accessibleBy: ['owner'] },
  [Role.ADMIN]: { label: 'адмін', accessibleBy: ['owner'] },
  [Role.MED_WORKER]: {
    label: 'мед працівник',
    accessibleBy: ['owner', 'admin'],
  },
};

export const getAvailableRolesForUser = (userType: any) => {
  return Object.entries(roleAccess)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, role]) => role.accessibleBy.includes(userType))
    .map(([value, role]) => ({ value, label: role.label }));
};

export const availableRolesForOwner = getAvailableRolesForUser('owner');

export const availableRolesForAdmin = getAvailableRolesForUser('admin');
