import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TopNews from './screens/TopNews';
import OneNews from './screens/OneNews';
import Categories from './screens/Categories';
import Search from './screens/Search';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function TabStack() {
  return (
    <Tab.Navigator
      initialRouteName="Top News"
      activeColor="#f0edf6"
      inactiveColor="#594F4F"
      barStyle={{ backgroundColor: '#45ADA8' }}>
      <Tab.Screen name="Top News" component={TopNews}
        options={{
          tabBarLabel: 'Top News',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="newspaper" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen 
        name="Categories" 
        component={Categories} 
        options={{
          tabBarLabel: 'Categories',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="category" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="search" color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Top News"
        screenOptions={{
          headerStyle: { backgroundColor: '#45ADA8' },
          headerTitleAlign: "center",
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
        }}>
        <Stack.Screen
          name="Top News"
          component={TabStack}
        />
        <Stack.Screen
          name="Categories"
          component={Categories}
        />
        <Stack.Screen
          name="OneNews"
          component={OneNews}
        />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}