import React from 'react';
import {SafeAreaView, StatusBar, Text, View} from "react-native";
import {Link, useRootNavigationState} from "expo-router";
import Login from "@/app/login";

function Index() {
  return (
   <Login/>
  );
}

export default Index;