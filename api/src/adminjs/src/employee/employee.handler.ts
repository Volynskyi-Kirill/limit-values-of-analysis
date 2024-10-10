import {
  canDeleteEmployee,
  canEditEmployee,
  filterRecordsByRole,
} from '../../lib/helpers';
import { validateEmployeeDto } from './employee.validate';

export const handleBeforeNewEmployee = async (request: any) => {
  const currentUser = request.session.adminUser;

  await validateEmployeeDto(request.payload);

  request.payload.createdBy = currentUser.id;
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

export const handleEditAccessEmployee = ({
  currentAdmin,
  record,
}: {
  currentAdmin: any;
  record: any;
}) => {
  const currentAdminRole = currentAdmin.role;
  const employeeRole = record.params.role;

  return canEditEmployee(currentAdminRole, employeeRole);
};

export const handleDeleteAccessEmployee = ({
  currentAdmin,
  record,
}: {
  currentAdmin: any;
  record: any;
}) => {
  const currentAdminRole = currentAdmin.role;
  const employeeRole = record.params.role;

  return canDeleteEmployee(currentAdminRole, employeeRole);
};
