import { createEffect } from 'effector';
import { createUser, getUser, updateUser } from '@entities/user';
import type { CreateUserDto, UpdateUserDto } from '@entities/user';
import type { UserFormData } from '../types';

export const fetchUserForEditFx = createEffect(async (userId: number) => {
  return await getUser(userId);
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
  return await createUser(userData);
});

export const updateUserFx = createEffect(
  async ({ id, formData }: { id: number; formData: UserFormData }) => {
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
    return await updateUser(id, userData);
  }
);
