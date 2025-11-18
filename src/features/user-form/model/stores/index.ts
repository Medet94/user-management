import { createStore } from 'effector';

import type { User } from '@entities/user';
import type { UserFormData, FormErrors, FormMode } from '../types';

import {
  resetForm,
  setFormStep,
  nextStep,
  prevStep,
  setFormData,
  setFormErrors,
  setFormMode,
  openModal,
  closeModal,
  loadUserForEdit,
} from '../events';
import { fetchUserForEditFx, createUserFx, updateUserFx } from '../effetcs';

import { validateStep1, validateStep2, validateStep3 } from '@shared/lib';

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
export const $isModalOpen = createStore(false);

// Computed stores for validation
export const $isStep1Valid = $formData.map((data) => {
  const errors = validateStep1(data);
  return Object.keys(errors).length === 0;
});

export const $isStep2Valid = $formData.map((data) => {
  const errors = validateStep2(data);
  return Object.keys(errors).length === 0;
});

export const $isStep3Valid = $formData.map((data) => {
  const errors = validateStep3(data);
  return Object.keys(errors).length === 0;
});

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

$editUserId.on(loadUserForEdit, (_, id) => id).reset(resetForm);

$isModalOpen
  .on(openModal, () => true)
  .on(closeModal, () => false)
  .reset(resetForm);
