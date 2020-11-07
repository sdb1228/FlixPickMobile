import React from 'react';
import {View, SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-deck-swiper';
import {getHome, userMovieReaction} from '../api/mocks';
import TinderCard from './TinderCard';

export default class HomeScreen extends React.Component {
  componentDidUpdate() {
    if (
      this.props?.route?.params?.status &&
      this.state.movieLoadingErrorMessage !== 'Unauthorized'
    ) {
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
          movieLoadingErrorMessage: null,
        });
      })
      .catch(this.handleUserLoadingError);
  }

  handleUserLoadingError = (res) => {
    if (res.message.includes('401')) {
      this.setState({
        loadingMovies: false,
        movieLoadingErrorMessage: 'Unauthorized',
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

  handleUserSwipe = (cardIndex, reaction) => {
    userMovieReaction(this.state.movies[cardIndex].id, reaction);
  };

  render() {
    const {movies} = this.state;
    return (
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
