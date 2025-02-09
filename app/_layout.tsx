import { Stack } from "expo-router";
import "../global.css";
import { AuthProvider } from "./contexts/auth/AuthProvider";


export default function RootLayout() {
  return (
    <AuthProvider>
      < Stack>
          <Stack.Screen name="onboardingOne" options={{ headerShown: false }}/>
          <Stack.Screen name="index" options={{ headerShown: false }}/>
          <Stack.Screen name="onboardingTwo" options={{ headerShown: false }}/>
          <Stack.Screen name="onboardingThree" options={{ headerShown: false }}/>
          <Stack.Screen name="homeScreen"  options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false}} />
          <Stack.Screen name="editAccount" options={{ headerShown: false}} />
          <Stack.Screen name="accountCreationSelectScreen" options={{ headerShown: false}} />
          <Stack.Screen name="createAccount" options={{ headerShown: false}} />
          <Stack.Screen name="(tabs)/initialScreen" options={{ headerShown: false}} />
          <Stack.Screen name="components/album" options={{ headerShown: false}} />
          <Stack.Screen name="components/reviewScreen" options={{ headerShown: false}} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)/perfil" options={{ headerShown: false}} />
        </Stack>
    </AuthProvider>
  );
}
