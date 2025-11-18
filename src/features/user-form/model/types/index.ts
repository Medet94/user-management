export interface UserFormData {
  // Step 1: Personal Information
  firstName: string;
  lastName: string;
  age: number | string;
  gender: string;
  email: string;
  phone: string;

  // Step 2: Address Information
  address: string;
  city: string;
  state: string;
  postalCode: string;
  isInternational: boolean;
  country: string;

  // Step 3: Company Information
  companyName: string;
  jobTitle: string;
  isCurrentlyWorking: boolean;
  department: string;
  salary: number | string;
}

export interface FormErrors {
  [key: string]: string;
}

export type FormMode = 'create' | 'edit';

export const DEPARTMENTS = [
  'Engineering',
  'Marketing',
  'Sales',
  'HR',
  'Other',
] as const;

export const GENDERS = ['male', 'female', 'other'] as const;
