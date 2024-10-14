export const handleBeforeNewIndicatorRange = async (request: any) => {
  const currentUser = request.session.adminUser;

  // await validateEmployeeDto(request.payload);

  request.payload.createdBy = currentUser.id;
  return request;
};
