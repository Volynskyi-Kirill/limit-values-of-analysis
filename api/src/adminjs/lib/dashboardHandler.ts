import { prismaAdminJSClient } from 'src/modules/adminjs.module';

export const dashboardHandler = async (request: any, context: any) => {
  const { fromDate, toDate } = request.query;

  const testCount = await prismaAdminJSClient.test.count({
    where: {
      testDate: {
        gte: fromDate ? new Date(fromDate) : undefined,
        lte: toDate ? new Date(toDate) : undefined,
      },
    },
  });

  return { testCount };
};
