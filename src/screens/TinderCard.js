import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import MovieDetailsModal from '../Modals/MovieDetailsModal';
const AllHtmlEntities = require('html-entities').AllHtmlEntities; // Synonym for HTML5 entities.
const entities = new AllHtmlEntities();
const fallbackImage =
  'https://lh3.googleusercontent.com/TBRwjS_qfJCSj1m7zZB93FnpJM5fSpMA_wUlFDLxWAb45T9RmwBvQd5cWR5viJJOhkI';

const TinderCard = ({title, large_image, image, synopsis, rating}) => {
  const [movieDetailsModal, setMovieDetailsModal] = useState({
    open: false,
    movieDetails: null,
  });

  const [imageSize, setImageSize] = useState({height: 1, width: 1});
  const imageUri = large_image || image;

  Image.getSize(imageUri || fallbackImage, (width, height) => {
    if (imageSize.width === 1) {
      setImageSize({width, height});
    }
  });

  return (
    <View
      style={{
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#777777',
        backgroundColor: '#333333',
        paddingTop: 20,
        paddingLeft: 30,
        paddingRight: 30,
        height:
          Dimensions.get('window').height -
          (Dimensions.get('window').height < 800 ? 152 : 200),
        paddingBottom: Dimensions.get('window').height < 800 ? 0 : 30,
      }}>
      <Image
        style={{
          width: '100%',
          maxHeight: Dimensions.get('window').height < 800 ? 300 : 400,
          height:
            imageSize.height *
            (Dimensions.get('window').width / imageSize.width),
          resizeMode: 'contain',
        }}
        source={{
          uri: imageUri || fallbackImage,
        }}
      />
      <View style={styles.movieInforContainer}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 10,
          }}>
          <View style={styles.infoContainer}>
            <Icon
              onPress={() => this.openControlPanel()}
              name="star"
              size={15}
              color="white"
            />
            <Text numberOfLines={1} style={styles.rating}>
              {rating}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.moreInforContainer}
            onPress={() =>
              setMovieDetailsModal({
                open: true,
                movieDetails: {title, large_image, image, synopsis, rating},
              })
            }>
            {Dimensions.get('window').height < 800 && (
              <Text numberOfLines={1} style={styles.moreInfoText}>
                More Info
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>
          {!title ? 'Welcome to Flix Picks!' : entities.decode(title)}
        </Text>
        {!(Dimensions.get('window').height < 800) && (
          <Text numberOfLines={4} style={styles.synopsis}>
            {!synopsis
              ? 'The best movie matching out there'
              : entities.decode(synopsis)}
          </Text>
        )}
      </View>
      <MovieDetailsModal
        selectedMovie={movieDetailsModal.movieDetails}
        modalVisible={movieDetailsModal.open}
        setModalVisible={(visible) =>
          setMovieDetailsModal({open: visible, movieDetails: null})
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  moreInforContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  moreInfoText: {
    color: '#c00913',
    fontWeight: 'bold',
    fontSize: 15,
  },
  rootContainer: {
    backgroundColor: '#333333',
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
    paddingTop: Dimensions.get('window').height < 800 ? 0 : 5,
    paddingBottom: Dimensions.get('window').height < 800 ? 5 : 0,
    backgroundColor: 'transparent',
  },
  movieInforContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  synopsis: {
    textAlign: 'center',
    color: '#ccc',
    paddingTop: 10,
    fontSize: 20,
    backgroundColor: 'transparent',
  },
  rating: {
    textAlign: 'center',
    color: '#ccc',
    fontSize: 15,
    paddingLeft: 5,
    backgroundColor: 'transparent',
  },
});

export default TinderCard;
