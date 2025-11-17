import { createStore, createEvent, createEffect, sample } from 'effector';
import { userApi } from '@entities/user';
import type { User } from '@entities/user';

// Events
export const loadMoreUsers = createEvent();
export const resetUsersList = createEvent();
export const setSearchQuery = createEvent<string>();

// Effects
export const fetchUsersFx = createEffect(async ({ limit, skip }: { limit: number; skip: number }) => {
  return await userApi.getUsers(limit, skip);
});

export const searchUsersFx = createEffect(async (query: string) => {
  if (!query.trim()) {
    return await userApi.getUsers(10, 0);
  }
  return await userApi.searchUsers(query);
});

// Stores
export const $users = createStore<User[]>([]);
export const $isLoading = createStore(false);
export const $hasMore = createStore(true);
export const $currentSkip = createStore(0);
export const $searchQuery = createStore('');
export const $total = createStore(0);

// Updates
$users
  .on(fetchUsersFx.doneData, (state, response) => [...state, ...response.users])
  .on(searchUsersFx.doneData, (_, response) => response.users)
  .reset(resetUsersList);

$isLoading
  .on(fetchUsersFx.pending, (_, pending) => pending)
  .on(searchUsersFx.pending, (_, pending) => pending);

$hasMore
  .on(fetchUsersFx.doneData, (_, response) => {
    return response.skip + response.limit < response.total;
  })
  .on(searchUsersFx.doneData, () => false);

$currentSkip
  .on(fetchUsersFx.doneData, (state, response) => state + response.limit)
  .on(searchUsersFx.doneData, () => 0)
  .reset(resetUsersList);

$searchQuery.on(setSearchQuery, (_, query) => query);

$total.on(fetchUsersFx.doneData, (_, response) => response.total);

// Samples
sample({
  clock: loadMoreUsers,
  source: { skip: $currentSkip, query: $searchQuery },
  filter: $hasMore,
  fn: ({ skip }) => ({ limit: 10, skip }),
  target: fetchUsersFx,
});

sample({
  clock: setSearchQuery,
  target: searchUsersFx,
});
