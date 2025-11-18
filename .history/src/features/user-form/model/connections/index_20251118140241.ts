import { sample, createEffect } from 'effector';
import { fetchUserForEditFx, updateUserFx, createUserFx } from '../effetcs';
import { loadUserForEdit, submitForm } from '../events';
import { $editUserId, $formData, $formMode } from '../stores';
import type { UserFormData } from '../types';
import { addUserToList, updateUserInList } from '@features/user-list/model';

sample({
  clock: loadUserForEdit,
  target: fetchUserForEditFx,
});

sample({
  clock: submitForm,
  source: { formData: $formData, mode: $formMode, userId: $editUserId },
  filter: ({ mode, userId }) =>
    mode === 'create' || (mode === 'edit' && userId !== null),
  fn: ({ formData, mode, userId }) => {
    if (mode === 'edit' && userId !== null) {
      return { type: 'update' as const, id: userId, formData };
    }
    return { type: 'create' as const, formData };
  },
  target: createEffect(
    async (
      data:
        | { type: 'create'; formData: UserFormData }
        | { type: 'update'; id: number; formData: UserFormData }
    ) => {
      if (data.type === 'create') {
        return await createUserFx(data.formData);
      } else {
        return await updateUserFx({ id: data.id, formData: data.formData });
      }
    }
  ),
});

sample({
  clock: createUserFx.doneData,
  target: addUserToList,
});

sample({
  clock: updateUserFx.doneData,
  target: updateUserInList,
});
