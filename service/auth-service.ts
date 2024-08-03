import apiClient from "@/service/api-client";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User,
  accessToken: string
}
export interface User {
  username: string,
  email: string,
  password: string,
  address: string,
  image: string,
}
export interface StandardResponse<T> {
  statusCode: number;
  msg?: string;
  data?: T
  pageCount?: number
}
export const login = async (data: LoginRequest):Promise<StandardResponse<LoginResponse>> => {
  console.log(data)
  try {
    const response = await apiClient.post(
      `/auth/login`,
      data
    );
    return response.data;
  } catch (error) {
    throw error.response.data.msg;
  }
};
