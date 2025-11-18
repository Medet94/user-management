import { useState, useEffect } from 'react';
import { useUnit } from 'effector-react';
import { Box, TextInput, Group, Title, CloseButton } from '@mantine/core';
import { BluePrintIcon } from '@shared/icon';
import { $searchQuery, setSearchQuery } from '@features/user-list/model';
import styles from './styles.module.css';

export const Header = () => {
  const searchQuery = useUnit($searchQuery);
  const [inputValue, setInputValue] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setSearchQuery(value);
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
    <Box component="header" className={styles.header}>
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
          style={{ width: 400 }}
        />
      </Group>
    </Box>
  );
};
