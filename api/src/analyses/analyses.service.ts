import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Test, TestType, IndicatorRange, Indicator } from '@prisma/client';

type GroupedAnalyses = {
  [key: string]: {
    testType: Pick<TestType, 'name' | 'description'>;
    tests: Array<
      Test & {
        indicatorRange: Pick<
          IndicatorRange,
          'gender' | 'minValue' | 'maxValue' | 'result'
        > & {
          indicator: Pick<Indicator, 'name' | 'unit' | 'description'> & {
            testType: Pick<TestType, 'name' | 'description'>;
          };
        };
      }
    >;
  };
};

@Injectable()
export class AnalysesService {
  constructor(private prismaService: PrismaService) {}

  async findAnalysesByUser(userId: number) {
    const analyses = await this.prismaService.test.findMany({
      where: {
        userId,
      },
      include: {
        indicatorRange: {
          select: {
            gender: true,
            minValue: true,
            maxValue: true,
            result: true,
            indicator: {
              select: {
                name: true,
                unit: true,
                description: true,
                testType: {
                  select: {
                    name: true,
                    description: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const groupedByTestType = analyses.reduce<GroupedAnalyses>(
      (acc, analysis) => {
        const testTypeName = analysis.indicatorRange.indicator.testType.name;
        if (!acc[testTypeName]) {
          acc[testTypeName] = {
            testType: analysis.indicatorRange.indicator.testType,
            tests: [],
          };
        }
        acc[testTypeName].tests.push(analysis);
        return acc;
      },
      {},
    );

    return groupedByTestType;
  }
}
