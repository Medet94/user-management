import { useState, useEffect, useCallback } from 'react';
import { useUnit } from 'effector-react';
import { Box, TextInput, Group, Title, CloseButton } from '@mantine/core';
import { BluePrintIcon } from '@shared/icon';
import { debounce } from '@shared/lib';
import { $searchQuery, setSearchQuery } from '@features/user-list/model';

export const Header = () => {
  const [searchQuery, searchQueryChanged] = useUnit([
    $searchQuery,
    setSearchQuery,
  ]);
  const [inputValue, setInputValue] = useState('');

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchQuery(value);
    }, 300),
    []
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    searchQueryChanged(value);
    // debouncedSearch(value);
  };

  const handleClearSearch = () => {
    setInputValue('');
    setSearchQuery('');
  };

  useEffect(() => {
    if (searchQuery === '' && inputValue !== '') {
      setInputValue('');
    }
  }, [searchQuery]);

  return (
    <Box
      component="header"
      style={{
        borderBottom: '1px solid #e0e0e0',
        backgroundColor: '#fff',
        padding: '16px 24px',
      }}
    >
      <Group justify="space-between" align="center">
        <Title order={2} size="h3">
          User Management
        </Title>

        <TextInput
          placeholder="Search users..."
          leftSection={<BluePrintIcon name="search" size={16} />}
          rightSection={
            inputValue ? (
              <CloseButton onClick={handleClearSearch} size="sm" />
            ) : null
          }
          value={inputValue}
          onChange={handleSearchChange}
          style={{ width: 300 }}
        />
      </Group>
    </Box>
  );
};
