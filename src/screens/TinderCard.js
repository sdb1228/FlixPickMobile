import React from 'react';
import {View, Text, StyleSheet, StatusBar, Image} from 'react-native';
var decode = require('unescape');

const TinderCard = ({title, large_image, synopsis}) => (
  <View style={styles.card}>
    <Image
      style={styles.tinyLogo}
      source={{
        uri: large_image,
      }}
    />
    <View style={styles.textContainer}>
      <Text style={styles.title}>
        {!title ? 'Welcome to Flix Picks!' : decode(title)}
      </Text>
      <Text style={styles.synopsis}>
        {!synopsis ? 'The bets movie matching out there' : decode(synopsis)}
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
  tinyLogo: {
    width: '100%',
    height: 400,
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
