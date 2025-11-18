import { createEffect } from 'effector';
import { getUser } from '@entities/user';
import type { User } from '@entities/user';

export const fetchUserDetailsFx = createEffect(
  async (userId: number): Promise<User> => {
    return await getUser(userId);
  }
);
