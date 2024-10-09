export const loadComponents = async () => {
  const { ComponentLoader } = await import('adminjs');
  const componentLoader = new ComponentLoader();

  const Components = {
    RoleSelect: componentLoader.add('RoleSelect', './role-select'),
  };

  return { componentLoader, Components };
};
