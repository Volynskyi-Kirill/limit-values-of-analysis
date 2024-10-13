import React, { useState } from 'react';

// @ts-ignore
import { useCurrentAdmin } from 'adminjs';
// @ts-ignore
import { Select } from '@adminjs/design-system';
import { getAvailableRoles } from '../lib/helpers';
import { generateRoleOptions } from '../shared/constants';

const RoleSelect: React.FC = (props: any) => {
  const {
    onChange,
    record: { params },
  } = props;

  const currentRoleOptions = generateRoleOptions(params?.role) ?? undefined;
  const [selectedRole, setSelectedRole] = useState<any | undefined>(
    currentRoleOptions,
  );
  const [currentAdmin, setCurrentAdmin] = useCurrentAdmin();

  const currentRole = currentAdmin?.role;
  const options = getAvailableRoles(currentRole);

  const handleRoleChange = (selected: any) => {
    setSelectedRole(selected);
    onChange('role', selected.value);
  };

  return (
    <>
      <label htmlFor="roleSelect">Роль працівника</label>
      <Select
        id="roleSelect"
        name="role"
        value={selectedRole}
        options={options}
        onChange={handleRoleChange}
        placeholder="Оберіть роль"
        required
      />
    </>
  );
};

export default RoleSelect;
