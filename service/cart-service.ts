import apiClient from "@/service/api-client";
import {StandardResponse, User} from "@/service/auth-service";
import {FoodItem} from "@/service/food-service";

export interface AddToCartRequest {
  foodItemId: string,
  quantity: number
}
export interface RemoveFromCartRequest {
  foodItemId: string,
  quantity: number
}
export interface CartItem extends Document {
  user: User;
  items: {
    foodItem: FoodItem;
    quantity: number;
  }[];
  total: number;
}

export const addToCart = async (data: AddToCartRequest): Promise<StandardResponse<any>> => {
  try {
    const response = await apiClient.post(
      `/cart/add`,
      data
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data.msg;
  }
};
export const removeFromCart = async (data: RemoveFromCartRequest): Promise<StandardResponse<any>> => {
  try {
    const response = await apiClient.post(
      `/cart/remove`,
      data
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data.msg;
  }
};
export const getCart = async (): Promise<StandardResponse<CartItem>> => {
  try {
    const response = await apiClient.get(`/cart`);
    return response.data;
  } catch (error: any) {
    console.log(error)
    return error.response.data.msg;
  }
};