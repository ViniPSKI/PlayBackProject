import { Tabs } from 'expo-router';
import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#F3F3F3',
            borderRadius: 20,
            marginHorizontal: 90, 
            marginBottom: 30,
            height: 70,
            elevation: 0, 
            shadowColor: 'transparent',
          }
        }}>
        <Tabs.Screen
          name="initialScreen"
          options={{
            title: '',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Icon name="home-outline" size={40} color={focused ? "#FFFFFF" : color} style={{
                backgroundColor: focused ? 'gray' : 'transparent',
                borderRadius: 15, 
                padding: 10,
              }}/>
            ),
            tabBarLabel: () => null, 
          }}
        />
        <Tabs.Screen
          name="SearchScreen"
          options={{
            title: '',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Icon name="magnify" size={40} color={focused ? "#FFFFFF" : color} style={{
                backgroundColor: focused ? 'gray' : 'transparent',
                borderRadius: 15, 
                padding: 10,
              }}/>
            ),
            tabBarLabel: () => null, 
          }}
        />
        <Tabs.Screen
          name="perfil"
          options={{
            title: '',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Icon name="account-outline" size={40} color={focused ? "#FFFFFF" : color} style={{
                backgroundColor: focused ? 'gray' : 'transparent',
                borderRadius: 15, 
                padding: 10,
              }}/>
            ),
            tabBarLabel: () => null, 
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
