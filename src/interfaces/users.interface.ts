export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;

}

export interface UserCreate {
  name: string;
  email: string;
  password: string;
  role: string;
}
export interface UserRepository {
  create(user: UserCreate): Promise<UserResponse>;
  findByEmail(email: string): Promise<UserResponse | null>;
  findAll(): Promise<UserResponse[]>;
  currentUser(userId: string): Promise<UserResponse>;
  delete(userId: string): Promise<void>;
}