import { validateTestTypeDto } from './test-type.validate';

export const handleBeforeNewTestType = async (request: any) => {
  const currentUser = request.session.adminUser;

  await validateTestTypeDto(request.payload);

  request.payload.createdBy = currentUser.id;
  return request;
};

export const handleBeforeEditTestType = async (request: any) => {
  if (request.method === 'post') {
    await validateTestTypeDto(request.payload);
  }
  return request;
};
