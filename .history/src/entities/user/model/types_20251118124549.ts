export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  email: string;
  phone: string;
  image?: string;
  address?: {
    address: string;
    city: string;
    state?: string;
    postalCode: string;
    country?: string;
  };
  company?: {
    name?: string;
    title?: string;
    department?: string;
  };
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  address: {
    address: string;
    city: string;
    state?: string;
    postalCode: string;
    country?: string;
  };
  company?: {
    name?: string;
    title?: string;
    department?: string;
  };
}

export interface UpdateUserDto extends CreateUserDto {
  id: number;
}
