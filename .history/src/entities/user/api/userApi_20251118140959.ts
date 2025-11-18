import { apiClient } from '@shared/api';
import type {
  User,
  UsersResponse,
  CreateUser,
  UpdateUser,
} from '../model/types';

export const userApi = {
  async getUsers(limit: number, skip: number): Promise<UsersResponse> {
    const response = await apiClient.get<UsersResponse>(
      `/users?limit=${limit}&skip=${skip}`
    );

    console.log(response.data);

    return response.data;
  },

  async searchUsers(query: string): Promise<UsersResponse> {
    const response = await apiClient.get<UsersResponse>(
      `/users/search?q=${query}`
    );
    return response.data;
  },

  async getUser(id: number): Promise<User> {
    const response = await apiClient.get<User>(`/users/${id}`);

    return response.data;
  },

  async createUser(userData: CreateUser): Promise<User> {
    const response = await apiClient.post<User>('/users/add', userData);
    return response.data;
  },

  async updateUser(id: number, userData: UpdateUser): Promise<User> {
    const response = await apiClient.put<User>(`/users/${id}`, userData);
    return response.data;
  },
};
