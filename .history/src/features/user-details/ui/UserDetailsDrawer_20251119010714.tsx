import { Drawer, Avatar, Stack, Text, Group, Badge, Divider, Box, LoadingOverlay } from '@mantine/core';
import { useUnit } from 'effector-react';
import { BluePrintIcon } from '@shared';
import { $selectedUser, $isDetailsOpen, $isLoadingDetails, closeUserDetails } from '../model';

export function UserDetails() {
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
            {user.maidenName && (
              <Text size="sm" c="dimmed" mt="xs">
                (Maiden name: {user.maidenName})
              </Text>
            )}
            <Group gap="xs" justify="center" mt="xs">
              <Badge size="lg" variant="light">
                {user.gender}
              </Badge>
              {user.role && (
                <Badge size="lg" variant="filled" color="blue">
                  {user.role}
                </Badge>
              )}
            </Group>
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
                <Text size="sm" fw={500}>
                  {user.age} years old
                  {user.birthDate && ` (Born: ${user.birthDate})`}
                </Text>
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

            {user.username && (
              <Group gap="sm" wrap="nowrap">
                <BluePrintIcon name="user" size={20} />
                <Box>
                  <Text size="xs" c="dimmed">Username</Text>
                  <Text size="sm" fw={500}>{user.username}</Text>
                </Box>
              </Group>
            )}

            {user.bloodGroup && (
              <Group gap="sm" wrap="nowrap">
                <BluePrintIcon name="heart" size={20} />
                <Box>
                  <Text size="xs" c="dimmed">Blood Group</Text>
                  <Text size="sm" fw={500}>{user.bloodGroup}</Text>
                </Box>
              </Group>
            )}

            {(user.height || user.weight) && (
              <Group gap="sm" wrap="nowrap">
                <BluePrintIcon name="people" size={20} />
                <Box>
                  <Text size="xs" c="dimmed">Physical</Text>
                  <Text size="sm" fw={500}>
                    {user.height && `Height: ${user.height} cm`}
                    {user.height && user.weight && ' | '}
                    {user.weight && `Weight: ${user.weight} kg`}
                  </Text>
                </Box>
              </Group>
            )}

            {user.eyeColor && (
              <Group gap="sm" wrap="nowrap">
                <BluePrintIcon name="eye-open" size={20} />
                <Box>
                  <Text size="xs" c="dimmed">Eye Color</Text>
                  <Text size="sm" fw={500}>{user.eyeColor}</Text>
                </Box>
              </Group>
            )}

            {user.hair && (
              <Group gap="sm" wrap="nowrap">
                <BluePrintIcon name="style" size={20} />
                <Box>
                  <Text size="xs" c="dimmed">Hair</Text>
                  <Text size="sm" fw={500}>
                    {user.hair.color} - {user.hair.type}
                  </Text>
                </Box>
              </Group>
            )}

            {user.university && (
              <Group gap="sm" wrap="nowrap">
                <BluePrintIcon name="learning" size={20} />
                <Box>
                  <Text size="xs" c="dimmed">University</Text>
                  <Text size="sm" fw={500}>{user.university}</Text>
                </Box>
              </Group>
            )}
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

          {/* Bank Information */}
          {user.bank && (
            <>
              <Divider />
              <Stack gap="md">
                <Text size="lg" fw={600} c="dimmed">
                  Bank Information
                </Text>

                <Group gap="sm" wrap="nowrap">
                  <BluePrintIcon name="credit-card" size={20} />
                  <Box>
                    <Text size="xs" c="dimmed">Card Type</Text>
                    <Text size="sm" fw={500}>{user.bank.cardType}</Text>
                  </Box>
                </Group>

                <Group gap="sm" wrap="nowrap">
                  <BluePrintIcon name="numerical" size={20} />
                  <Box style={{ flex: 1, overflow: 'hidden' }}>
                    <Text size="xs" c="dimmed">Card Number</Text>
                    <Text size="sm" fw={500}>
                      **** **** **** {user.bank.cardNumber.slice(-4)}
                    </Text>
                  </Box>
                </Group>

                <Group gap="sm" wrap="nowrap">
                  <BluePrintIcon name="time" size={20} />
                  <Box>
                    <Text size="xs" c="dimmed">Expires</Text>
                    <Text size="sm" fw={500}>{user.bank.cardExpire}</Text>
                  </Box>
                </Group>

                <Group gap="sm" wrap="nowrap">
                  <BluePrintIcon name="dollar" size={20} />
                  <Box>
                    <Text size="xs" c="dimmed">Currency</Text>
                    <Text size="sm" fw={500}>{user.bank.currency}</Text>
                  </Box>
                </Group>

                <Group gap="sm" wrap="nowrap">
                  <BluePrintIcon name="bank-account" size={20} />
                  <Box style={{ flex: 1, overflow: 'hidden' }}>
                    <Text size="xs" c="dimmed">IBAN</Text>
                    <Text size="sm" fw={500} style={{ wordBreak: 'break-all' }}>
                      {user.bank.iban}
                    </Text>
                  </Box>
                </Group>
              </Stack>
            </>
          )}

          {/* Crypto Information */}
          {user.crypto && (
            <>
              <Divider />
              <Stack gap="md">
                <Text size="lg" fw={600} c="dimmed">
                  Crypto Wallet
                </Text>

                <Group gap="sm" wrap="nowrap">
                  <BluePrintIcon name="trending-up" size={20} />
                  <Box>
                    <Text size="xs" c="dimmed">Coin</Text>
                    <Text size="sm" fw={500}>{user.crypto.coin}</Text>
                  </Box>
                </Group>

                <Group gap="sm" wrap="nowrap">
                  <BluePrintIcon name="globe-network" size={20} />
                  <Box>
                    <Text size="xs" c="dimmed">Network</Text>
                    <Text size="sm" fw={500}>{user.crypto.network}</Text>
                  </Box>
                </Group>

                <Group gap="sm" wrap="nowrap" align="flex-start">
                  <BluePrintIcon name="key" size={20} />
                  <Box style={{ flex: 1, overflow: 'hidden' }}>
                    <Text size="xs" c="dimmed">Wallet Address</Text>
                    <Text size="sm" fw={500} style={{ wordBreak: 'break-all' }}>
                      {user.crypto.wallet}
                    </Text>
                  </Box>
                </Group>
              </Stack>
            </>
          )}
        </Stack>
      )}
    </Drawer>
  );
}
