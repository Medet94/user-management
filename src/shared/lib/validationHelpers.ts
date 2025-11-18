import type {
  UserFormData,
  FormErrors,
} from '../../features/user-form/model/types';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateStep1 = (formData: UserFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.firstName || formData.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  }

  if (!formData.lastName || formData.lastName.trim().length < 2) {
    errors.lastName = 'Last name must be at least 2 characters';
  }

  const age = Number(formData.age);
  if (!formData.age || isNaN(age) || age < 18 || age > 100) {
    errors.age = 'Age must be between 18 and 100';
  }

  if (!formData.gender) {
    errors.gender = 'Gender is required';
  }

  if (!formData.email || !validateEmail(formData.email)) {
    errors.email = 'Valid email is required';
  }

  if (!formData.phone || formData.phone.trim().length === 0) {
    errors.phone = 'Phone number is required';
  }

  return errors;
};

export const validateStep2 = (formData: UserFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.address || formData.address.trim().length === 0) {
    errors.address = 'Street address is required';
  }

  if (!formData.city || formData.city.trim().length === 0) {
    errors.city = 'City is required';
  }

  if (!formData.postalCode || formData.postalCode.trim().length === 0) {
    errors.postalCode = 'Postal code is required';
  } else if (!/^\d+$/.test(formData.postalCode.trim())) {
    errors.postalCode = 'Postal code must be numeric';
  }

  if (
    formData.isInternational &&
    (!formData.country || formData.country.trim().length === 0)
  ) {
    errors.country = 'Country is required for international address';
  }

  return errors;
};

export const validateStep3 = (formData: UserFormData): FormErrors => {
  const errors: FormErrors = {};

  if (formData.isCurrentlyWorking) {
    if (!formData.department || formData.department.trim().length === 0) {
      errors.department = 'Department is required when currently working';
    }
  }

  return errors;
};
