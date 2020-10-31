import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import {getHome} from '../api/mocks';

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default class HomeScreen extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      if (!this.state.hasLoadedUsers) {
        this.loadUsers();
      }
    }
  }

  componentDidMount() {
    if (!this.state.hasLoadedUsers) {
      this.loadUsers();
    }
  }

  state = {movies: [], hasLoadedUsers: false, userLoadingErrorMessage: ''};

  loadUsers() {
    this.setState({hasLoadedUsers: false, userLoadingErrorMessage: ''});
    getHome()
      .then((res) => {
        this.setState({
          hasLoadedUsers: true,
          movies: res.data,
        });
      })
      .catch(this.handleUserLoadingError);
  }

  handleUserLoadingError = (res) => {
    if (res.message.includes('401')) {
      this.props.navigation.navigate('Login');
    } else {
      this.setState({
        hasLoadedUsers: false,
        userLoadingErrorMessage: res.message,
      });
    }
  };

  // logOut = async () => {
  // this.setState({ hasLoadedUsers: false, users: [] })
  // await setToken('');
  // this.props.navigation.navigate('Login');
  // <Button title="Log out" onPress={this.logOut} />
  // };
  //
  // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  // <Text>HomeScreen</Text>
  // {users.map((user) => (
  // <Text key={user.email}>{user.email}</Text>
  // ))}
  // {userLoadingErrorMessage ? (
  // <Text>{userLoadingErrorMessage}</Text>
  // ) : null}
  // </View>
  //

  renderItem = ({item}) => <Item title={item.title} />;

  render() {
    const {movies} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={movies}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
        />
        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() => {
            this.props.navigation.navigate('CreateRecreation');
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
