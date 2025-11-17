import { Box, TextInput, Group, Title } from '@mantine/core';
import { BluePrintIcon } from '@shared/icon';

export function Header() {
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
          style={{ width: 300 }}
        />
      </Group>
    </Box>
  );
}
