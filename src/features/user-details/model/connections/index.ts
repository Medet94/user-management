import { sample } from 'effector';
import { openUserDetails } from '../events';
import { fetchUserDetailsFx } from '../effects';

sample({
  clock: openUserDetails,
  target: fetchUserDetailsFx,
});
