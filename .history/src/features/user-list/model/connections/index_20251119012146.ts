import { sample } from 'effector';
import { debounce } from 'patronum';
import { fetchUsersFx, searchUsersFx } from '../effects';
import { $searchQuery, $currentSkip, $hasMore } from '../stores';
import { loadMoreUsers, setSearchQuery } from '../events';

export const searchDebounced = debounce({
  source: setSearchQuery,
  timeout: 400,
});

sample({
  clock: loadMoreUsers,
  source: { skip: $currentSkip, query: $searchQuery },
  filter: ({ query }, _clock) => $hasMore.getState() && !query.trim(),
  fn: ({ skip }) => ({ limit: 10, skip }),
  target: fetchUsersFx,
});

sample({
  clock: setSearchQuery,
  target: searchUsersFx,
});
