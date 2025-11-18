import { createEvent } from 'effector';
import type { UserFormData, FormErrors, FormMode } from '../types';

export const setFormStep = createEvent<number>();
export const nextStep = createEvent();
export const prevStep = createEvent();
export const setFormData = createEvent<Partial<UserFormData>>();
export const setFormErrors = createEvent<FormErrors>();
export const resetForm = createEvent();
export const loadUserForEdit = createEvent<number>();
export const setFormMode = createEvent<FormMode>();
export const submitForm = createEvent();
export const openModal = createEvent();
export const closeModal = createEvent();
