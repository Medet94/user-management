import { TextInput, Stack, Checkbox } from '@mantine/core';
import { useUnit } from 'effector-react';
import { $formData, $formErrors, setFormData, setFormErrors } from '../../model';

export function AddressInfoStep() {
  const formData = useUnit($formData);
  const formErrors = useUnit($formErrors);

  const handleChange = (field: string, value: any) => {
    setFormData({ [field]: value });

    // Validate on change
    const newErrors = { ...formErrors };

    if (field === 'address') {
      if (!value || value.trim().length === 0) {
        newErrors.address = 'Street address is required';
      } else {
        delete newErrors.address;
      }
    }

    if (field === 'city') {
      if (!value || value.trim().length === 0) {
        newErrors.city = 'City is required';
      } else {
        delete newErrors.city;
      }
    }

    if (field === 'postalCode') {
      if (!value || value.trim().length === 0) {
        newErrors.postalCode = 'Postal code is required';
      } else if (!/^\d+$/.test(value.trim())) {
        newErrors.postalCode = 'Postal code must be numeric';
      } else {
        delete newErrors.postalCode;
      }
    }

    if (field === 'isInternational') {
      // When toggling international, validate country field
      if (value && (!formData.country || formData.country.trim().length === 0)) {
        newErrors.country = 'Country is required for international address';
      } else if (!value) {
        delete newErrors.country;
      }
    }

    if (field === 'country') {
      if (formData.isInternational && (!value || value.trim().length === 0)) {
        newErrors.country = 'Country is required for international address';
      } else {
        delete newErrors.country;
      }
    }

    setFormErrors(newErrors);
  };

  return (
    <Stack gap="md" mt="md">
      <TextInput
        label="Street Address"
        placeholder="Enter street address"
        required
        value={formData.address}
        onChange={(e) => handleChange('address', e.target.value)}
        error={formErrors.address}
      />

      <TextInput
        label="City"
        placeholder="Enter city"
        required
        value={formData.city}
        onChange={(e) => handleChange('city', e.target.value)}
        error={formErrors.city}
      />

      <TextInput
        label="State/Province"
        placeholder="Enter state or province"
        value={formData.state}
        onChange={(e) => handleChange('state', e.target.value)}
      />

      <TextInput
        label="Postal Code"
        placeholder="Enter postal code"
        required
        value={formData.postalCode}
        onChange={(e) => handleChange('postalCode', e.target.value)}
        error={formErrors.postalCode}
      />

      <Checkbox
        label="International Address?"
        checked={formData.isInternational}
        onChange={(e) => handleChange('isInternational', e.target.checked)}
      />

      {formData.isInternational && (
        <TextInput
          label="Country"
          placeholder="Enter country"
          required
          value={formData.country}
          onChange={(e) => handleChange('country', e.target.value)}
          error={formErrors.country}
        />
      )}
    </Stack>
  );
}
