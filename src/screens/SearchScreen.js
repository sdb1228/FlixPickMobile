import React, {Component} from 'react';
import {
  TextInput,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';
import MovieDetailsModal from '../Modals/MovieDetailsModal';
import {getAllMovies, userMovieReaction} from '../api/mocks';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
const AllHtmlEntities = require('html-entities').AllHtmlEntities;
const entities = new AllHtmlEntities();
const fallbackImage =
  'https://lh3.googleusercontent.com/TBRwjS_qfJCSj1m7zZB93FnpJM5fSpMA_wUlFDLxWAb45T9RmwBvQd5cWR5viJJOhkI';

const searchAPIDebounced = _.debounce(getAllMovies, 100);

export default class SearchScreen extends Component {
  state = {
    loadingMovies: false,
    movies: [],
    searchTerm: '',
    movieDetailsModalOpen: false,
    selectedMovie: null,
  };

  componentDidMount() {
    if (!this.state.movies.length) {
      this.setState({loadingMovies: true});
      getAllMovies('')
        .then((res) => {
          this.setState({movies: res.data, loadingMovies: false});
        })
        .catch(() => {});
    }
  }

  setMovieDetailsModalVisible = (visible, selectedMovie) => {
    this.setState({movieDetailsModalOpen: visible, selectedMovie});
  };

  searchForMovies = async (text) => {
    this.setState({searchTerm: text});
    const result = await searchAPIDebounced(text);
    this.setState({movies: result.data});
  };

  handleUserReaction = (movieId, reaction) => {
    userMovieReaction(movieId, reaction)
      .then((res) => {
        const movies = JSON.parse(JSON.stringify(this.state.movies));
        movies[
          this.state.movies.indexOf(
            this.state.movies.find((movie) => movie.id === movieId),
          )
        ].reaction = reaction;
        this.setState({movies});
      })
      .catch(() => {});
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.searchTitle}>Search</Text>
        </View>
        {!this.state.loadingMovies && (
          <TextInput
            style={styles.input}
            onChangeText={this.searchForMovies}
            value={this.state.searchTerm}
            placeholder="Search movie titles..."
            placeholderTextColor="grey"
          />
        )}
        <ScrollView contentContainerStyle={{paddingTop: 30}}>
          {this.state.loadingMovies && (
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 40,
                padding: 10,
              }}>
              Loading Movies....
            </Text>
          )}
          {this.state.movies.map((movie) => (
            <TouchableHighlight
              key={movie.id}
              style={{borderWidth: 1, borderColor: '#333333'}}
              onPress={() => {
                this.setMovieDetailsModalVisible(true, movie);
              }}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.sameLikedMoviesImage}
                  source={{
                    uri: movie.image || fallbackImage,
                  }}
                />
                <View>
                  <Text
                    style={{
                      color: 'rgb(185, 185, 185)',
                      fontSize: 15,
                      width: 250,
                    }}>
                    {entities.decode(movie.title)}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  {!movie.reaction && (
                    <>
                      <Icon
                        onPress={() =>
                          this.handleUserReaction(movie.id, 'Like')
                        }
                        name="checkmark"
                        size={35}
                        color="green"
                      />
                      <Icon
                        onPress={() =>
                          this.handleUserReaction(movie.id, 'Dislike')
                        }
                        name="close"
                        size={35}
                        color="red"
                      />
                    </>
                  )}
                  {movie.reaction && (
                    <Text
                      style={{
                        color: 'rgb(185, 185, 185)',
                        fontSize: 15,
                        width: 250,
                      }}>
                      {movie.reaction}
                    </Text>
                  )}
                </View>
              </View>
            </TouchableHighlight>
          ))}
        </ScrollView>
        <MovieDetailsModal
          selectedMovie={this.state.selectedMovie}
          modalVisible={this.state.movieDetailsModalOpen}
          setModalVisible={this.setMovieDetailsModalVisible}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  input: {
    borderBottomWidth: 1,
    color: 'white',
    borderColor: 'white',
    marginRight: 10,
    height: 40,
    width: 300,
    marginTop: 20,
    marginLeft: 30,
    fontWeight: '700',
  },
  searchTitle: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 50,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 10,
  },
  sameLikedMoviesImage: {
    width: 40,
    height: 50,
    marginRight: 10,
    marginLeft: 20,
    resizeMode: 'contain',
  },
  actionButtons: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 10,
  },
});
