import {StandardResponse} from "@/service/auth-service";
import apiClient from "@/service/api-client";
import {FoodItem} from "@/service/food-service";


export interface Order {
  _id: string;
  items: { foodItem: FoodItem, quantity: number }[],
  total: number;
  status: string,
  createdAt: Date
}
export const placeOrder = async (): Promise<StandardResponse<any>> => {
  try {
    const response = await apiClient.post(
      `/order`
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data.msg;
  }

};export const getOrders = async (): Promise<StandardResponse<Order[]>> => {
  try {
    const response = await apiClient.get(
      `/order`
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data.msg;
  }
};