import React, { useEffect, useState } from 'react';
// @ts-ignore
import { ApiClient } from 'adminjs';
// @ts-ignore
import { Label, Select, Box } from '@adminjs/design-system';

const api = new ApiClient();

const TestSelect: React.FC<any> = ({ record, onChange }) => {
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState<any>(undefined);

  useEffect(() => {
    fetchTestsAndSetInitial();
  }, []);

  const fetchTestsAndSetInitial = async () => {
    const testOptions = await fetchTestOptions();
    setTests(testOptions);

    if (record.params.indicatorRange) {
      const initialTest = await fetchInitialSelectedTest(testOptions);
      setSelectedTest(initialTest || null);
      onChange('testId', initialTest?.value);
    }
  };

  const fetchTestOptions = async () => {
    const response = await api.resourceAction({
      resourceId: 'TestType',
      actionName: 'list',
    });
    return response.data.records.map((test: any) => ({
      value: test.id,
      label: test.params.name,
    }));
  };

  const fetchInitialSelectedTest = async (testOptions: any[]) => {
    try {
      const indicatorRange = await api.recordAction({
        resourceId: 'IndicatorRange',
        actionName: 'show',
        recordId: record.params.indicatorRange,
      });

      const indicatorId = indicatorRange.data.record.params.indicator;
      const indicator = await api.recordAction({
        resourceId: 'Indicator',
        actionName: 'show',
        recordId: indicatorId,
      });

      const testTypeId = indicator.data.record.params.testType;
      return testOptions.find((option: any) => option.value === testTypeId);
    } catch (error) {
      console.error('Error fetching initial selected test:', error);
      return null;
    }
  };

  const handleTestChange = (selected: any) => {
    setSelectedTest(selected);
    onChange('testId', selected?.value || '');
  };

  return (
    <Box marginBottom="lg">
      <Label htmlFor="testSelect" required="true">
        Тест
      </Label>
      <Select
        id="testSelect"
        value={selectedTest}
        options={tests}
        onChange={handleTestChange}
        placeholder="Оберіть тест"
        required={true}
      />
    </Box>
  );
};

export default TestSelect;
