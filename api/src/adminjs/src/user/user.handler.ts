export const handleBeforeNewUser = async (request: any) => {
  const currentUser = request.session.adminUser;

  // await validateEmployeeDto(request.payload);

  request.payload.createdBy = currentUser.id;
  return request;
};

export const handleAfterNewUser = async (
  originalResponse: any,
  request: any,
) => {
  const currentUser = request.session.adminUser;
  const createdUser = originalResponse.record.params;
  const { id, email } = createdUser.email;

  return originalResponse;
};
