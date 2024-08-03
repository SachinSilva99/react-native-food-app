import React from 'react';
import {Image, Text, TouchableOpacity, View} from "react-native";
import {Link, router} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Header() {
  async function logoutOnPress() {
    await AsyncStorage.clear();
    router.replace('/login');
  }
  return (
    <View>
      <View className="main-category w-full flex flex-row gap-3 items-center bg-slate-500
      justify-center" style={{flex: 1}}>
        <TouchableOpacity>
          <Link href={"/menu"}>
            <Text className={"text-xl font-bold text-sky-100"}>Menu </Text>
          </Link>
        </TouchableOpacity>

        <TouchableOpacity>
          <Link href={"/cart"}>
            <Text className={"text-xl font-bold text-sky-100"}>Cart </Text>
          </Link>
        </TouchableOpacity>

        <TouchableOpacity>
          <Link href={"/order"}>
            <Text className={"text-xl font-bold text-sky-100"}>Orders </Text>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity  onPress={logoutOnPress}>
          <Link href={"/login"}>
            <Text className={""}>Logout </Text>

          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Header;