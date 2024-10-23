import { validateIndicatorDto } from './indicator.validate';

export const handleBeforeNewIndicator = async (request: any) => {
  const currentUser = request.session.adminUser;

  await validateIndicatorDto(request.payload);

  request.payload.createdBy = currentUser.id;
  return request;
};

export const handleBeforeEditTestType = async (request: any) => {
  if (request.method === 'post') {
    await validateIndicatorDto(request.payload);
  }
  return request;
};
