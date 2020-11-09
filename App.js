import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Drawer from 'react-native-drawer';
import {StyleSheet, View, Modal, TextInput, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Ionicons';
import FlashMessage, {showMessage} from 'react-native-flash-message';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import CreateAccountScreen from './src/screens/CreateAccountScreen';
import FriendsList from './src/screens/FriendsList';
import SettingsScreen from './src/screens/SettingsScreen';
import LikedMoviesScreen from './src/screens/LikedMoviesScreen';
import HamburgerContent from './src/screens/HamburgerContent';
import {logout, addFriend, getCurrentUser} from './src/api/mocks';

const Stack = createStackNavigator();
const navigationRef = React.createRef();

class MyStack extends React.Component {
  state = {
    modalVisible: false,
    addFriendEmail: '',
    addFriendLoading: false,
    addFriendError: '',
    currentUser: null,
    addFriendEmailError: null,
  };

  componentDidMount() {
    if (!this.state.currentUser) {
      getCurrentUser()
        .then((res) => {
          this.setState({currentUser: res.data});
        })
        .catch((error) => {
          if (error.message.includes('401')) {
            this.setState({addFriendError: error, addFriendLoading: false});
            navigationRef.current?.navigate('Login');
          } else {
            this.setState({addFriendError: error, addFriendLoading: false});
          }
        });
    }
  }

  setModalVisible = (visible) => {
    this.setState({
      modalVisible: visible,
      addFriendError: null,
      addFriendEmailError: null,
      addFriendEmail: '',
    });
  };

  closeControlPanel = () => {
    this._drawer.close();
  };

  openControlPanel = () => {
    if (!this.state.currentUser) {
      getCurrentUser()
        .then((res) => {
          this.setState({currentUser: res.data});
        })
        .catch((error) => {
          if (error.message.includes('401')) {
            this.setState({addFriendError: error, addFriendLoading: false});
            navigationRef.current?.navigate('Login');
          } else {
            this.setState({addFriendError: error, addFriendLoading: false});
          }
        });
    }
    this._drawer.open();
  };

  validateEmail = (text) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      this.setState({
        addFriendEmail: text,
        addFriendEmailError: 'Email is incorrect',
      });
      return false;
    } else {
      this.setState({addFriendEmail: text, addFriendEmailError: null});
    }
  };

  sendFriendRequest = () => {
    if (
      this.state.addFriendEmailError ||
      this.state.addFriendEmail.length === 0
    ) {
      return;
    }
    this.setState({addFriendLoading: true});
    addFriend(this.state.addFriendEmail)
      .then(() => {
        this.setState({addFriendLoading: false, modalVisible: false});
      })
      .catch((error) => {
        if (error.message.includes('401')) {
          this.setState({addFriendError: error, addFriendLoading: false});
          navigationRef.current?.navigate('Login');
        } else {
          showMessage({
            message:
              'Something went wrong when adding a friend.  Please try again later',
            type: 'danger',
          });
          this.setState({addFriendError: error, addFriendLoading: false});
        }
      });
  };

  onHamburgerMenuItemClick = (item) => {
    switch (item) {
      case 'Logout':
        this.logOut();
        break;
      case 'FriendsList':
        navigationRef.current?.navigate('FriendsList', {
          currentUser: this.state.currentUser,
        });
        this.closeControlPanel();
        break;
      case 'LikedMovies':
        navigationRef.current?.navigate('LikedMovies', {
          currentUser: this.state.currentUser,
        });
        this.closeControlPanel();
        break;
      case 'Settings':
        navigationRef.current?.navigate('Settings', {
          currentUser: this.state.currentUser,
        });
        this.closeControlPanel();
        break;
      default:
        this.logOut();
    }
  };

  logOut = () => {
    this.setState({
      modalVisible: false,
      addFriendEmail: '',
      addFriendLoading: false,
      addFriendError: '',
      currentUser: null,
      addFriendEmailError: null,
    });

    logout();
    this.closeControlPanel();
    navigationRef.current?.navigate('Login');
  };

  render() {
    const {modalVisible} = this.state;
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
              title: '',
              headerLeft: () => (
                <Icon
                  onPress={() => this.openControlPanel()}
                  name="menu"
                  size={35}
                  color="white"
                  style={styles.settingsIcon}
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
            }}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{
              title: '',
              headerLeft: () => <View />,
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#333333',
                shadowRadius: 0,
                shadowOffset: {
                  height: 0,
                },
              },
            }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{
              title: '',
              headerTintColor: 'white',
              headerBackTitle: ' ',
              headerStyle: {
                backgroundColor: '#141414',
                shadowRadius: 0,
                shadowOffset: {
                  height: 0,
                },
              },
              headerLeftContainerStyle: styles.settingsIcon,
            }}
            name="Settings"
            component={SettingsScreen}
          />
          <Stack.Screen
            options={{
              title: '',
              headerTintColor: 'white',
              headerBackTitle: ' ',
              headerStyle: {
                backgroundColor: '#141414',
                shadowRadius: 0,
                shadowOffset: {
                  height: 0,
                },
              },
              headerLeftContainerStyle: styles.settingsIcon,
            }}
            name="LikedMovies"
            component={LikedMoviesScreen}
          />
          <Stack.Screen
            options={{
              title: '',
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#333333',
                shadowRadius: 0,
                shadowOffset: {
                  height: 0,
                },
              },
            }}
            name="CreateAccount"
            component={CreateAccountScreen}
          />
          <Stack.Screen
            options={{
              title: '',
              headerTintColor: 'white',
              headerBackTitle: ' ',
              headerStyle: {
                backgroundColor: '#141414',
                shadowRadius: 0,
                shadowOffset: {
                  height: 0,
                },
              },
              headerLeftContainerStyle: styles.settingsIcon,
              headerRight: () => (
                <Icon
                  onPress={() => {
                    this.setModalVisible(true);
                  }}
                  name="person-add"
                  size={35}
                  color="white"
                  style={styles.searchIcon}
                />
              ),
            }}
            name="FriendsList"
            component={FriendsList}
          />
        </Stack.Navigator>
        <Modal transparent animationType="fade" visible={modalVisible}>
          <Spinner
            visible={this.state.addFriendLoading}
            textContent={'Sending...'}
            textStyle={styles.spinnerTextStyle}
          />
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{width: '100%', justifyContent: 'flex-start'}}>
                <Icon
                  onPress={() => {
                    this.setModalVisible(!modalVisible);
                  }}
                  name="close-outline"
                  size={30}
                  color="white"
                />
              </View>
              <Text style={styles.modalText}>Add Friend</Text>
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  style={styles.addFriendInput}
                  onChangeText={(text) => this.validateEmail(text)}
                  value={this.state.addFriendEmail}
                  placeholder="Email Address"
                  placeholderTextColor="grey"
                  keyboardType="email-address"
                />
                <Icon
                  onPress={() => {
                    this.sendFriendRequest();
                  }}
                  name="send"
                  size={20}
                  color="white"
                  style={styles.sendButton}
                />
              </View>
              {this.state.addFriendEmailError && (
                <Text style={styles.invalidEmailText}>Invalid Email</Text>
              )}
            </View>
          </View>
        </Modal>
      </Drawer>
    );
  }
}

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <MyStack />
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  searchIcon: {
    marginRight: 20,
  },
  addFriendInput: {
    borderBottomWidth: 1,
    color: 'white',
    borderColor: 'white',
    flex: 1,
    width: '100%',
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#c00913',
    borderRadius: 3,
    padding: 10,
  },
  settingsIcon: {
    marginLeft: 10,
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 150,
  },
  invalidEmailText: {
    color: 'red',
    marginTop: 10,
    fontWeight: 'bold',
  },
  modalView: {
    backgroundColor: '#333333',
    borderRadius: 20,
    padding: 15,
    width: 350,
    height: 190,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 25,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});
