import React from 'react';
import {View, SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import {getHome} from '../api/mocks';
import TinderCard from './TinderCard';

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

  render() {
    const {movies} = this.state;
    return (
      <View style={styles.rootContainer}>
        <SafeAreaView style={styles.container}>
          <Swiper
            cards={movies || []}
            renderCard={(card) => {
              console.log(card);
              return <TinderCard {...card} />;
            }}
            onSwiped={(cardIndex) => {
              console.log(cardIndex);
            }}
            onSwipedAll={() => {
              console.log('onSwipedAll');
            }}
            cardIndex={0}
            backgroundColor={'#141414'}
            stackSize={3}></Swiper>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  rootContainer: {
    backgroundColor: '#333333',
    flex: 1,
  },
  card: {
    borderRadius: 4,
    borderWidth: 2,
    height: '80%',
    borderColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333',
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent',
  },
});
