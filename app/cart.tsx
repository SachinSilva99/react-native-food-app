import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import Header from "./header";
import {useEffect, useState} from "react";
import {CartItem, getCart, removeFromCart} from "@/service/cart-service";
import {FoodItem} from "@/service/food-service";
import {Picker} from "@react-native-picker/picker";
import {placeOrder} from "@/service/order-service";
import {Constants} from "@/util/Constants";


function Cart() {
  const [cart, setCart] = useState<CartItem | null>(null);
  const loadCart = async () => {
    const res = await getCart();
    if (res.data) {
      setCart(res.data);
    }

  }
  useEffect(() => {
    loadCart().then();
  }, []);

  async function removeQtyBy1(foodItem: FoodItem) {
    const resp = await removeFromCart({quantity: 1, foodItemId: foodItem._id});
    if (resp.statusCode === Constants.SUCCESS) {
      await loadCart();
    }
  }

  async function placeOrderOnClick() {
    const resp = await placeOrder();
    console.log(resp)
    if (resp.statusCode === Constants.SUCCESS) {
      setCart(null);
    }
  }

  return (
    <ScrollView className={"bg-white"}>
      <Header></Header>
      <ScrollView className="flex-grow-1 bg-white px-4">
        <Text className={"text-xl"}>Cart</Text>

        {cart?.items.map((item: { foodItem: FoodItem, quantity: number }) => (
          <View key={item.foodItem._id} className="item border-2 border-blue-200 rounded-2xl w-50px">
            <View className="  flex flex-row px-2 py-4">
              <Image
                source={{uri: item.foodItem.imageUrl}}
                style={{width: 100, height: 100}}
              />
              <View className={"left flex flex-col flex-wrap flex-1 px-2"}>
                <Text className="text-xl">{item.foodItem.name}</Text>
                <Text className="align-baseline">
                  {item.foodItem.description}
                </Text>
              </View>
            </View>
            <Text>Qty : {item.quantity}</Text>
            <TouchableOpacity onPress={(e) => removeQtyBy1(item.foodItem)}
                              className={"my-2 bg-green-500 rounded px-4 mx-2 w-28"}>
              <Text className={""}>Remove Qty by 1</Text>
            </TouchableOpacity>
          </View>
        ))}
        <Text>total : {cart?.total}</Text>
        <TouchableOpacity onPress={(e) => placeOrderOnClick()}
                          className={"my-2 bg-green-500 rounded px-4 mx-2 w-28"}>
          <Text className={""}>Place Order</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScrollView>

  );
}

export default Cart;