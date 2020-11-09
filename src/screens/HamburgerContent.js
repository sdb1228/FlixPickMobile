import React from 'react';
import {FlatList, View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const HamburgerContent = ({onHamburgerMenuItemClick}) => (
  <View style={styles.rootContainer}>
    <FlatList
      scrollEnabled={false}
      data={[
        {key: 'FriendsList', value: 'Friends List'},
        {key: 'LikedMovies', value: 'Liked Movies'},
        {key: 'Settings', value: 'Settings'},
        {key: 'Logout', value: 'Logout'},
      ]}
      renderItem={({item}) => (
        <TouchableOpacity
          style={styles.listItemContainer}
          onPress={() => onHamburgerMenuItemClick(item.key)}>
          <Text style={styles.synopsis}>{item.value}</Text>
        </TouchableOpacity>
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  listItemContainer: {
    flex: 1,
    width: '100%',
    borderColor: 'white',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
  },
  rootContainer: {
    paddingTop: 50,
    backgroundColor: '#333333',
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
    paddingTop: 10,
    backgroundColor: 'transparent',
  },
  synopsis: {
    textAlign: 'center',
    color: '#ccc',
    fontSize: 20,
    backgroundColor: 'transparent',
  },
});

export default HamburgerContent;
