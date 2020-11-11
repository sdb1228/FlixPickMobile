import React from 'react';
import {View, SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-deck-swiper';
import AnimatedSplash from 'react-native-animated-splash-screen';
import {getHome, userMovieReaction} from '../api/mocks';
import TinderCard from './TinderCard';

export default class HomeScreen extends React.Component {
  componentDidUpdate(_, prevState) {
    if (this.props?.route?.params?.status) {
      if (
        (!this.state.loadingMovies && !this.state.movies.length > 0) ||
        this.props?.route?.params?.data?.email !== prevState.currentUser
      ) {
        this.loadMovies();
      }
    }
  }

  componentDidMount() {
    if (!this.state.movies.length) {
      this.loadMovies();
    }
  }

  state = {
    movies: [],
    movieLoadingErrorMessage: '',
    currentUser: 0,
    isLoaded: false,
  };

  loadMovies = () => {
    this.setState({
      movieLoadingErrorMessage: '',
      loadingMovies: true,
      currentUser: this.props?.route?.params?.data?.email,
    });
    getHome()
      .then((res) => {
        this.setState({
          isLoaded: true,
          movies: res.data,
          movieLoadingErrorMessage: null,
          currentUser: this.props?.route?.params?.data?.email,
          loadingMovies: false,
        });
      })
      .catch(this.handleUserLoadingError);
  };

  handleUserLoadingError = (res) => {
    if (res.message.includes('401')) {
      this.setState({
        loadingMovies: false,
        movies: [],
        movieLoadingErrorMessage: 'Unauthorized',
      });
      this.props.navigation.navigate('Login');
    } else {
      this.setState({
        movies: [],
        loadingMovies: false,
        movieLoadingErrorMessage: res.message,
      });
    }
  };

  handleUserSwipe = (cardIndex, reaction) => {
    userMovieReaction(this.state.movies[cardIndex].id, reaction);
  };

  render() {
    const {movies} = this.state;
    return (
      <AnimatedSplash
        translucent={true}
        isLoaded={this.state.isLoaded}
        logoImage={require('../assets/logo.png')}
        backgroundColor={'#141414'}
        logoHeight={150}
        logoWidth={150}>
        <View style={styles.rootContainer}>
          <SafeAreaView style={styles.container}>
            <Swiper
              overlayLabels={{
                left: {
                  element: (
                    <Icon name="thumbs-down-outline" size={100} color="white" />
                  ),
                  title: 'NOPE',
                  style: {
                    wrapper: {
                      backgroundColor: '#ea6564',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 600,
                    },
                  },
                },
                right: {
                  element: (
                    <Icon name="thumbs-up-outline" size={100} color="white" />
                  ),
                  title: 'LIKE',
                  style: {
                    wrapper: {
                      backgroundColor: '#B1DA96',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 600,
                    },
                  },
                },
              }}
              animateOverlayLabelsOpacity
              cards={movies || []}
              renderCard={(card) => {
                return <TinderCard {...card} />;
              }}
              onSwipedLeft={(cardIndex) => {
                this.handleUserSwipe(cardIndex, 'Dislike');
              }}
              onSwipedRight={(cardIndex) => {
                this.handleUserSwipe(cardIndex, 'Like');
              }}
              onSwipedAll={() => {
                console.log('onSwipedAll');
              }}
              cardIndex={0}
              backgroundColor={'#141414'}
              stackSize={3}></Swiper>
          </SafeAreaView>
        </View>
      </AnimatedSplash>
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
