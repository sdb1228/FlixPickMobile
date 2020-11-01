import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Drawer from 'react-native-drawer';
import {StyleSheet, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import CreateAccountScreen from './src/screens/CreateAccountScreen';
import CreateRecreation from './src/screens/CreateRecreation';
import HamburgerContent from './src/screens/HamburgerContent';
import {logout} from './src/api/mocks';

const Stack = createStackNavigator();
const navigationRef = React.createRef();

class MyStack extends React.Component {
  closeControlPanel = () => {
    this._drawer.close();
  };

  openControlPanel = () => {
    this._drawer.open();
  };

  onHamburgerMenuItemClick = (item) => {
    switch (item) {
      case 'Logout':
        this.logOut();
        break;
      default:
        this.logOut();
    }
  };

  logOut = () => {
    logout();
    this.closeControlPanel();
    navigationRef.current?.navigate('Login');
  };

  render() {
    return (
      <Drawer
        openDrawerOffset={100}
        ref={(ref) => (this._drawer = ref)}
        tweenHandler={Drawer.tweenPresets.parallax}
        tapToClose={true}
        content={
          <HamburgerContent
            onHamburgerMenuItemClick={this.onHamburgerMenuItemClick}
            logout={this.logout}
          />
        }>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            options={{
              title: 'Flix Pick',
              headerLeft: () => (
                <Icon
                  onPress={() => this.openControlPanel()}
                  name="menu"
                  size={35}
                  color="white"
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
                  onPress={() => alert('This search')}
                  name="search-outline"
                  size={35}
                  color="white"
                  style={styles.searchIcon}
                />
              ),
            }}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{
              headerLeft: () => <View />,
            }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
          <Stack.Screen
            options={{
              title: 'Create Recreation',
            }}
            name="CreateRecreation"
            component={CreateRecreation}
          />
        </Stack.Navigator>
      </Drawer>
    );
  }
}

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
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
