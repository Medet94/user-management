import { createStore } from 'effector';
import { fetchUserDetailsFx } from '../effects';
import { closeUserDetails } from '../events';
import type { User } from '@entities/user';

export const $selectedUser = createStore<User | null>(null);
export const $isDetailsOpen = createStore(false);
export const $isLoadingDetails = fetchUserDetailsFx.pending;

$selectedUser
  .on(fetchUserDetailsFx.doneData, (_, user) => user)
  .reset(closeUserDetails);

$isDetailsOpen
  .on(fetchUserDetailsFx.done, () => true)
  .on(closeUserDetails, () => false);
