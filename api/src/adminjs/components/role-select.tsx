import React, { useState } from 'react';

// @ts-ignore
import { useCurrentAdmin } from 'adminjs';
// @ts-ignore
import { Select } from '@adminjs/design-system';
import { getAvailableRoles } from '../lib/helpers';

const RoleSelect: React.FC = (props: any) => {
  console.log('props: ', props);
  const { record, onChange } = props;
  console.log('onChange: ', onChange);
  console.log('record: ', record);
  const [selectedRole, setSelectedRole] = useState<string | undefined>(
    undefined,
  );
  console.log('selectedRole: ', selectedRole);

  const [currentAdmin, setCurrentAdmin] = useCurrentAdmin();

  const currentRole = currentAdmin?.role;

  const options = getAvailableRoles(currentRole);
  console.log('options: ', options);

  const handleRoleChange = (selected: any) => {
    setSelectedRole(selected);
    onChange('role', selected.value);
  };

  return (
    <>
      <label htmlFor="roleSelect">Role</label>
      <Select
        id="roleSelect"
        name="role"
        value={selectedRole}
        options={options}
        onChange={handleRoleChange}
        placeholder="Select the role"
        required
      />
    </>
  );
};

export default RoleSelect;
