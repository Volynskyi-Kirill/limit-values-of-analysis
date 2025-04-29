import { Role } from '@prisma/client';

export const handleUpdatedAt = async (request: any) => {
  request.payload.updatedAt = new Date();
  return request;
};

export const exceptMedicalEmployee = ({
  currentAdmin,
}: {
  currentAdmin: any;
}) => {
  const currentAdminRole = currentAdmin.role;

  return currentAdminRole !== Role.MED_WORKER;
};
