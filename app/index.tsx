import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingOne from "./onboardingOne";

const Stack = createStackNavigator();

export default function Index() {
  return (
    <OnboardingOne />
  );
}