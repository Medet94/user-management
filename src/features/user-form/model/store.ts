import { createStore, createEvent, createEffect, sample } from 'effector';
import { userApi } from '@entities/user';
import type { User, CreateUserDto, UpdateUserDto } from '@entities/user';
import type { UserFormData, FormErrors, FormMode } from './types';

// Events
export const setFormStep = createEvent<number>();
export const nextStep = createEvent();
export const prevStep = createEvent();
export const setFormData = createEvent<Partial<UserFormData>>();
export const setFormErrors = createEvent<FormErrors>();
export const resetForm = createEvent();
export const loadUserForEdit = createEvent<number>();
export const setFormMode = createEvent<FormMode>();
export const submitForm = createEvent();

// Effects
export const fetchUserForEditFx = createEffect(async (userId: number) => {
  return await userApi.getUser(userId);
});

export const createUserFx = createEffect(async (formData: UserFormData) => {
  const userData: CreateUserDto = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    age: Number(formData.age),
    gender: formData.gender,
    email: formData.email,
    phone: formData.phone,
    address: {
      address: formData.address,
      city: formData.city,
      state: formData.state,
      postalCode: formData.postalCode,
      country: formData.isInternational ? formData.country : undefined,
    },
    company: formData.isCurrentlyWorking
      ? {
          name: formData.companyName,
          title: formData.jobTitle,
          department: formData.department,
        }
      : undefined,
  };
  return await userApi.createUser(userData);
});

export const updateUserFx = createEffect(async ({ id, formData }: { id: number; formData: UserFormData }) => {
  const userData: UpdateUserDto = {
    id,
    firstName: formData.firstName,
    lastName: formData.lastName,
    age: Number(formData.age),
    gender: formData.gender,
    email: formData.email,
    phone: formData.phone,
    address: {
      address: formData.address,
      city: formData.city,
      state: formData.state,
      postalCode: formData.postalCode,
      country: formData.isInternational ? formData.country : undefined,
    },
    company: formData.isCurrentlyWorking
      ? {
          name: formData.companyName,
          title: formData.jobTitle,
          department: formData.department,
        }
      : undefined,
  };
  return await userApi.updateUser(id, userData);
});

// Initial state
const initialFormData: UserFormData = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  postalCode: '',
  isInternational: false,
  country: '',
  companyName: '',
  jobTitle: '',
  isCurrentlyWorking: false,
  department: '',
  salary: '',
};

// Stores
export const $currentStep = createStore(0);
export const $formData = createStore<UserFormData>(initialFormData);
export const $formErrors = createStore<FormErrors>({});
export const $formMode = createStore<FormMode>('create');
export const $isSubmitting = createStore(false);
export const $editUserId = createStore<number | null>(null);

// Updates
$currentStep
  .on(setFormStep, (_, step) => step)
  .on(nextStep, (step) => Math.min(step + 1, 2))
  .on(prevStep, (step) => Math.max(step - 1, 0))
  .reset(resetForm);

$formData
  .on(setFormData, (state, data) => ({ ...state, ...data }))
  .on(fetchUserForEditFx.doneData, (_, user: User) => ({
    firstName: user.firstName,
    lastName: user.lastName,
    age: user.age,
    gender: user.gender,
    email: user.email,
    phone: user.phone,
    address: user.address?.address || '',
    city: user.address?.city || '',
    state: user.address?.state || '',
    postalCode: user.address?.postalCode || '',
    isInternational: !!user.address?.country,
    country: user.address?.country || '',
    companyName: user.company?.name || '',
    jobTitle: user.company?.title || '',
    isCurrentlyWorking: !!(user.company?.name || user.company?.title),
    department: user.company?.department || '',
    salary: '',
  }))
  .reset(resetForm);

$formErrors.on(setFormErrors, (_, errors) => errors).reset(resetForm);

$formMode.on(setFormMode, (_, mode) => mode).reset(resetForm);

$isSubmitting
  .on(createUserFx.pending, (_, pending) => pending)
  .on(updateUserFx.pending, (_, pending) => pending);

$editUserId
  .on(loadUserForEdit, (_, id) => id)
  .reset(resetForm);

// Samples
sample({
  clock: loadUserForEdit,
  target: fetchUserForEditFx,
});

sample({
  clock: submitForm,
  source: { formData: $formData, mode: $formMode, userId: $editUserId },
  filter: ({ mode, userId }) => mode === 'create' || (mode === 'edit' && userId !== null),
  fn: ({ formData, mode, userId }) => {
    if (mode === 'edit' && userId !== null) {
      return { type: 'update' as const, id: userId, formData };
    }
    return { type: 'create' as const, formData };
  },
  target: createEffect(async (data: { type: 'create'; formData: UserFormData } | { type: 'update'; id: number; formData: UserFormData }) => {
    if (data.type === 'create') {
      return await createUserFx(data.formData);
    } else {
      return await updateUserFx({ id: data.id, formData: data.formData });
    }
  }),
});
