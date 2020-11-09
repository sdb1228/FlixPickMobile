import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  Image,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Ionicons';
import MovieDetailsModal from '../Modals/MovieDetailsModal';
import {getLikedMovies, unlikeMovie} from '../api/mocks';

const AllHtmlEntities = require('html-entities').AllHtmlEntities;
const entities = new AllHtmlEntities();
const fallbackImage =
  'https://lh3.googleusercontent.com/TBRwjS_qfJCSj1m7zZB93FnpJM5fSpMA_wUlFDLxWAb45T9RmwBvQd5cWR5viJJOhkI';

const LikedMoviesScreen = (props) => {
  const [unlikedMovieIds, setUnlikedMovieIds] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [movieDetailsModal, setMovieDetailsModal] = useState({
    open: false,
    movie: null,
  });
  useEffect(() => {
    getLikedMovies()
      .then((res) => {
        setLikedMovies(res.data);
      })
      .catch((error) => {
        if (error.message.includes('401')) {
          props.navigationRef.current?.navigate('Login');
        } else {
          showMessage({
            message:
              'Something went wrong fetching liked movies.  Please kill the app and try again',
            type: 'danger',
          });
        }
      });
  }, []);

  const unlikeMovieClicked = (movie) => {
    unlikeMovie(movie)
      .then(() => setUnlikedMovieIds([...unlikedMovieIds, movie.id]))
      .catch((error) => {
        if (error.message.includes('401')) {
          props.navigationRef.current?.navigate('Login');
        } else {
          showMessage({
            message:
              'Something went wrong when adding a friend.  Please try again later',
            type: 'danger',
          });
        }
      });
  };

  return (
    <View style={styles.container}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.title}>Liked Movies</Text>
      </View>
      <ScrollView>
        {likedMovies
          .filter((likedMovie) => !unlikedMovieIds.includes(likedMovie.id))
          .map((movie) => (
            <TouchableHighlight
              key={movie.id}
              style={{borderWidth: 1, borderColor: '#333333'}}
              onPress={() => {
                setMovieDetailsModal({open: true, movie});
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
                  <Icon
                    onPress={() => unlikeMovieClicked(movie)}
                    name="close"
                    size={35}
                    color="red"
                    style={{paddingRight: 10}}
                  />
                </View>
              </View>
            </TouchableHighlight>
          ))}
      </ScrollView>
      <MovieDetailsModal
        selectedMovie={movieDetailsModal.movie}
        modalVisible={movieDetailsModal.open}
        setModalVisible={(status) =>
          setMovieDetailsModal({open: status, movie: null})
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  title: {
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
export default LikedMoviesScreen;
