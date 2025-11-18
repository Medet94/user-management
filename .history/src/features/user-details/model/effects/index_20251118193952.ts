import { createEffect } from 'effector';
import { userApi } from '@entities/user';
import type { User } from '@entities/user';

export const fetchUserDetailsFx = createEffect(async (userId: number): Promise<User> => {
  return await userApi.getUser(userId);
});
