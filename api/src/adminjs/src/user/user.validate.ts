import { prismaAdminJSClient } from 'src/modules/adminjs.module';

export const validateUniqueEmail = async (email: string) => {
  const existingUser = await prismaAdminJSClient.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    const { ValidationError } = await import('adminjs');
    throw new ValidationError({
      email: {
        message: 'Користувач з такою поштою вже існує!',
      },
    });
  }
};
