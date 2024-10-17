import { prismaAdminJSClient } from 'src/modules/adminjs.module';

export const handleBeforeNewIndicatorRange = async (request: any) => {
  const currentUser = request.session.adminUser;

  // await validateEmployeeDto(request.payload);

  request.payload.createdBy = currentUser.id;
  return request;
};

export const handleGetIndicatorsByTestId = async (request: any) => {
  const testId = request.params.query;

  if (!testId) {
    return { records: [] };
  }

  const indicators = await prismaAdminJSClient.indicator.findMany({
    where: { testTypeId: Number(testId) },
  });

  return {
    records: indicators.map((indicator) => ({
      id: indicator.id,
      label: indicator.name,
    })),
  };
};

export const handleBeforeSaveIndicatorRange = async (request: any) => {
  const { payload } = request;
  delete payload.testId;
  return request;
};
