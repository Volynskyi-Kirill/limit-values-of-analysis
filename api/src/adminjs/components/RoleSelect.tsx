import React, { useState } from 'react';
import { Role } from '@prisma/client';
import { getAvailableRolesForUser } from '../ui/constants';

const RoleSelect = async ({ role }: { role: Role }) => {
  console.log('role: ', role);
  const { Select } = await import('@adminjs/design-system');

  const [selectedRole, setSelectedRole] = useState();

  const options = [
    { label: 'Admin', value: 'ADMIN' },
    { label: 'Client', value: 'CLIENT' },
  ];
  //   const options = getAvailableRolesForUser(role);

  return (
    <Select
      value={selectedRole}
      onChange={(selected) => setSelectedRole(selected)}
      options={options}
    />
  );
};

export default RoleSelect;
