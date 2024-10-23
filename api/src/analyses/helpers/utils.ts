import {
  AnalysisWithSearchOptions,
  GroupedAnalyses,
} from '../analyses.service';

export function groupAnalysesByTestTypeAndDate(
  analyses: AnalysisWithSearchOptions[],
): GroupedAnalyses {
  const groupedByTestTypeAndDate = analyses.reduce<GroupedAnalyses>(
    (acc, analysis) => {
      const testTypeName = analysis.indicatorRange.indicator.testType.name;
      const testDate = analysis.testDate.toISOString().split('T')[0];

      const groupKey = `${testTypeName}-${testDate}`;

      if (!acc[groupKey]) {
        acc[groupKey] = {
          testType: analysis.indicatorRange.indicator.testType,
          tests: [],
        };
      }
      acc[groupKey].tests.push(analysis);
      return acc;
    },
    {},
  );

  return groupedByTestTypeAndDate;
}

