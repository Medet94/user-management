import { sample } from 'effector';
import { userClicked } from '../events';
import { fetchUserById } from '../effects';

sample({
  clock: userClicked,
  target: fetchUserById,
});
