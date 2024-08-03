import React from 'react';
import {SafeAreaView, StatusBar, Text, View} from "react-native";
import {Link, useRootNavigationState} from "expo-router";
import Login from "@/app/login";
import SignUp from "@/app/sign-up";
import Menu from "@/app/menu";

function Index() {
  return (
   // <Login/>
   //  <SignUp></SignUp>
    <Menu></Menu>
  );
}

export default Index;