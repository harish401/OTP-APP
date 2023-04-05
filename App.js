import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TableScreen from './screens/TableScreen';
import HomeScreen from './screens/HomeScreen';
import OTPScreen from './screens/OTPScreen';

const Stack = createStackNavigator();

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleInputChange = (text) => {
    setInputValue(text);
    setIsValid(validateInput(text));
  };

  const validateInput = (text) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isEmail = regex.test(text);
    const isMobile = text.length === 10 && !isNaN(text);
    return isEmail || isMobile;
  };

  const handlePress = () => {
    setInputValue('');
    setIsValid(false);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Input">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Mobile/Email List' }}
        >
          
        </Stack.Screen>
        <Stack.Screen
          name="OTP"
          component={OTPScreen}
          options={{ title: 'Mobile/Email List' }}
        >
          
        </Stack.Screen>
        <Stack.Screen
          name="Table"
          component={TableScreen}
          options={{ title: 'Mobile/Email List' }}
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
