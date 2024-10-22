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

const ANALYSIS_SEARCH_OPTIONS = {
  include: {
    indicatorRange: {
      select: {
        gender: true,
        minValue: true,
        maxValue: true,
        result: true,
        indicator: {
          select: {
            id: true,
            name: true,
            unit: true,
            description: true,
            testType: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
          },
        },
      },
    },
  },
};

@Injectable()
export class AnalysesService {
  constructor(private prismaService: PrismaService) {}

  findAnalysisById(id: number) {
    return this.prismaService.test.findUnique({
      where: { id },
      ...ANALYSIS_SEARCH_OPTIONS,
    });
  }

  async findUserAnalysesByTestType(userId: number, testTypeId: number) {
    const analyses = await this.prismaService.test.findMany({
      where: {
        userId,
        indicatorRange: {
          indicator: {
            testTypeId,
          },
        },
      },
      ...ANALYSIS_SEARCH_OPTIONS,
    });

    return analyses;
  }

  async findAnalysesByUser(userId: number) {
    const analyses = await this.prismaService.test.findMany({
      where: {
        userId,
      },
      ...ANALYSIS_SEARCH_OPTIONS,
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
