import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Test, TestType, IndicatorRange, Indicator } from '@prisma/client';
import { groupAnalysesByTestTypeAndDate } from './helpers/utils';

export type AnalysisWithSearchOptions = Pick<
  Test,
  'id' | 'testDate' | 'userId' | 'resultValue' | 'resultText' | 'status'
> & {
  indicatorRange: Pick<
    IndicatorRange,
    'id' | 'gender' | 'minValue' | 'maxValue' | 'result'
  > & {
    indicator: Pick<Indicator, 'id' | 'name' | 'unit' | 'description'> & {
      testType: Pick<TestType, 'id' | 'name' | 'description'>;
    };
  };
};

export type GroupedAnalyses = {
  [key: string]: {
    testType: Pick<TestType, 'name' | 'description'>;
    tests: AnalysisWithSearchOptions[];
  };
};
const ANALYSIS_SEARCH_OPTIONS = {
  select: {
    id: true,
    testDate: true,
    userId: true,
    resultValue: true,
    resultText: true,
    status: true,
    indicatorRange: {
      select: {
        id: true,
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
      orderBy: {
        testDate: 'desc',
      },
      ...ANALYSIS_SEARCH_OPTIONS,
    });

    return analyses;
  }

  async getUserAnalyses(userId: number): Promise<AnalysisWithSearchOptions[]> {
    const analyses = await this.prismaService.test.findMany({
      where: {
        userId,
      },
      orderBy: {
        testDate: 'desc',
      },
      ...ANALYSIS_SEARCH_OPTIONS,
    });

    return analyses;
  }

  async findAnalysesByUser(userId: number) {
    const analyses = await this.getUserAnalyses(userId);
    return groupAnalysesByTestTypeAndDate(analyses);
  }
}
