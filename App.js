import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TableScreen from './screens/TableScreen';
import HomeScreen from './screens/HomeScreen';
import OTPScreen from './screens/OTPScreen';

const Stack = createStackNavigator();

export default function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Input">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown:false }}
        >
          
        </Stack.Screen>
        <Stack.Screen
          name="OTP"
          component={OTPScreen}
          options={{ headerShown:true }}
        >
          
        </Stack.Screen>
        <Stack.Screen
          name="Table"
          component={TableScreen}
          options={{ headerShown:true,title:'Mobile Number list' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  invalid: {
    color: 'red',
    fontSize: 16,
    marginBottom: 20,
  },
});
