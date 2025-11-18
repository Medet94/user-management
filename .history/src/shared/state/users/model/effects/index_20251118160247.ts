import { createEffect } from 'effector';
import { userApi } from '@shared/config/userApi';

export const fetchUsersFx = createEffect(
  async ({ limit, skip }: { limit: number; skip: number }) => {
    const response = await userApi.getUsers(limit, skip);

    return response;
  }
);

export const searchUsersFx = createEffect(async (query: string) => {
  if (!query.trim()) {
    return await userApi.getUsers(10, 0);
  }

  const response = await userApi.searchUsers(query);

  const filteredUsers = response.users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const queryLower = query.toLowerCase();
    return fullName.includes(queryLower);
  });

  return {
    ...response,
    users: filteredUsers,
    total: filteredUsers.length,
  };
});
