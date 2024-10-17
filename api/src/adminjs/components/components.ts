export const loadComponents = async () => {
  const { ComponentLoader } = await import('adminjs');
  const componentLoader = new ComponentLoader();

  const Components = {
    RoleSelect: componentLoader.add('RoleSelect', './role-select'),
    IndicatorSelect: componentLoader.add(
      'IndicatorSelect',
      './IndicatorSelect',
    ),
    TestSelect: componentLoader.add('TestSelect', './TestSelect'),
  };

  return { componentLoader, Components };
};
