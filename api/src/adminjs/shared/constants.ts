import { Role } from '@prisma/client';

const roleLabels = {
  [Role.SUPER_ADMIN]: 'супер адмін',
  [Role.ADMIN]: 'адмін',
  [Role.MED_WORKER]: 'мед працівник',
};

const roleAccess = {
  [Role.SUPER_ADMIN]: {
    label: roleLabels[Role.SUPER_ADMIN],
    accessibleBy: ['owner'],
  },
  [Role.ADMIN]: { label: roleLabels[Role.ADMIN], accessibleBy: ['owner'] },
  [Role.MED_WORKER]: {
    label: roleLabels[Role.MED_WORKER],
    accessibleBy: ['owner', 'admin'],
  },
};

export const generateRoleOptions = (role: Role) => {
  return {
    valuer: role,
    label: roleLabels[role],
  };
};

export const getAvailableRolesForUser = (userType: any) => {
  return (
    Object.entries(roleAccess)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, role]) => role.accessibleBy.includes(userType))
      .map(([value, role]) => ({ value, label: role.label }))
  );
};

export const availableRolesForOwner = getAvailableRolesForUser('owner');

export const availableRolesForAdmin = getAvailableRolesForUser('admin');
