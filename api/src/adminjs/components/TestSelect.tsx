// components/TestSelect.tsx

import React, { useEffect, useState } from 'react';
// @ts-ignore
import { ApiClient } from 'adminjs';
// @ts-ignore
import { Label, Select, Box } from '@adminjs/design-system';

const api = new ApiClient();

const TestSelect: React.FC<any> = (props) => {
  const { record, onChange } = props;
  console.log('record: ', record);
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState<any>(undefined);

  useEffect(() => {
    const fetchTests = async () => {
      const response = await api.resourceAction({
        resourceId: 'TestType',
        actionName: 'list',
      });
      const testOptions = response.data.records.map((test: any) => ({
        value: test.id,
        label: test.params.name,
      }));
      setTests(testOptions);

      if (record.params.indicatorRange) {
        const indicatorRangeResponse = await api.recordAction({
          resourceId: 'IndicatorRange',
          actionName: 'show',
          recordId: record.params.indicatorRange,
        });

        const indicatorId = indicatorRangeResponse.data.record.params.indicator;
        const indicatorResponse = await api.recordAction({
          resourceId: 'Indicator',
          actionName: 'show',
          recordId: indicatorId,
        });

        const testTypeId = indicatorResponse.data.record.params.testType;
        const initialTest = testOptions.find(
          (option: any) => option.value === testTypeId,
        );
        setSelectedTest(initialTest || null);
        onChange('testId', testTypeId);
      }
    };
    fetchTests();
  }, []);

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
      />
    </Box>
  );
};

export default TestSelect;
