export const handleUpdatedAt = async (request: any) => {
  request.payload.updatedAt = new Date();
  return request;
};
