import { AuthService } from 'src/auth/auth.service';
import { MailService } from 'src/mail/mail.service';

export const handleBeforeNewUser = async (request: any) => {
  const currentUser = request.session.adminUser;

  // await validateEmployeeDto(request.payload);

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
  const currentUser = request.session.adminUser;
  const createdUser = originalResponse.record.params;
  const { id, email } = createdUser;

  const token = authService.generateToken(id, email);
  const linkHtml = await authService.createLink(token);

  await mailService.sendMessage({
    email,
    subject: 'Магічне посилання',
    html: linkHtml,
  });

  return originalResponse;
};
