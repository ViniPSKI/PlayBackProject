import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./homeScreen";

const Stack = createStackNavigator();

export default function Index() {
  return (
    <HomeScreen />
  );
}