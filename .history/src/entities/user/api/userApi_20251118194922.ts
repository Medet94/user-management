import { apiClient } from '@shared/api';
import type {
  User,
  UsersResponse,
  CreateUserDto,
  UpdateUserDto,
} from '../model/types';

export const getUsers = async (
  limit: number,
  skip: number
): Promise<UsersResponse> => {
  const response = await apiClient.get<UsersResponse>(
    `/users?limit=${limit}&skip=${skip}`
  );
  return response.data;
};

export const getUser = async (id: number): Promise<User> => {
  const response = await apiClient.get<User>(`/users/${id}`);
  return response.data;
};

export const searchUsers = async (query: string): Promise<UsersResponse> => {
  const response = await apiClient.get<UsersResponse>(
    `/users/search?q=${query}`
  );
  return response.data;
};

export const createUser = async (userData: CreateUserDto): Promise<User> => {
  const response = await apiClient.post<User>('/users/add', userData);
  return response.data;
};

export const updateUser = async (
  id: number,
  userData: UpdateUserDto
): Promise<User> => {
  const response = await apiClient.put<User>(`/users/${id}`, userData);
  return response.data;
};
