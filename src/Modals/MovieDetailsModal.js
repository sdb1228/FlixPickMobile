import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  ScrollView,
  Dimensions,
  StyleSheet,
  View,
  Text,
  Modal,
  Image,
} from 'react-native';
const AllHtmlEntities = require('html-entities').AllHtmlEntities; // Synonym for HTML5 entities.
const entities = new AllHtmlEntities();
const fallbackImage =
  'https://lh3.googleusercontent.com/TBRwjS_qfJCSj1m7zZB93FnpJM5fSpMA_wUlFDLxWAb45T9RmwBvQd5cWR5viJJOhkI';

const MovieDetailsModal = ({selectedMovie, modalVisible, setModalVisible}) => (
  <Modal animationType="fade" transparent visible={modalVisible}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <ScrollView>
          <View style={{width: '100%', justifyContent: 'flex-start'}}>
            <Icon
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              name="close-outline"
              size={30}
              color="white"
            />
          </View>

          <Image
            style={{
              width: '100%',
              height: 400,
              resizeMode: 'contain',
            }}
            onError={({nativeEvent: {error}}) => console.log(error)}
            source={{
              uri: selectedMovie?.large_image || fallbackImage,
            }}
          />
          <View style={styles.textContainer}>
            <Text style={styles.modalTitle}>
              {!selectedMovie?.title
                ? 'Welcome to Flix Picks!'
                : entities.decode(selectedMovie?.title)}
            </Text>
            <Text numberOfLines={6} style={styles.synopsis}>
              {!selectedMovie?.synopsis
                ? 'The bets movie matching out there'
                : entities.decode(selectedMovie?.synopsis)}
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 35,
    paddingBottom: 35,
  },
  modalView: {
    backgroundColor: '#333333',
    borderRadius: 20,
    padding: 15,
    width: 350,
    height: Dimensions.get('window').height - 50,
    overflow: 'scroll',
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
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  synopsis: {
    textAlign: 'center',
    color: '#ccc',
    paddingTop: 10,
    fontSize: 20,
    backgroundColor: 'transparent',
  },
  modalTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
    paddingTop: 10,
    backgroundColor: 'transparent',
  },
});

export default MovieDetailsModal;
