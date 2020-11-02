import React, {Component} from 'react';
import {
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Modal,
  Image,
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import {getFriendsList, friendReaction} from '../../api/mocks';
import Icon from 'react-native-vector-icons/Ionicons';
import TinderCard from '../TinderCard';
const AllHtmlEntities = require('html-entities').AllHtmlEntities;
const entities = new AllHtmlEntities();
const fallbackImage =
  'https://lh3.googleusercontent.com/TBRwjS_qfJCSj1m7zZB93FnpJM5fSpMA_wUlFDLxWAb45T9RmwBvQd5cWR5viJJOhkI';

export default class FriendsList extends Component {
  state = {
    activeSections: [],
    friends: [],
    loadingFriends: false,
    modalVisible: false,
    selectedMovie: null,
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
    this.setState({
      loadingFriends: true,
    });
    getFriendsList()
      .then((res) => {
        this.setState({
          friends: res.data,
          loadingFriends: false,
        });
      })
      .catch(this.handleUserLoadingError);
  }

  setModalVisible = (visible, selectedMovie) => {
    this.setState({modalVisible: visible, selectedMovie});
  };

  setSections = (sections) => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  friendActionText = (friendRequest) => {
    if (friendRequest.status === 'Accepted') {
      return `${friendRequest.same_liked_movies.length} Matched`;
    } else {
      if (
        this.props.route.params.currentUser.id === friendRequest.action_user_id
      ) {
        return 'Waiting For Reply';
      }
    }
    return 'Friend Request';
  };

  shouldRenderActionButtons = (friendRequest) => {
    if (
      this.props.route.params.currentUser.id !== friendRequest.action_user_id &&
      friendRequest.status === 'Pending'
    ) {
      return true;
    }
    return false;
  };

  relationshipReaction = (reaction, id) => {
    friendReaction(reaction, id)
      .then(() => {
        if (reaction) {
          const friends = JSON.parse(JSON.stringify(this.state.friends));
          friends[
            this.state.friends.indexOf(
              this.state.friends.find((friend) => friend.id === id),
            )
          ].status = 'Accepted';
          this.setState({friends});
        } else {
          const friends = JSON.parse(JSON.stringify(this.state.friends));
          delete friends[
            this.state.friends.indexOf(
              this.state.friends.find((friend) => friend.id === id),
            )
          ];
          var filtered = friends.filter(function (el) {
            return el != null;
          });
          this.setState({friends: filtered});
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  renderHeader = (section, _, isActive) => {
    return (
      <View
        style={
          isActive ? styles.headerContainerSelected : styles.headerContainer
        }>
        <Text style={styles.friendName}>
          {section.second_user
            ? section.second_user.display_name
              ? section.second_user.display_name
              : section.second_user.email
            : section.first_user.display_name
            ? section.first_user.display_name
            : section.first_user.email}
        </Text>
        <View
          style={
            this.shouldRenderActionButtons(section)
              ? styles.actionButtons
              : styles.movieCount
          }>
          {this.shouldRenderActionButtons(section) && (
            <View style={{flexDirection: 'row'}}>
              <Icon
                onPress={() => this.relationshipReaction(true, section.id)}
                name="checkmark"
                size={35}
                color="green"
                style={{paddingRight: 20}}
              />
              <Icon
                onPress={() => this.relationshipReaction(false, section.id)}
                name="close"
                size={35}
                color="red"
                style={{paddingRight: 10}}
              />
            </View>
          )}
          {!this.shouldRenderActionButtons(section) && (
            <Text style={styles.movieCountText}>
              {this.friendActionText(section)}
            </Text>
          )}
        </View>
      </View>
    );
  };

  renderContent = (section, _, isActive) => {
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
            <TouchableHighlight
              key={movie.id}
              style={{borderWidth: 1, borderColor: '#333333'}}
              onPress={() => {
                this.setModalVisible(true, movie);
              }}>
              <View style={styles.imageContainer}>
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
            </TouchableHighlight>
          ))}
          {section.status === 'Pending' && (
            <Text style={{color: 'white', padding: 10}}>
              You must accept the friend request to see your matched movies
            </Text>
          )}
          {section.same_liked_movies.length === 0 &&
            section.status === 'Accepted' && (
              <Text style={{color: 'white', padding: 10}}>
                You have no liked movies yet. Movies will show up here when You
                have similarities
              </Text>
            )}
        </ScrollView>
      </View>
    );
  };

  render() {
    const {modalVisible} = this.state;
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{paddingTop: 30}}>
          {this.state.friends.length === 0 && !this.state.loadingFriends && (
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 40,
                padding: 10,
              }}>
              Add some friends to see what matches you have with them!
            </Text>
          )}
          {this.state.loadingFriends && (
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 40,
                padding: 10,
              }}>
              Loading Friends....
            </Text>
          )}
          {this.state.friends.length !== 0 && (
            <TouchableHighlight style={{marginBottom: 20}} onPress={() => {}}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  paddingRight: 20,
                }}>
                <Icon
                  name="people"
                  size={30}
                  color="white"
                  style={{paddingRight: 10}}
                />
                <Text
                  style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                  Add Group
                </Text>
              </View>
            </TouchableHighlight>
          )}
          <Accordion
            activeSections={this.state.activeSections}
            sections={this.state.friends}
            expandMultiple
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            duration={400}
            onChange={this.setSections}
          />
        </ScrollView>
        <Modal animationType="fade" transparent visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{width: '100%', justifyContent: 'flex-start'}}>
                <Icon
                  onPress={() => {
                    this.setModalVisible(!modalVisible);
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
                  uri: this.state.selectedMovie?.large_image || fallbackImage,
                }}
              />
              <View style={styles.textContainer}>
                <Text style={styles.modalTitle}>
                  {!this.state.selectedMovie?.title
                    ? 'Welcome to Flix Picks!'
                    : entities.decode(this.state.selectedMovie?.title)}
                </Text>
                <Text numberOfLines={6} style={styles.synopsis}>
                  {!this.state.selectedMovie?.synopsis
                    ? 'The bets movie matching out there'
                    : entities.decode(this.state.selectedMovie?.synopsis)}
                </Text>
              </View>
            </View>
          </View>
        </Modal>
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
  actionButtons: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  movieCount: {
    flex: 1,
    alignItems: 'center',
    paddingRight: 10,
  },
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
    height: 650,
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

  modalTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
    paddingTop: 10,
    backgroundColor: 'transparent',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  spinnerTextStyle: {
    color: '#FFF',
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
  modalText: {
    marginBottom: 15,
    fontSize: 25,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});
