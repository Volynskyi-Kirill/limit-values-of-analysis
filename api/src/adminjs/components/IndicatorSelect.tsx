// components/IndicatorSelect.tsx

import React, { useEffect, useState } from 'react';
// @ts-ignore
import { ApiClient } from 'adminjs';
// @ts-ignore
import { Label, Select, FormGroup, FormMessage } from '@adminjs/design-system';

const api = new ApiClient();

const IndicatorSelect: React.FC<any> = (props) => {
  const { record, onChange, property } = props;
  const [indicators, setIndicators] = useState([]);
  const [selectedIndicator, setSelectedIndicator] = useState<any>(undefined);

  const error = record.errors?.[property.path]?.message;

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

        const indicatorId = record.populated.indicatorRange.params.indicator;
        if (indicatorId) {
          const initialIndicator = indicatorOptions.find(
            (option: any) => option.value === indicatorId,
          );
          setSelectedIndicator(initialIndicator ?? null);
          onChange('indicator', indicatorId);
        }
      } else {
        setIndicators([]);
        setSelectedIndicator(null);
      }
    };
    fetchIndicators();
  }, [record?.params?.testId]);

  const handleIndicatorChange = (selected: any) => {
    setSelectedIndicator(selected);
    onChange('indicator', selected?.value || '');
  };

  if (!indicators.length) return null;

  return (
    <FormGroup error={Boolean(error)}>
      <Label htmlFor="indicatorSelect" required={property.isRequired}>
        {property.label}
      </Label>
      <Select
        id="indicatorSelect"
        value={selectedIndicator}
        options={indicators}
        onChange={handleIndicatorChange}
        placeholder="Оберіть індикатор"
      />
      {error && <FormMessage>{error}</FormMessage>}
    </FormGroup>
  );
};

export default IndicatorSelect;
