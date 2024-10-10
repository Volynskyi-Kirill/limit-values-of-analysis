import { Role } from '@prisma/client';
import {
  availableRolesForAdmin,
  availableRolesForOwner,
} from '../ui/constants';

export const filterRecordsByRole = (records: any[], userRole: Role) => {
  switch (userRole) {
    case Role.SUPER_ADMIN:
      return records;

    case Role.ADMIN:
      return records.filter(
        (record) => record.params.role !== Role.SUPER_ADMIN,
      );

    case Role.MED_WORKER:
      return records.filter((record) => record.params.role === Role.MED_WORKER);

    default:
      return [];
  }
};

export const getAvailableRoles = (currentUserRole: Role) => {
  switch (currentUserRole) {
    case Role.SUPER_ADMIN:
      return availableRolesForOwner;
    case Role.ADMIN:
      return availableRolesForAdmin;
    default:
      return [];
  }
};

export function canEditEmployee(
  currentAdminRole: Role,
  userRole: Role,
): boolean {
  switch (currentAdminRole) {
    case Role.ADMIN:
      switch (userRole) {
        case Role.ADMIN:
          return false;
        case Role.MED_WORKER:
          return true;
        default:
          return false;
      }

    case Role.SUPER_ADMIN:
      return true;

    default:
      return false;
  }
}

export function canDeleteEmployee(
  currentAdminRole: Role,
  userRole: Role,
): boolean {
  switch (currentAdminRole) {
    case Role.ADMIN:
      switch (userRole) {
        case Role.ADMIN:
          return false;
        case Role.MED_WORKER:
          return true;
        default:
          return false;
      }

    case Role.SUPER_ADMIN:
      return true;

    default:
      return false;
  }
}
