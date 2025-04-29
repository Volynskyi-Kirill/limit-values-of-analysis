import React, { useEffect, useState } from 'react';
// @ts-ignore
import { ApiClient } from 'adminjs';
// @ts-ignore
import { Label, Select, FormGroup, FormMessage } from '@adminjs/design-system';

const api = new ApiClient();

const IndicatorSelect: React.FC<any> = ({ record, onChange, property }) => {
  const [indicators, setIndicators] = useState([]);
  const [selectedIndicator, setSelectedIndicator] = useState<any>(undefined);

  const error = record.errors?.[property.path]?.message;

  useEffect(() => {
    loadIndicators();
  }, [record?.params?.testId]);

  const loadIndicators = async () => {
    if (!record?.params?.testId) {
      resetIndicators();
      return;
    }

    const indicatorOptions = await fetchIndicatorOptions();
    setIndicators(indicatorOptions);

    const initialIndicator =
      await fetchInitialIndicatorSelection(indicatorOptions);
    setSelectedIndicator(initialIndicator);
    if (initialIndicator) onChange('indicator', initialIndicator.value);
  };

  const fetchIndicatorOptions = async () => {
    const response = await api.resourceAction({
      resourceId: 'IndicatorRange',
      actionName: `getIndicatorsByTestId/${record.params.testId}`,
    });
    return response.data.records.map((indicator: any) => ({
      value: indicator.id,
      label: indicator.label,
    }));
  };

  const fetchInitialIndicatorSelection = async (indicatorOptions: any[]) => {
    const indicatorId = record.populated?.indicatorRange?.params?.indicator;
    return (
      indicatorOptions.find((option: any) => option.value === indicatorId) ||
      null
    );
  };

  const resetIndicators = () => {
    setIndicators([]);
    setSelectedIndicator(null);
  };

  const handleIndicatorChange = (selected: any) => {
    setSelectedIndicator(selected);
    onChange('indicator', selected?.value || '');
  };

  if (!indicators.length) return null;

  return (
    <FormGroup error={Boolean(error)}>
      <Label htmlFor="indicatorSelect" required={property.isRequired}>
        Індикатор
      </Label>
      <Select
        id="indicatorSelect"
        value={selectedIndicator}
        options={indicators}
        onChange={handleIndicatorChange}
        placeholder="Оберіть індикатор"
        required={property.isRequired}
      />
      {error && <FormMessage>{error}</FormMessage>}
    </FormGroup>
  );
};

export default IndicatorSelect;
