import { Drawer, Avatar, Stack, Text, Group, Badge, Divider, Box, LoadingOverlay } from '@mantine/core';
import { useUnit } from 'effector-react';
import { BluePrintIcon } from '@shared';
import { $selectedUser, $isDetailsOpen, $isLoadingDetails, closeUserDetails } from '../model';

export function UserDetailsDrawer() {
  const user = useUnit($selectedUser);
  const isOpen = useUnit($isDetailsOpen);
  const isLoading = useUnit($isLoadingDetails);

  return (
    <Drawer
      opened={isOpen}
      onClose={closeUserDetails}
      position="right"
      size="lg"
      title="User Details"
      overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
    >
      <LoadingOverlay visible={isLoading} />

      {user && (
        <Stack gap="lg">
          {/* Header with Avatar */}
          <Box style={{ textAlign: 'center' }}>
            <Avatar
              src={user.image}
              size={120}
              radius="md"
              mx="auto"
              alt={`${user.firstName} ${user.lastName}`}
            />
            <Text size="xl" fw={700} mt="md">
              {user.firstName} {user.lastName}
            </Text>
            <Badge size="lg" variant="light" mt="xs">
              {user.gender}
            </Badge>
          </Box>

          <Divider />

          {/* Personal Information */}
          <Stack gap="md">
            <Text size="lg" fw={600} c="dimmed">
              Personal Information
            </Text>

            <Group gap="sm" wrap="nowrap">
              <BluePrintIcon name="calendar" size={20} />
              <Box>
                <Text size="xs" c="dimmed">Age</Text>
                <Text size="sm" fw={500}>{user.age} years old</Text>
              </Box>
            </Group>

            <Group gap="sm" wrap="nowrap">
              <BluePrintIcon name="envelope" size={20} />
              <Box style={{ flex: 1, overflow: 'hidden' }}>
                <Text size="xs" c="dimmed">Email</Text>
                <Text size="sm" fw={500} style={{ wordBreak: 'break-all' }}>
                  {user.email}
                </Text>
              </Box>
            </Group>

            <Group gap="sm" wrap="nowrap">
              <BluePrintIcon name="phone" size={20} />
              <Box>
                <Text size="xs" c="dimmed">Phone</Text>
                <Text size="sm" fw={500}>{user.phone}</Text>
              </Box>
            </Group>
          </Stack>

          {/* Address Information */}
          {user.address && (
            <>
              <Divider />
              <Stack gap="md">
                <Text size="lg" fw={600} c="dimmed">
                  Address
                </Text>

                <Group gap="sm" wrap="nowrap" align="flex-start">
                  <BluePrintIcon name="home" size={20} />
                  <Box>
                    <Text size="xs" c="dimmed">Street Address</Text>
                    <Text size="sm" fw={500}>{user.address.address}</Text>
                  </Box>
                </Group>

                <Group gap="sm" wrap="nowrap">
                  <BluePrintIcon name="map-marker" size={20} />
                  <Box>
                    <Text size="xs" c="dimmed">City</Text>
                    <Text size="sm" fw={500}>{user.address.city}</Text>
                  </Box>
                </Group>

                {user.address.state && (
                  <Group gap="sm" wrap="nowrap">
                    <BluePrintIcon name="map-marker" size={20} />
                    <Box>
                      <Text size="xs" c="dimmed">State</Text>
                      <Text size="sm" fw={500}>{user.address.state}</Text>
                    </Box>
                  </Group>
                )}

                <Group gap="sm" wrap="nowrap">
                  <BluePrintIcon name="pin" size={20} />
                  <Box>
                    <Text size="xs" c="dimmed">Postal Code</Text>
                    <Text size="sm" fw={500}>{user.address.postalCode}</Text>
                  </Box>
                </Group>

                {user.address.country && (
                  <Group gap="sm" wrap="nowrap">
                    <BluePrintIcon name="globe-network" size={20} />
                    <Box>
                      <Text size="xs" c="dimmed">Country</Text>
                      <Text size="sm" fw={500}>{user.address.country}</Text>
                    </Box>
                  </Group>
                )}
              </Stack>
            </>
          )}

          {/* Company Information */}
          {user.company && (user.company.name || user.company.title || user.company.department) && (
            <>
              <Divider />
              <Stack gap="md">
                <Text size="lg" fw={600} c="dimmed">
                  Company Information
                </Text>

                {user.company.name && (
                  <Group gap="sm" wrap="nowrap">
                    <BluePrintIcon name="briefcase" size={20} />
                    <Box>
                      <Text size="xs" c="dimmed">Company Name</Text>
                      <Text size="sm" fw={500}>{user.company.name}</Text>
                    </Box>
                  </Group>
                )}

                {user.company.title && (
                  <Group gap="sm" wrap="nowrap">
                    <BluePrintIcon name="user" size={20} />
                    <Box>
                      <Text size="xs" c="dimmed">Job Title</Text>
                      <Text size="sm" fw={500}>{user.company.title}</Text>
                    </Box>
                  </Group>
                )}

                {user.company.department && (
                  <Group gap="sm" wrap="nowrap">
                    <BluePrintIcon name="office" size={20} />
                    <Box>
                      <Text size="xs" c="dimmed">Department</Text>
                      <Text size="sm" fw={500}>{user.company.department}</Text>
                    </Box>
                  </Group>
                )}
              </Stack>
            </>
          )}
        </Stack>
      )}
    </Drawer>
  );
}
