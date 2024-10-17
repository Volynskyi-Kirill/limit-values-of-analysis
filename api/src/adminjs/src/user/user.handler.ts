import { AuthService } from 'src/auth/auth.service';
import { MailService } from 'src/mail/mail.service';

import { validateUniqueEmail, validateUserDto } from './user.validate';

export const handleBeforeNewUser = async (request: any) => {
  const email = request.payload.email;

  await validateUserDto(request.payload);
  await validateUniqueEmail(email);

  const currentUser = request.session.adminUser;
  request.payload.createdBy = currentUser.id;
  return request;
};

export const handleAfterNewUser = async (
  originalResponse: any,
  request: any,
  {
    authService,
    mailService,
  }: {
    authService: AuthService;
    mailService: MailService;
  },
) => {
  const createdUser = originalResponse.record.params;
  const { id, email } = createdUser;

  const token = authService.generateToken(email);
  const linkHtml = await authService.createLink(token);

  await mailService.sendMessage({
    email,
    subject: 'Магічне посилання',
    html: linkHtml,
  });

  return originalResponse;
};
