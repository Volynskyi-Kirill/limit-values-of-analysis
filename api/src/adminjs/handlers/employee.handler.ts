import { canEditEmployee, filterRecordsByRole } from '../lib/helpers';

export const handleBeforeNewEmployee = async (request: any) => {
  const currentUser = request.session.adminUser;
  request.payload.createdBy = currentUser.id;
  console.log('request.payload: ', request.payload);
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

// export const handleEditAccessEmployee = async ({
//   currentAdmin,
//   record,
// }: {
//   currentAdmin: any;
//   record: any;
// }) => {
//   const currentAdminRole = currentAdmin.role;
//   console.log('currentAdminRole: ', currentAdminRole);
//   const employeeRole = record.params.role;
//   console.log('employeeRole: ', employeeRole);

//   return canEditEmployee(currentAdminRole, employeeRole);
// };
