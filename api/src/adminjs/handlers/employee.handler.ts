import { filterRecordsByRole } from '../lib/helpers';

export const handleBeforeNewEmployee = async (request: any) => {
  const currentUser = request.session.adminUser;
  console.log('currentUser: ', currentUser);
  console.log('request.payload до изменения: ', request.payload);

  request.payload.createdById = currentUser.id;

  console.log('request.payload после изменения: ', request.payload);
  return request;
};

export const handleAfterListEmployees = async (
  originalResponse: any,
  request: any,
) => {
  const currentUser = request.session.adminUser;
  const currentUserRole = currentUser.role;

  const filteredRecords = filterRecordsByRole(
    originalResponse.records,
    currentUserRole,
  );

  return {
    ...originalResponse,
    records: filteredRecords,
  };
};
