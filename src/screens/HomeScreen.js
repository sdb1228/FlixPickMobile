import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-deck-swiper';
import AnimatedSplash from 'react-native-animated-splash-screen';
import {getHome, userMovieReaction} from '../api/mocks';
import GenreSelectionModal from '../Modals/GenreSelectionModal';
import TinderCard from './TinderCard';

const genres = [
  {id: '0', name: 'Animation'},
  {id: '1', name: 'Crime'},
  {id: '2', name: 'Drama'},
  {id: '3', name: 'Mystery'},
  {id: '4', name: 'Thriller'},
  {id: '5', name: 'Documentary'},
  {id: '6', name: 'Music'},
  {id: '7', name: 'Horror'},
  {id: '8', name: 'Reality-TV'},
  {id: '9', name: 'Sci-Fi'},
  {id: '10', name: 'Comedy'},
  {id: '11', name: 'Biography'},
  {id: '12', name: 'Fantasy'},
  {id: '13', name: 'Short'},
  {id: '14', name: 'Game-Show'},
  {id: '15', name: 'Romance'},
  {id: '16', name: 'Family'},
  {id: '17', name: 'Action'},
  {id: '18', name: 'Adventure'},
  {id: '19', name: 'Sport'},
  {id: '20', name: 'History'},
  {id: '21', name: 'War'},
  {id: '22', name: 'Musical'},
  {id: '23', name: 'News'},
  {id: '24', name: 'Western'},
  {id: '25', name: 'Adult'},
  {id: '26', name: 'Talk-Show'},
];

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
    selectedGenres: genres.map((g) => g.name),
    movieLoadingErrorMessage: '',
    currentUser: 0,
    isLoaded: false,
    genreModalVisible: false,
  };

  loadMovies = () => {
    this.setState({
      movieLoadingErrorMessage: '',
      loadingMovies: true,
      currentUser: this.props?.route?.params?.data?.email,
    });
    getHome(15)
      .then((res) => {
        this.setState({
          isLoaded: true,
          movies: res.data,
          movieLoadingErrorMessage: null,
          currentUser: this.props?.route?.params?.data?.email,
          loadingMovies: false,
        });
        getHome(0).then((res) => {
          this.setState((prevState) => ({
            movies: prevState.movies.concat(res.data),
          }));
        });
      })
      .catch(this.handleUserLoadingError);
  };

  handleUserLoadingError = (res) => {
    if (res.message.includes('401')) {
      this.setState({
        loadingMovies: false,
        movies: [],
        isLoaded: false,
        movieLoadingErrorMessage: 'Unauthorized',
      });
      this.props.navigation.navigate('Login');
    } else {
      this.setState({
        movies: [],
        loadingMovies: false,
        isLoaded: false,
        movieLoadingErrorMessage: res.message,
      });
    }
  };

  handleUserSwipe = (cardIndex, reaction) => {
    const movie = this.state.movies
      .filter(this.genreFilter)
      .sort(
        (a, b) =>
          (b.top_ten ? parseFloat(b.rating) + 2 : parseFloat(b.rating)) -
          (a.top_ten ? parseFloat(a.rating) + 2 : parseFloat(a.rating)),
      )[cardIndex];

    userMovieReaction(movie.id, reaction);
  };

  setSelectedGenere = (genre, value) => {
    if (genre === 'All') {
      if (!value) {
        this.setState({selectedGenres: []});
      } else {
        this.setState({selectedGenres: genres.map((g) => g.name)});
      }
    } else {
      this.setState((prevState) => {
        return {
          selectedGenres: prevState.selectedGenres.includes(genre.name)
            ? prevState.selectedGenres.filter((g) => g !== genre.name)
            : prevState.selectedGenres.concat(genre.name),
        };
      });
    }
  };

  setGenreModalVisible = (visible) =>
    this.setState({genreModalVisible: visible});

  genreFilter = (value) => {
    if (!value.genre) {
      return false;
    }
    if (this.state.selectedGenres.length === 0) {
      return true;
    }
    for (let i = 0; i < this.state.selectedGenres.length; i++) {
      if (value.genre.includes(this.state.selectedGenres[i])) {
        return true;
      }
    }
    return false;
  };

  render() {
    const {movies} = this.state;

    return (
      <View style={{flex: 1, backgroundColor: '#141414'}}>
        <AnimatedSplash
          translucent={true}
          isLoaded={this.state.isLoaded}
          logoImage={require('../assets/logo.png')}
          backgroundColor={'#141414'}
          logoHeight={150}
          logoWidth={150}>
          <View style={{backgroundColor: '#141414', marginBottom: 10}}>
            <TouchableOpacity
              style={styles.genreButton}
              onPress={() => this.setState({genreModalVisible: true})}>
              <Text numberOfLines={1} style={styles.genreText}>
                {this.state.selectedGenres.length === 0 ||
                this.state.selectedGenres.length === genres.length
                  ? `All Genres Selected`
                  : `${this.state.selectedGenres.length} Genres selected`}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, backgroundColor: '#141414'}}>
            <Swiper
              cardVerticalMargin={0}
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
                    },
                  },
                },
              }}
              animateOverlayLabelsOpacity
              cards={
                movies
                  .filter(this.genreFilter)
                  .sort(
                    (a, b) =>
                      (b.top_ten
                        ? parseFloat(b.rating) + 2
                        : parseFloat(b.rating)) -
                      (a.top_ten
                        ? parseFloat(a.rating) + 2
                        : parseFloat(a.rating)),
                  ) || []
              }
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
              backgroundColor="#141414"
              stackSize={3}
            />
          </View>
          <GenreSelectionModal
            modalVisible={this.state.genreModalVisible}
            setModalVisible={this.setGenreModalVisible}
            genres={genres}
            selectedGenres={this.state.selectedGenres}
            setSelectedGenere={this.setSelectedGenere}
          />
        </AnimatedSplash>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  genreButton: {
    textAlign: 'center',
    color: '#ccc',
    fontSize: 15,
    padding: 5,
    width: 160,
    marginLeft: 20,
    backgroundColor: '#141414',
    borderWidth: 1,
    borderColor: 'white',
  },
  genreText: {
    textAlign: 'center',
    fontSize: 15,
    paddingLeft: 5,
    color: 'white',
  },
});
