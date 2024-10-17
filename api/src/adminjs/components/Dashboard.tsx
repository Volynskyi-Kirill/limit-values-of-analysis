// @ts-nocheck

import React, { useEffect, useState } from 'react';
import { ApiClient } from 'adminjs';
import {
  Box,
  H2,
  Button,
  Text,
  Label,
  DatePicker,
} from '@adminjs/design-system';

const api = new ApiClient();

const Dashboard: React.FC = () => {
  const [testCount, setTestCount] = useState<number | null>(null);
  const [fromDate, setFromDate] = useState<string | null>(null);
  const [toDate, setToDate] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response: any = await api.getDashboard({
        params: {
          fromDate: fromDate || undefined,
          toDate: toDate || undefined,
        },
      });
      setTestCount(response.data.testCount);
    } catch (error) {
      console.error('Failed to fetch test data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDateChange = () => {
    fetchData();
  };

  const title =
    fromDate || toDate
      ? 'Кількість проведених тестів за обраний період:'
      : 'Кількість проведених тестів за весь час:';

  return (
    <Box
      variant="grey"
      padding="xxl"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <H2 textAlign="center" marginBottom="xl">
        Статистика проведених тестів
      </H2>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        <Box
          flex="1"
          display="flex"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          <H2>{title}</H2>
          <Text variant="lg" fontWeight="bold">
            {testCount !== null ? testCount : 'Завантаження...'}
          </Text>
        </Box>

        <Box
          width="300px"
          display="flex"
          flexDirection="column"
          gap="lg"
          padding="lg"
          borderLeft="1px solid #ccc"
        >
          <Box display="flex" flexDirection="column">
            <Label>Початкова дата</Label>
            <DatePicker
              value={fromDate ?? undefined}
              onChange={(date) =>
                setFromDate(date ? date.toString().split('T')[0] : null)
              }
            />
          </Box>
          <Box display="flex" flexDirection="column">
            <Label>Кінцева дата</Label>
            <DatePicker
              value={toDate ?? undefined}
              onChange={(date) =>
                setToDate(date ? date.toString().split('T')[0] : null)
              }
            />
          </Box>
          <Button onClick={handleDateChange}>Застосувати</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
