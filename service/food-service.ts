import apiClient from "@/service/api-client";
import {SignUpRequest, StandardResponse} from "@/service/auth-service";

export interface FoodItem extends Document {
  name: string,
  category: string,
  subCategory: string,
  price: number,
  description: string,
  imageUrl: string
  qty: number,
  itemStatus: string,
  _id: string,
}

export const getAllFood = async ():Promise<StandardResponse<FoodItem[]>> => {
  try {
    const response = await apiClient.get(
      `/food-item/all`
    );
    return response.data;
  } catch (error:any) {
    throw error.response.data.msg;
  }
};