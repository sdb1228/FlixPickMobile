import React from 'react';
import {View, SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import {getHome} from '../api/mocks';
import TinderCard from './TinderCard';

export default class HomeScreen extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props?.route?.params?.status) {
      if (!this.state.loadingMovies && !this.state.movies.length > 0) {
        this.loadMovies();
      }
    }
  }

  componentDidMount() {
    if (!this.state.movies.length) {
      this.loadMovies();
    }
  }

  state = {movies: [], movieLoadingErrorMessage: ''};

  loadMovies() {
    this.setState({movieLoadingErrorMessage: '', loadingMovies: true});
    getHome()
      .then((res) => {
        this.setState({
          movies: res.data,
        });
      })
      .catch(this.handleUserLoadingError);
  }

  handleUserLoadingError = (res) => {
    if (res.message.includes('401')) {
      this.setState({
        loadingMovies: false,
      });
      this.props.navigation.navigate('Login');
    } else {
      this.setState({
        hasLoadedMovies: false,
        loadingMovies: false,
        movieLoadingErrorMessage: res.message,
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
