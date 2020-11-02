import React, {Component} from 'react';
import {ScrollView, StyleSheet, View, Text, Image} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import {getFriendsList} from '../../api/mocks';
const AllHtmlEntities = require('html-entities').AllHtmlEntities; // Synonym for HTML5 entities.
const entities = new AllHtmlEntities();
const fallbackImage =
  'https://lh3.googleusercontent.com/TBRwjS_qfJCSj1m7zZB93FnpJM5fSpMA_wUlFDLxWAb45T9RmwBvQd5cWR5viJJOhkI';

export default class FriendsList extends Component {
  state = {
    activeSections: [],
    friends: [],
  };

  componentDidMount() {
    if (!this.state.friends.length) {
      this.loadFriends();
    }
  }

  handleUserLoadingError = (res) => {
    if (res.message.includes('401')) {
      this.setState({
        loadingMovies: false,
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

  loadFriends() {
    getFriendsList()
      .then((res) => {
        this.setState({
          friends: res.data,
        });
      })
      .catch(this.handleUserLoadingError);
  }

  setSections = (sections) => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  renderHeader = (section, _, isActive) => {
    return (
      <View
        style={
          isActive ? styles.headerContainerSelected : styles.headerContainer
        }>
        <Text style={styles.friendName}>
          {section.second_user.display_name
            ? section.second_user.display_name
            : section.second_user.email}
        </Text>
        <View style={styles.movieCount}>
          <Text style={styles.movieCountText}>
            {section.same_liked_movies.length} Matched
          </Text>
        </View>
      </View>
    );
  };

  renderContent(section, _, isActive) {
    return (
      <View
        style={{
          height: section.same_liked_movies.length > 0 ? 300 : 100,
          borderColor: 'white',
          borderWidth: 1,
          marginBottom: 10,
          borderTopWidth: 0,
        }}>
        <ScrollView>
          {section.same_liked_movies.map((movie) => (
            <View key={movie.id} style={styles.imageContainer}>
              <Image
                style={styles.sameLikedMoviesImage}
                source={{
                  uri: movie.image || fallbackImage,
                }}
              />
              <View>
                <Text style={{color: 'rgb(185, 185, 185)'}}>
                  {entities.decode(movie.title)}
                </Text>
              </View>
            </View>
          ))}
          {section.same_liked_movies.length === 0 && (
            <Text style={{color: 'white', padding: 10}}>
              You have no liked movies yet. Movies will show up here when You
              have similarities
            </Text>
          )}
        </ScrollView>
      </View>
    );
  }

  render() {
    const {activeSections} = this.state;

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{paddingTop: 30}}>
          <Accordion
            activeSections={activeSections}
            sections={this.state.friends}
            expandMultiple
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            duration={400}
            onChange={this.setSections}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  sameLikedMoviesImage: {
    width: 40,
    height: 50,
    marginRight: 10,
    marginLeft: 20,
    resizeMode: 'contain',
  },
  headerContainerSelected: {
    height: 60,
    borderColor: 'white',
    borderWidth: 1,
    borderBottomWidth: 0,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerContainer: {
    height: 60,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  friendName: {
    flex: 1,
    paddingLeft: 10,
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
  },
  movieCountText: {
    color: '#b9b9b9',
    fontWeight: 'bold',
  },
  movieCount: {
    flex: 1,
    alignItems: 'center',
    paddingRight: 10,
  },
});
