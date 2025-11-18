import { createStore } from 'effector';
import { fetchUsersFx, searchUsersFx } from '../effects';
import { debounce } from 'patronum';
import {
  resetUsersList,
  setSearchQuery,
  setViewMode,
  addUserToList,
  updateUserInList,
} from '../events';

import type { User } from '@entities/user';

export const $users = createStore<User[]>([]);
export const $isLoading = createStore(false);
export const $hasMore = createStore(true);
export const $currentSkip = createStore(0);
export const $searchQuery = createStore('');
export const $total = createStore(0);
export const $viewMode = createStore<'list' | 'grid'>('list');

// Updates
$users
  .on(fetchUsersFx.doneData, (state, response) => {
    const merged = [...state, ...response.users];

    // Убираем дубли по id
    const unique = merged.filter(
      (item, index, arr) => index === arr.findIndex((u) => u.id === item.id)
    );

    return unique;
  })
  .on(searchUsersFx.doneData, (_, response) => response.users)
  .on(addUserToList, (state, user) => [user, ...state])
  .on(updateUserInList, (state, updatedUser) =>
    state.map((user) => (user.id === updatedUser.id ? updatedUser : user))
  )
  .reset(resetUsersList);

$isLoading
  .on(fetchUsersFx.pending, (_, pending) => pending)
  .on(searchUsersFx.pending, (_, pending) => pending);

$hasMore
  .on(fetchUsersFx.doneData, (_, response) => {
    return response.skip + response.limit < response.total;
  })
  .on(searchUsersFx.doneData, (_, response) => {
    // When search query is empty, we fetched first page, so check if there's more
    return response.skip + response.limit < response.total;
  });

$currentSkip
  .on(fetchUsersFx.doneData, (_, response) => response.skip + response.limit)
  .on(searchUsersFx.doneData, (_, response) => {
    // When search is cleared, we start from the loaded amount
    return response.skip + response.limit;
  })
  .reset(resetUsersList);

$searchQuery.on(setSearchQuery, (_, query) => query).reset(resetUsersList);

$total
  .on(fetchUsersFx.doneData, (_, response) => response.total)
  .on(searchUsersFx.doneData, (_, response) => response.total);

$viewMode.on(setViewMode, (_, mode) => mode);

export const debouncedSearch = debounce({
  source: setSearchQuery,
  timeout: 300,
});
