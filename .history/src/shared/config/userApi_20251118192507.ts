import { apiClient } from '@shared/api';
import type {
  User,
  UsersResponse,
  CreateUser,
  UpdateUser,
} from '../model/types';

export const userApi = {
  async updateUser(id: number, userData: UpdateUser): Promise<User> {
    const response = await apiClient.put<User>(`/users/${id}`, userData);
    return response.data;
  },
};

// ============================================
// CRUD Endpoints
// ============================================

export const getUsers = async () => {
  const response = await apiClient.get('/users');
  return response.data;
};

export const getUserById = async (id: number) => {
  const response = await apiClient.get<User>(`/users/${id}`);

  return response.data;
};

export const createUser = async (userData: CreateUser): Promise<User> => {
  const response = await apiClient.post<User>('/users/add', userData);
  return response.data;
};

export const searchUsers = async (query: string): Promise<UsersResponse> => {
  const response = await apiClient.get<UsersResponse>(
    `/users/search?q=${query}`
  );
  return response.data;
};
