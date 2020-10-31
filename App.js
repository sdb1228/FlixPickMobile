import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import CreateAccountScreen from './src/screens/CreateAccountScreen';
import CreateRecreation from './src/screens/CreateRecreation';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        options={{
          title: 'Home',
          headerLeft: () => (
            <Icon
              onPress={() => alert('This search')}
              name="search-outline"
              size={35}
              color="black"
              style={styles.searchIcon}
            />
          ),
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#141414',
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
            },
          },
          headerRight: () => (
            <Icon
              onPress={() => alert('This goes to User Settings')}
              name="settings-outline"
              size={35}
              color="black"
              style={styles.settingsIcon}
            />
          ),
        }}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen
        options={{
          title: 'Create Recreation',
        }}
        name="CreateRecreation"
        component={CreateRecreation}
      />
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

const styles = StyleSheet.create({
  searchIcon: {
    marginLeft: 20,
  },
  settingsIcon: {
    marginRight: 20,
  },
});
