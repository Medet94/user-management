import { Modal, Stepper, Button, Group } from '@mantine/core';
import { useUnit } from 'effector-react';
import {
  $currentStep,
  $formMode,
  $isModalOpen,
  $formData,
  $isStep1Valid,
  $isStep2Valid,
  $isStep3Valid,
  nextStep,
  prevStep,
  resetForm,
  submitForm,
  closeModal,
  setFormErrors,
} from '../model';

import { validateStep1, validateStep2, validateStep3 } from '@shared/lib';

import { PersonalInfoStep } from './steps/PersonalInfoStep';
import { AddressInfoStep } from './steps/AddressInfoStep';
import { CompanyInfoStep } from './steps/CompanyInfoStep';

export function UserFormModal() {
  const currentStep = useUnit($currentStep);
  const formMode = useUnit($formMode);
  const isModalOpen = useUnit($isModalOpen);
  const formData = useUnit($formData);
  const isStep1Valid = useUnit($isStep1Valid);
  const isStep2Valid = useUnit($isStep2Valid);
  const isStep3Valid = useUnit($isStep3Valid);

  const handleClose = () => {
    resetForm();
    closeModal();
  };

  const handleNext = () => {
    let errors = {};
    if (currentStep === 0) {
      errors = validateStep1(formData);
    } else if (currentStep === 1) {
      errors = validateStep2(formData);
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    nextStep();
  };

  const handleSubmit = () => {
    const errors = validateStep3(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    submitForm();
    // Note: In real app, we'd wait for success before closing
    handleClose();
  };

  return (
    <Modal
      opened={isModalOpen}
      onClose={handleClose}
      title={formMode === 'create' ? 'Add New User' : 'Edit User'}
      size="xl"
      centered
      overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      closeOnClickOutside={false}
    >
      <Stepper active={currentStep}>
        <Stepper.Step label="Personal Info" description="Basic information">
          <PersonalInfoStep />
        </Stepper.Step>

        <Stepper.Step label="Address" description="Location details">
          <AddressInfoStep />
        </Stepper.Step>

        <Stepper.Step label="Company" description="Work information">
          <CompanyInfoStep />
        </Stepper.Step>
      </Stepper>

      <Group justify="space-between" mt="xl">
        {currentStep > 0 && (
          <Button variant="default" onClick={() => prevStep()}>
            Back
          </Button>
        )}
        {currentStep === 0 && <div />}

        {currentStep < 2 && (
          <Button
            onClick={handleNext}
            disabled={
              (currentStep === 0 && !isStep1Valid) ||
              (currentStep === 1 && !isStep2Valid)
            }
          >
            Next
          </Button>
        )}

        {currentStep === 2 && (
          <Button onClick={handleSubmit} disabled={!isStep3Valid}>
            Submit
          </Button>
        )}
      </Group>
    </Modal>
  );
}
