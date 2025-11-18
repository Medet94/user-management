import { createEffect } from 'effector';
import { getUserById } from '@shared/config/userApi';

export const fetchUserById = createEffect(async (id: number) => {
  const response = await getUserById(id);

  return response;
});
