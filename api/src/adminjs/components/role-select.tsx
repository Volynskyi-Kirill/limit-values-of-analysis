import React, { useState } from 'react';

const RoleSelect: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string | undefined>(
    undefined,
  );

  const options = [
    { label: 'Кастом', value: 'ADMIN' },
    { label: 'Пользователь', value: 'USER' },
    { label: 'Менеджер', value: 'MANAGER' },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value);
  };

  return (
    <div>
      <label htmlFor="roleSelect">Выберите роль:</label>
      <select id="roleSelect" value={selectedRole} onChange={handleChange}>
        <option value="" disabled>
          Выберите роль
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <p>Выбранная роль: {selectedRole}</p>
    </div>
  );
};

export default RoleSelect;

// import React, { useState } from 'react';
// // import { Role } from '@prisma/client';

// const RoleSelect = async () => {
//   const { Select } = await import('@adminjs/design-system');

//   const [selectedRole, setSelectedRole] = useState();
//   console.log('selectedRole: ', selectedRole);

//   const options = [{ label: 'кастом', value: 'ADMIN' }];

//   return (
//     <Select
//       value={selectedRole}
//       onChange={(selected) => setSelectedRole(selected)}
//       options={options}
//     />
//   );
// };

// export default RoleSelect;

// import React, { useState } from 'react';
// import { Role } from '@prisma/client';

// const RoleSelect = async ({ role }: { role: Role }) => {
//   console.log('role: ', role);
//   const { Select } = await import('@adminjs/design-system');

//   const [selectedRole, setSelectedRole] = useState();

//   const options = [
//     { label: 'Admin', value: 'ADMIN' },
//     { label: 'Client', value: 'CLIENT' },
//   ];
//   //   const options = getAvailableRolesForUser(role);

//   return (
//     <Select
//       value={selectedRole}
//       onChange={(selected) => setSelectedRole(selected)}
//       options={options}
//     />
//   );
// };

// export default RoleSelect;
