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
      backgroundColor="#f5f7fa"
    >
      <H2 textAlign="center" marginBottom="xl" color="#333">
        Статистика проведених тестів
      </H2>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        backgroundColor="#fff"
        borderRadius="8px"
        boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
        padding="xxl"
        width="90%"
        maxWidth="800px"
      >
        <Text textAlign="center" variant="lg" marginBottom="xl" color="#666">
          {title}
        </Text>

        <Text variant="xl" fontWeight="bold" color="#007bff">
          {testCount !== null ? testCount : 'Завантаження...'}
        </Text>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          marginTop="xl"
          padding="lg"
          borderRadius="8px"
          border="1px solid #e0e0e0"
        >
          <Box display="flex" flexDirection="column" width="45%">
            <Label color="#555">Початкова дата</Label>
            <DatePicker
              value={fromDate ?? undefined}
              onChange={(date) =>
                setFromDate(date ? date.toString().split('T')[0] : null)
              }
            />
          </Box>
          <Box display="flex" flexDirection="column" width="45%">
            <Label color="#555">Кінцева дата</Label>
            <DatePicker
              value={toDate ?? undefined}
              onChange={(date) =>
                setToDate(date ? date.toString().split('T')[0] : null)
              }
            />
          </Box>
        </Box>

        <Button
          onClick={handleDateChange}
          marginTop="xl"
          backgroundColor="#007bff"
          color="#fff"
          borderRadius="8px"
          hoverColor="#0056b3"
        >
          Застосувати
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;
