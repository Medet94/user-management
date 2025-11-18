import { createEffect } from 'effector';
import { getUser } from '@entities/user';
import type { User } from '@entities/user';

export const fetchUserDetailsFx = createEffect(
  async (userId: number): Promise<User> => {
    const response = await getUser(userId);
    return response;
  }
);
