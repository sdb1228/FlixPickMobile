import React from 'react';
import {View, Text, StyleSheet, StatusBar, Image} from 'react-native';
const AllHtmlEntities = require('html-entities').AllHtmlEntities; // Synonym for HTML5 entities.
const entities = new AllHtmlEntities();
const fallbackImage =
  'https://lh3.googleusercontent.com/TBRwjS_qfJCSj1m7zZB93FnpJM5fSpMA_wUlFDLxWAb45T9RmwBvQd5cWR5viJJOhkI';

const TinderCard = ({title, large_image, synopsis}) => (
  <View style={styles.card}>
    <Image
      style={styles.SwipCardImage}
      source={{
        uri: large_image || fallbackImage,
      }}
    />
    <View style={styles.textContainer}>
      <Text style={styles.title}>
        {!title ? 'Welcome to Flix Picks!' : entities.decode(title)}
      </Text>
      <Text numberOfLines={4} style={styles.synopsis}>
        {!synopsis
          ? 'The bets movie matching out there'
          : entities.decode(synopsis)}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  rootContainer: {
    backgroundColor: '#333333',
    flex: 1,
  },
  SwipCardImage: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
  },
  card: {
    borderRadius: 4,
    borderWidth: 2,
    height: '80%',
    borderColor: '#777777',
    backgroundColor: '#333333',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
    paddingTop: 10,
    backgroundColor: 'transparent',
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
});

export default TinderCard;
