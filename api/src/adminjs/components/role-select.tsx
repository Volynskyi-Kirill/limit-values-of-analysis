import React, { useState } from 'react';

// @ts-ignore
import { useCurrentAdmin } from 'adminjs';
// @ts-ignore
import { Select } from '@adminjs/design-system';
import { getAvailableRoles } from '../lib/helpers';

const RoleSelect: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string | undefined>(
    undefined,
  );
  const [currentAdmin, setCurrentAdmin] = useCurrentAdmin();

  const currentRole = currentAdmin?.role;

  const options = getAvailableRoles(currentRole);

  const handleChange = (selected: { value: string } | null) => {
    setSelectedRole(selected ? selected.value : undefined);
  };

  return (
    <Select
      id="roleSelect"
      value={
        selectedRole
          ? {
              value: selectedRole,
              label: options.find((option) => option.value === selectedRole)
                ?.label,
            }
          : null
      }
      options={options}
      onChange={handleChange}
      placeholder="Select the role"
    />
  );
};

export default RoleSelect;
