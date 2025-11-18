import { createStore } from 'effector';
import { User } from '@shared/model/types';

export const $drawerOpen = createStore<boolean>(false);
export const $user = createStore<User | null>(null);
