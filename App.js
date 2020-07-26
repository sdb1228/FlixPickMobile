import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import CreateAccountScreen from './src/screens/CreateAccountScreen';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        options={{
          title: 'My home',
          headerLeft: () => (
            <Button
              onPress={() => alert('This goes to search')}
              title="Search"
              color="#000"
            />
          ),
          headerRight: () => (
            <Button
              onPress={() => alert('This goes to User Settings')}
              title="Settings"
              color="#000"
            />
          ),
        }}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
