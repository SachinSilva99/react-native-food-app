import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {useEffect, useState} from "react";
import {FoodItem, getAllFood} from "@/service/food-service";
import {addToCart} from "@/service/cart-service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "./header";

function Menu() {
  const [food, setFood] = useState<FoodItem[]>([])
  useEffect(() => {

    getAllFood().then(value => {
      if (value.data) {
        setFood(value.data);
      }
    })
  }, []);

  async function addToCartOnClick(foodItem: FoodItem) {
    const resp = await addToCart({foodItemId: foodItem._id, quantity: 1});
    console.log(resp);
  }

  return (
    <ScrollView>
      <Header></Header>
      <ScrollView className="flex-grow-1 bg-white px-4">
        <View className="main-category w-full flex flex-row gap-3 items-center
      justify-center" style={{flex: 1}}>
          <TouchableOpacity>
            <Text className={"text-3xl"}>Pizza </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className={"text-3xl"}>Rice </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className={"text-3xl"}>Pasta </Text>
          </TouchableOpacity>
        </View>
        <View className="sub-category mt-4 w-full flex flex-row gap-3 justify-between
      " style={{flex: 1}}>
          <TouchableOpacity className={"bg-slate-300 rounded px-4"}>
            <Text className={"text-xl"}>CLASSIC </Text>
          </TouchableOpacity>
          <TouchableOpacity className={"bg-slate-300 rounded px-4"}>
            <Text className={"text-xl"}>SIGNATURE </Text>
          </TouchableOpacity>
        </View>

        <View className="food items my-4 flex  gap-3 justify-between flex-col">

          {food.map((foodItem: FoodItem) => (
            <View key={foodItem._id} className="item border-2 border-blue-200 rounded-2xl w-50px">
              <View className="  flex flex-row px-2 py-4">
                <Image
                  source={{uri: foodItem.imageUrl}}
                  style={{width: 100, height: 100}}
                />
                <View className={"left flex flex-col flex-wrap flex-1 px-2"}>
                  <Text className="text-xl">{foodItem.name}</Text>
                  <Text className="align-baseline">
                    {foodItem.description}
                  </Text>
                  <Picker className={"my-2"}
                          placeholder={"Select Pizza size"}
                    // onValueChange={(itemValue, itemIndex) =>
                    //   setSelectedLanguage(itemValue)
                    // }
                  >
                    <Picker.Item label="Large" value="Large"/>
                    <Picker.Item label="Medium" value="Medium"/>
                  </Picker>
                </View>
              </View>
              <TouchableOpacity onPress={(e) => addToCartOnClick(foodItem)}
                                className={"my-2 bg-green-500 rounded px-4 mx-2 w-28"}>
                <Text className={""}>Add to Cart Rs.{foodItem.price} </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

    </ScrollView>
  );
}

export default Menu;