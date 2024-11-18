import { Stack } from "expo-router";
import "../global.css";


export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }}/>
      <Stack.Screen name="homeScreen"  options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false}} />
      <Stack.Screen name="accountCreationSelectScreen" options={{ headerShown: false}} />
      <Stack.Screen name="createAccount" options={{ headerShown: false}} />
      <Stack.Screen name="initialScreen" options={{ headerShown: false}} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
