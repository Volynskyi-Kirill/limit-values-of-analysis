import { formatText } from 'src/adminjs/shared/utils';
import { prismaAdminJSClient } from 'src/modules/adminjs.module';

export const handleBeforeNewIndicatorRange = async (request: any) => {
  const currentUser = request.session.adminUser;

  // await validateEmployeeDto(request.payload);

  request.payload.resultText = formatText(request.payload.resultText);

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
  request.payload.resultText = formatText(request.payload.resultText);

  return request;
};

const fetchIndicatorWithTestType = async (indicatorId: number) => {
  return await prismaAdminJSClient.indicator.findUnique({
    where: { id: indicatorId },
    include: { testType: true },
  });
};

const setRecordTestType = (record: any, indicator: any) => {
  record.params.testType = indicator?.testType?.name || 'Невідомий тест';
  record.params.unit = indicator?.unit || 'Невідомий індикатор';
};

export const listBeforeHook = async (request: any) => {
  request.query = {
    ...request.query,
    prisma: {
      include: {
        indicator: {
          include: {
            testType: true,
          },
        },
      },
    },
  };
  return request;
};

export const listAfterHook = async (response: any) => {
  const { records } = response;
  for (const record of records) {
    const indicatorId = record.params.indicator;
    const indicator = await fetchIndicatorWithTestType(indicatorId);
    setRecordTestType(record, indicator);
  }
  return response;
};

export const showAfterHook = async (response: any) => {
  const record = response.record;
  const indicatorId = record.params.indicator;
  const indicator = await fetchIndicatorWithTestType(indicatorId);
  setRecordTestType(record, indicator);
  return response;
};
