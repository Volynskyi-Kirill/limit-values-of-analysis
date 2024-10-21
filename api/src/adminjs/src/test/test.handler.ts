import { TestStatus } from '@prisma/client';
import { TRANSLATION_UA } from 'src/adminjs/translations/translations.ua';
import { prismaAdminJSClient } from 'src/modules/adminjs.module';

export const handleBeforeNewTest = async (request: any) => {
  const currentUser = request.session.adminUser;

  // await validateEmployeeDto(request.payload);

  request.payload.createdBy = currentUser.id;
  return request;
};

export async function applyIndicatorRange(request: any) {
  const { indicator, user: userId } = request.payload;

  if (indicator && userId) {
    const user = await prismaAdminJSClient.user.findUnique({
      where: { id: Number(userId) },
      select: { gender: true },
    });

    if (user?.gender) {
      const range = await prismaAdminJSClient.indicatorRange.findFirst({
        where: { indicatorId: Number(indicator), gender: user.gender },
      });

      delete request.payload.testId;

      if (!range) {
        const indicatorDetails = await prismaAdminJSClient.indicator.findUnique(
          {
            where: { id: Number(indicator) },
            select: { name: true },
          },
        );

        const genderTranslation = TRANSLATION_UA.labels.gender[user.gender];

        const { ValidationError } = await import('adminjs');

        const validationErrors = {
          indicator: {
            message: `Спочатку треба створити діапазон значень для індикатору "${indicatorDetails?.name}" та статі "${genderTranslation}"`,
          },
        };

        throw new ValidationError(validationErrors);
      }

      request.payload.indicatorRange = range.id;
    }
  }

  return request;
}

const fetchIndicatorRangeDetails = async (indicatorRangeId: number) => {
  return await prismaAdminJSClient.indicatorRange.findUnique({
    where: { id: indicatorRangeId },
    include: {
      indicator: { include: { testType: true } },
    },
  });
};

const processRecordIndicatorDetails = (record: any, indicatorRange: any) => {
  record.params.testType =
    indicatorRange?.indicator?.testType?.name || 'Невідомий тип тесту';
  record.params.indicator =
    indicatorRange?.indicator?.name || 'Невідомий індикатор';
};

export const listAfterHook = async (response: any) => {
  const { records } = response;
  for (const record of records) {
    const indicatorRangeId = record.params.indicatorRange;
    const indicatorRange = await fetchIndicatorRangeDetails(indicatorRangeId);
    processRecordIndicatorDetails(record, indicatorRange);
  }
  return response;
};

export const showAfterHook = async (response: any) => {
  const record = response.record;
  const indicatorRangeId = record.params.indicatorRange;
  const indicatorRange = await fetchIndicatorRangeDetails(indicatorRangeId);
  processRecordIndicatorDetails(record, indicatorRange);
  return response;
};

export const applyStatusBasedOnResult = async (request: any) => {
  const isResultValue =
    !!request.payload.resultValue && Number(request.payload.resultValue) !== 0;
  const resultText = !!request.payload.resultText;
  if (isResultValue || resultText) {
    request.payload.status = TestStatus.DONE;
  } else {
    request.payload.status = TestStatus.IN_PROGRESS;
  }
  return request;
};
