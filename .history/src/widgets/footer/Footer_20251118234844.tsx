import { Box, Text, Group } from '@mantine/core';
import styles from './styles.module.css';

export function Footer() {
  return (
    <Box component="footer" className={styles.footer}>
      <Group justify="space-between" align="center">
        <Text size="sm" c="dimmed">
          © 2025 User Management Dashboard
        </Text>
        <Text size="sm" c="dimmed">
          Powered by React + Effector + Mantine
        </Text>
      </Group>
    </Box>
  );
}
