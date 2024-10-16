// components/IndicatorSelect.tsx

import React, { useEffect, useState } from 'react';
// @ts-ignore
import { ApiClient } from 'adminjs';
// @ts-ignore
import { Label, Select, Box } from '@adminjs/design-system';

const api = new ApiClient();

const IndicatorSelect: React.FC<any> = (props) => {
  const { record, onChange } = props;
  const [indicators, setIndicators] = useState([]);
  const [selectedIndicator, setSelectedIndicator] = useState<any>(undefined);

  useEffect(() => {
    const fetchIndicators = async () => {
      if (record?.params?.testId) {
        const response = await api.resourceAction({
          resourceId: 'IndicatorRange',
          actionName: `getIndicatorsByTestId/${record.params.testId}`,
        });
        const indicatorOptions = response.data.records.map(
          (indicator: any) => ({
            value: indicator.id,
            label: indicator.label,
          }),
        );
        setIndicators(indicatorOptions);
      } else {
        setIndicators([]);
      }
    };
    fetchIndicators();
  }, [record?.params?.testId]);

  const handleIndicatorChange = (selected: any) => {
    setSelectedIndicator(selected);
    onChange('indicatorId', selected?.value || '');
  };

  if (!indicators.length) return null;

  return (
    <Box marginBottom="lg">
      <Label htmlFor="indicatorSelect" required="true">
        Індикатор
      </Label>
      <Select
        id="indicatorSelect"
        value={selectedIndicator}
        options={indicators}
        onChange={handleIndicatorChange}
        placeholder="Оберіть індикатор"
      />
    </Box>
  );
};

export default IndicatorSelect;
