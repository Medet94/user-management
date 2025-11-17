import { useEffect, useCallback } from 'react';
import { useUnit } from 'effector-react';
import { Stack, Button, Box, Center, Loader, Text } from '@mantine/core';
import { BluePrintIcon } from '@shared/icon';
import {
  $users,
  $isLoading,
  $hasMore,
  loadMoreUsers,
  fetchUsersFx,
} from '@features/user-list/model';

export function UsersListPage() {
  const users = useUnit($users);
  const isLoading = useUnit($isLoading);
  const hasMore = useUnit($hasMore);

  // Initial load
  useEffect(() => {
    fetchUsersFx({ limit: 10, skip: 0 });
  }, []);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (isLoading || !hasMore) return;

    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Trigger load more when user scrolls to bottom (with 100px threshold)
    if (scrollTop + windowHeight >= documentHeight - 100) {
      loadMoreUsers();
    }
  }, [isLoading, hasMore]);

  // Attach scroll listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <Stack gap="lg">
      <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button leftSection={<BluePrintIcon name="user" size={16} />}>
          Add New User
        </Button>
      </Box>

      {isLoading && users.length === 0 && (
        <Center py="xl">
          <Loader size="lg" />
        </Center>
      )}

      {users.length > 0 && (
        <Center>
          <Stack gap="md" style={{ width: '100%', maxWidth: 800 }}>
            {users.map((user) => (
              <Box
                key={user.id}
                p="md"
                style={{
                  border: '1px solid #e0e0e0',
                  borderRadius: 8,
                  backgroundColor: '#fff',
                }}
              >
                <Text fw={500}>
                  {user.firstName} {user.lastName}
                </Text>
                <Text size="sm" c="dimmed">
                  {user.email}
                </Text>
              </Box>
            ))}

            {/* Loading indicator for infinite scroll */}
            {isLoading && users.length > 0 && (
              <Center py="md">
                <Loader size="md" />
              </Center>
            )}

            {/* No more data indicator */}
            {!hasMore && users.length > 0 && (
              <Center py="md">
                <Text size="sm" c="dimmed">
                  No more users to load
                </Text>
              </Center>
            )}
          </Stack>
        </Center>
      )}
    </Stack>
  );
}
