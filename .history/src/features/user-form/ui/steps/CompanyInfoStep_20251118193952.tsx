import { TextInput, NumberInput, Select, Stack, Checkbox, Divider, Text, Group } from '@mantine/core';
import { useUnit } from 'effector-react';
import { $formData, $formErrors, setFormData, setFormErrors, DEPARTMENTS } from '../../model';

export function CompanyInfoStep() {
  const formData = useUnit($formData);
  const formErrors = useUnit($formErrors);

  const handleChange = (field: string, value: any) => {
    setFormData({ [field]: value });

    // Validate on change
    const newErrors = { ...formErrors };

    if (field === 'isCurrentlyWorking') {
      // When toggling currently working, validate department field
      if (value && (!formData.department || formData.department.trim().length === 0)) {
        newErrors.department = 'Department is required when currently working';
      } else if (!value) {
        delete newErrors.department;
      }
    }

    if (field === 'department') {
      if (formData.isCurrentlyWorking && (!value || value.trim().length === 0)) {
        newErrors.department = 'Department is required when currently working';
      } else {
        delete newErrors.department;
      }
    }

    setFormErrors(newErrors);
  };

  return (
    <Stack gap="md" mt="md">
      <TextInput
        label="Company Name"
        placeholder="Enter company name"
        value={formData.companyName}
        onChange={(e) => handleChange('companyName', e.target.value)}
      />

      <TextInput
        label="Job Title"
        placeholder="Enter job title"
        value={formData.jobTitle}
        onChange={(e) => handleChange('jobTitle', e.target.value)}
      />

      <Checkbox
        label="Currently Working?"
        checked={formData.isCurrentlyWorking}
        onChange={(e) => handleChange('isCurrentlyWorking', e.target.checked)}
      />

      {formData.isCurrentlyWorking && (
        <>
          <Select
            label="Department"
            placeholder="Select department"
            required
            data={DEPARTMENTS.map((dept) => ({ value: dept, label: dept }))}
            value={formData.department}
            onChange={(value) => handleChange('department', value || '')}
            error={formErrors.department}
          />

          <NumberInput
            label="Salary"
            placeholder="Enter salary"
            min={0}
            value={formData.salary === '' ? undefined : Number(formData.salary)}
            onChange={(value) => handleChange('salary', value || '')}
          />
        </>
      )}

      <Divider my="md" />

      {/* Summary Section */}
      <Text size="lg" fw={600}>
        Summary
      </Text>

      <Stack gap="xs">
        <Group>
          <Text fw={500} w={120}>Name:</Text>
          <Text>{formData.firstName} {formData.lastName}</Text>
        </Group>
        <Group>
          <Text fw={500} w={120}>Age:</Text>
          <Text>{formData.age}</Text>
        </Group>
        <Group>
          <Text fw={500} w={120}>Gender:</Text>
          <Text>{formData.gender}</Text>
        </Group>
        <Group>
          <Text fw={500} w={120}>Email:</Text>
          <Text>{formData.email}</Text>
        </Group>
        <Group>
          <Text fw={500} w={120}>Phone:</Text>
          <Text>{formData.phone}</Text>
        </Group>
        <Group>
          <Text fw={500} w={120}>Address:</Text>
          <Text>{formData.address}, {formData.city}</Text>
        </Group>
        {formData.isInternational && (
          <Group>
            <Text fw={500} w={120}>Country:</Text>
            <Text>{formData.country}</Text>
          </Group>
        )}
        {formData.companyName && (
          <Group>
            <Text fw={500} w={120}>Company:</Text>
            <Text>{formData.companyName}</Text>
          </Group>
        )}
        {formData.jobTitle && (
          <Group>
            <Text fw={500} w={120}>Job Title:</Text>
            <Text>{formData.jobTitle}</Text>
          </Group>
        )}
      </Stack>
    </Stack>
  );
}
