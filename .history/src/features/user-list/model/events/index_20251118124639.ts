import { createEvent } from 'effector';
import type { User } from '@entities/user';

export const loadMoreUsers = createEvent();
export const resetUsersList = createEvent();
export const setSearchQuery = createEvent<string>();
export const addUserToList = createEvent<User>();
export const updateUserInList = createEvent<User>();
export const setViewMode = createEvent<'list' | 'grid'>();
