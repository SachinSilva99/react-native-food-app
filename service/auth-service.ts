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

export interface SignUpRequest {
  username: string;
  email: string;
  password: string;
  address: string;
  image: string;
}


export const login = async (data: LoginRequest):Promise<StandardResponse<LoginResponse>> => {
  try {
    const response = await apiClient.post(
      `/auth/login`,
      data
    );
    return response.data;
  } catch (error:any) {
    throw error.response.data.msg;
  }
};
export const signUp = async (data: SignUpRequest):Promise<StandardResponse<any>> => {
  try {
    const response = await apiClient.post(
      `/auth/signup`,
      data
    );
    return response.data;
  } catch (error) {
    throw error.response.data.msg;
  }
};
