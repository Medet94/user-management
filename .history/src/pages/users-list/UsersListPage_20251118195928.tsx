import { useEffect, useCallback } from 'react';
import { useUnit } from 'effector-react';
import {
  Stack,
  Button,
  Box,
  Center,
  Loader,
  Text,
  Group,
  Avatar,
  Card,
  ActionIcon,
  SimpleGrid,
} from '@mantine/core';
import { BluePrintIcon, HighlightText } from '@shared';
import {
  $users,
  $isLoading,
  $hasMore,
  $searchQuery,
  $viewMode,
  loadMoreUsers,
  fetchUsersFx,
  setViewMode,
} from '@features/user-list/model';
import {
  setFormMode,
  loadUserForEdit,
  openModal,
} from '@features/user-form/model';
import { UserDetailsDrawer, openUserDetails } from '@features/user-details';

import styles from './styles.module.css';

export const UsersListPage = () => {
  const users = useUnit($users);
  const isLoading = useUnit($isLoading);
  const hasMore = useUnit($hasMore);
  const searchQuery = useUnit($searchQuery);
  const viewMode = useUnit($viewMode);

  const handleOpenModal = () => {
    setFormMode('create');
    openModal();
  };

  const handleEditUser = (userId: number, event?: React.MouseEvent) => {
    event?.stopPropagation();
    setFormMode('edit');
    loadUserForEdit(userId);
    openModal();
  };

  const handleViewUser = (userId: number) => {
    openUserDetails(userId);
  };

  useEffect(() => {
    fetchUsersFx({ limit: 10, skip: 0 });
  }, []);

  const handleScroll = useCallback(() => {
    if (isLoading || !hasMore) return;

    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight - 100) {
      loadMoreUsers();
    }
  }, [isLoading, hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <Stack gap="lg">
      <UserDetailsDrawer />
      <Box style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
        <Group gap="xs">
          <ActionIcon
            variant={viewMode === 'list' ? 'filled' : 'default'}
            onClick={() => setViewMode('list')}
            size="lg"
          >
            <BluePrintIcon name="list" size={18} />
          </ActionIcon>
          <ActionIcon
            variant={viewMode === 'grid' ? 'filled' : 'default'}
            onClick={() => setViewMode('grid')}
            size="lg"
          >
            <BluePrintIcon name="grid" size={18} />
          </ActionIcon>
        </Group>
        <Button
          leftSection={<BluePrintIcon name="user" size={16} />}
          onClick={handleOpenModal}
        >
          Add New User
        </Button>
      </Box>

      {isLoading && users.length === 0 && (
        <Center py="xl">
          <Loader size="lg" />
        </Center>
      )}

      {!isLoading && users.length === 0 && searchQuery && (
        <Center py="xl">
          <Stack align="center" gap="sm">
            <BluePrintIcon name="search" size={48} color="#ccc" />
            <Text size="lg" fw={500} c="dimmed">
              No results found
            </Text>
            <Text size="sm" c="dimmed">
              Try adjusting your search terms
            </Text>
          </Stack>
        </Center>
      )}

      {users.length > 0 && viewMode === 'list' && (
        <Center>
          <Stack gap="md" style={{ width: '100%', maxWidth: 800 }}>
            {users.map((user) => (
              <Card
                key={user.id}
                className={styles.userCard}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                style={{ cursor: 'pointer' }}
                onClick={() => handleViewUser(user.id)}
              >
                <Group wrap="nowrap" align="flex-start">
                  <Avatar
                    src={user.image}
                    size={80}
                    radius="md"
                    alt={`${user.firstName} ${user.lastName}`}
                  />

                  <Box style={{ flex: 1 }}>
                    <Text fw={600} size="lg">
                      <HighlightText
                        text={`${user.firstName} ${user.lastName}`}
                        highlight={searchQuery}
                      />
                    </Text>

                    <Stack gap="xs" mt="xs">
                      <Group gap="xs">
                        <BluePrintIcon name="envelope" size={14} />
                        <Text size="sm" c="dimmed">
                          {user.email}
                        </Text>
                      </Group>

                      <Group gap="xs">
                        <BluePrintIcon name="phone" size={14} />
                        <Text size="sm" c="dimmed">
                          {user.phone}
                        </Text>
                      </Group>

                      <Group gap="xs">
                        <BluePrintIcon name="calendar" size={14} />
                        <Text size="sm" c="dimmed">
                          {user.age} years old
                        </Text>
                      </Group>
                    </Stack>
                  </Box>

                  <Button
                    variant="light"
                    leftSection={<BluePrintIcon name="edit" size={16} />}
                    onClick={(e) => handleEditUser(user.id, e)}
                  >
                    Edit
                  </Button>
                </Group>
              </Card>
            ))}

            {isLoading && users.length > 0 && (
              <Center py="md">
                <Loader size="md" />
              </Center>
            )}

            {!hasMore && users.length > 0 && !searchQuery && (
              <Center py="md">
                <Text size="sm" c="dimmed">
                  No more users to load
                </Text>
              </Center>
            )}
          </Stack>
        </Center>
      )}

      {users.length > 0 && viewMode === 'grid' && (
        <Center>
          <Box style={{ width: '100%', maxWidth: 1200 }}>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
              {users.map((user) => (
                <Card
                  key={user.id}
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleViewUser(user.id)}
                >
                  <Stack gap="md" align="center">
                    <Avatar
                      src={user.image}
                      size={120}
                      radius="md"
                      alt={`${user.firstName} ${user.lastName}`}
                    />

                    <Box style={{ textAlign: 'center', width: '100%' }}>
                      <Text fw={600} size="lg">
                        <HighlightText
                          text={`${user.firstName} ${user.lastName}`}
                          highlight={searchQuery}
                        />
                      </Text>

                      <Stack gap="xs" mt="md">
                        <Group gap="xs" justify="center">
                          <BluePrintIcon name="envelope" size={14} />
                          <Text
                            size="sm"
                            c="dimmed"
                            style={{ wordBreak: 'break-all' }}
                          >
                            {user.email}
                          </Text>
                        </Group>

                        <Group gap="xs" justify="center">
                          <BluePrintIcon name="phone" size={14} />
                          <Text size="sm" c="dimmed">
                            {user.phone}
                          </Text>
                        </Group>

                        <Group gap="xs" justify="center">
                          <BluePrintIcon name="calendar" size={14} />
                          <Text size="sm" c="dimmed">
                            {user.age} years old
                          </Text>
                        </Group>
                      </Stack>
                    </Box>

                    <Button
                      variant="light"
                      fullWidth
                      leftSection={<BluePrintIcon name="edit" size={16} />}
                      onClick={(e) => handleEditUser(user.id, e)}
                    >
                      Edit
                    </Button>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>

            {isLoading && users.length > 0 && (
              <Center py="md" mt="lg">
                <Loader size="md" />
              </Center>
            )}

            {!hasMore && users.length > 0 && !searchQuery && (
              <Center py="md" mt="lg">
                <Text size="sm" c="dimmed">
                  No more users to load
                </Text>
              </Center>
            )}
          </Box>
        </Center>
      )}
    </Stack>
  );
};
