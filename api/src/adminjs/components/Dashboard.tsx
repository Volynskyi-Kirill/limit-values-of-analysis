// @ts-nocheck

import React, { useEffect, useState } from 'react';
import { ApiClient } from 'adminjs';
import { Box, H2, Button, Text, Label } from '@adminjs/design-system';

const api = new ApiClient();

const Dashboard: React.FC = () => {
  const [testCount, setTestCount] = useState<number | null>(null);
  const [fromDate, setFromDate] = useState<string | null>(null);
  const [toDate, setToDate] = useState<string | null>(null);

  const fetchData = async (reset?: boolean) => {
    const params = {
      fromDate: reset ? undefined : fromDate || undefined,
      toDate: reset ? undefined : toDate || undefined,
    };
    try {
      const response: any = await api.getDashboard({
        params,
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

  const handleResetFilters = async () => {
    setFromDate(null);
    setToDate(null);
    await fetchData(true);
  };

  const title =
    fromDate && toDate
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

        <Text textAlign="center" variant="lg" marginTop="xl" color="#666">
          Обрати період
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
            <input
              type="date"
              value={fromDate ?? ''}
              onChange={(e) => setFromDate(e.target.value || null)}
              style={{
                padding: '8px',
                fontSize: '16px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
          </Box>
          <Box display="flex" flexDirection="column" width="45%">
            <Label color="#555">Кінцева дата</Label>
            <input
              type="date"
              value={toDate ?? ''}
              onChange={(e) => setToDate(e.target.value || null)}
              style={{
                padding: '8px',
                fontSize: '16px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
          </Box>
        </Box>

        <Button onClick={handleDateChange} marginTop="xl" variant="primary">
          Застосувати
        </Button>
        <Button onClick={handleResetFilters} marginTop="xl" variant="danger">
          Скинути
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;
