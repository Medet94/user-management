import { TextInput, NumberInput, Select, Stack } from '@mantine/core';
import { useUnit } from 'effector-react';
import {
  $formData,
  $formErrors,
  setFormData,
  setFormErrors,
} from '../../model';

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export function PersonalInfoStep() {
  const formData = useUnit($formData);
  const formErrors = useUnit($formErrors);

  const handleChange = (field: string, value: any) => {
    setFormData({ [field]: value });

    // Validate on change
    const newErrors = { ...formErrors };

    if (field === 'firstName') {
      if (!value || value.trim().length < 2) {
        newErrors.firstName = 'First name must be at least 2 characters';
      } else {
        delete newErrors.firstName;
      }
    }

    if (field === 'lastName') {
      if (!value || value.trim().length < 2) {
        newErrors.lastName = 'Last name must be at least 2 characters';
      } else {
        delete newErrors.lastName;
      }
    }

    if (field === 'age') {
      const age = Number(value);
      if (!value || isNaN(age) || age < 18 || age > 100) {
        newErrors.age = 'Age must be between 18 and 100';
      } else {
        delete newErrors.age;
      }
    }

    if (field === 'gender') {
      if (!value) {
        newErrors.gender = 'Gender is required';
      } else {
        delete newErrors.gender;
      }
    }

    if (field === 'email') {
      if (!value || !validateEmail(value)) {
        newErrors.email = 'Valid email is required';
      } else {
        delete newErrors.email;
      }
    }

    if (field === 'phone') {
      if (!value || value.trim().length === 0) {
        newErrors.phone = 'Phone number is required';
      } else {
        delete newErrors.phone;
      }
    }

    setFormErrors(newErrors);
  };

  return (
    <Stack gap="md" mt="md">
      <TextInput
        label="First Name"
        placeholder="Enter first name"
        required
        value={formData.firstName}
        onChange={(e) => handleChange('firstName', e.target.value)}
        error={formErrors.firstName}
      />

      <TextInput
        label="Last Name"
        placeholder="Enter last name"
        required
        value={formData.lastName}
        onChange={(e) => handleChange('lastName', e.target.value)}
        error={formErrors.lastName}
      />

      <NumberInput
        label="Age"
        placeholder="Enter age"
        required
        min={18}
        max={100}
        value={formData.age === '' ? undefined : Number(formData.age)}
        onChange={(value) => handleChange('age', value || '')}
        error={formErrors.age}
      />

      <Select
        label="Gender"
        placeholder="Select gender"
        required
        data={[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'other', label: 'Other' },
        ]}
        value={formData.gender}
        onChange={(value) => handleChange('gender', value || '')}
        error={formErrors.gender}
      />

      <TextInput
        label="Email"
        placeholder="Enter email"
        required
        type="email"
        value={formData.email}
        onChange={(e) => handleChange('email', e.target.value)}
        error={formErrors.email}
      />

      <TextInput
        label="Phone"
        placeholder="Enter phone number"
        required
        value={formData.phone}
        onChange={(e) => handleChange('phone', e.target.value)}
        error={formErrors.phone}
      />
    </Stack>
  );
}
