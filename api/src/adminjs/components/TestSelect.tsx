// components/TestSelect.tsx

import React, { useEffect, useState } from 'react';
// @ts-ignore
import { ApiClient } from 'adminjs';
// @ts-ignore
import { Label, Select, Box } from '@adminjs/design-system';

const api = new ApiClient();

const TestSelect: React.FC<any> = (props) => {
  const { record, onChange } = props;
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState<any>(undefined);
  console.log('record.params: ', record.params);

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
