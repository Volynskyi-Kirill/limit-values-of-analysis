import { Role } from '@prisma/client';

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
