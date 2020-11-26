import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import {showMessage} from 'react-native-flash-message';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Modal,
  TouchableOpacity,
} from 'react-native';
import FriendsListModal from './FriendsListModal';
import {createGroup} from '../../src/api/mocks';

class AddGroupModal extends Component {
  state = {
    friendListModalVisible: false,
    selectedItems: [],
    groupName: '',
    groupNameError: null,
    selectedFriendsError: null,
    createGroupLoading: false,
  };

  onSelectedItemsChange = (selectedItems) => {
    this.setState({selectedItems, selectedFriendsError: null});
  };

  setGenreModalVisible = (visible) =>
    this.setState({friendListModalVisible: visible});

  setSelectedFriend = (friend, value) => {
    this.setState((prevState) => {
      return {
        selectedItems: prevState.selectedItems.includes(friend.id)
          ? prevState.selectedItems.filter((g) => g !== friend.id)
          : prevState.selectedItems.concat(friend.id),
      };
    });
  };

  createGroup = () => {
    if (
      this.state.groupName.length === 0 &&
      this.state.selectedItems.length === 0
    ) {
      showMessage({
        message: 'Group name and friends are required to make a group',
        type: 'danger',
      });
      this.setState({
        selectedFriendsError: 'You Must Select Friends',
        groupNameError: 'Group name must not be blank',
      });
    } else if (this.state.groupName.length === 0) {
      showMessage({
        message: 'Group name is required to make a group',
        type: 'danger',
      });
      this.setState({
        groupNameError: 'Group name must not be blank',
      });
    } else if (this.state.selectedItems.length === 0) {
      showMessage({
        message: 'Friends are required to make a group',
        type: 'danger',
      });
      this.setState({
        selectedFriendsError: 'You Must Select Friends',
      });
    } else {
      this.setState({createGroupLoading: true});
      createGroup(
        this.state.groupName,
        this.state.selectedItems
          .map((friendId) => parseInt(friendId))
          .concat(this.props.currentUser),
      )
        .then((res) => {
          this.setState({createGroupLoading: false}, () =>
            this.props.groupAdded(res.data),
          );
        })
        .catch((error) => {
          if (error.message.includes('401')) {
            this.setState({addFriendError: error, createGroupLoading: false});
            this.props.navigation.navigate('Login');
          } else {
            showMessage({
              message:
                'Something went wrong when adding a friend.  Please try again later',
              type: 'danger',
            });
            this.setState({addFriendError: error, createGroupLoading: false});
          }
        });
    }
  };

  render() {
    return (
      <Modal animationType="fade" transparent visible={this.props.modalVisible}>
        <Spinner
          visible={this.state.createGroupLoading}
          textContent={'Creating Group...'}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{width: '100%', justifyContent: 'flex-start'}}>
              <Icon
                onPress={() => {
                  this.props.setModalVisible(!this.props.modalVisible);
                }}
                name="close-outline"
                size={30}
                color="white"
              />
            </View>
            <Text style={styles.modalText}>Add Group</Text>
            <TextInput
              style={
                this.state.groupNameError
                  ? styles.groupNameInputError
                  : styles.groupNameInput
              }
              onChangeText={(text) =>
                this.setState({groupName: text, groupNameError: null})
              }
              value={this.state.groupName}
              placeholder="Group Name"
              placeholderTextColor="grey"
            />
            <View style={{width: '100%'}}>
              <TouchableOpacity
                style={styles.friendButton}
                onPress={() => this.setState({friendListModalVisible: true})}>
                <Text numberOfLines={1} style={styles.friendText}>
                  {this.state.selectedItems.length === 0
                    ? `Select Friends`
                    : `${this.state.selectedItems.length} friends selected`}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.createGroup();
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingRight: 20,
                    backgroundColor: '#c00913',
                    borderRadius: 3,
                    marginTop: 20,
                    padding: 10,
                  }}>
                  <Text
                    style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                    Add Group
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <FriendsListModal
          modalVisible={this.state.friendListModalVisible}
          setModalVisible={this.setGenreModalVisible}
          friends={this.props.friends}
          selectedFriends={this.state.selectedItems}
          setSelectedFriend={this.setSelectedFriend}
        />
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 35,
    paddingBottom: 35,
  },
  modalText: {
    marginTop: 35,
    marginBottom: 15,
    fontSize: 25,
    textAlign: 'left',
    color: 'white',
    fontWeight: 'bold',
  },
  modalView: {
    backgroundColor: '#333333',
    borderRadius: 20,
    marginTop: 85,
    padding: 15,
    width: 350,
    minHeight: 250,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  friendButton: {
    textAlign: 'center',
    color: 'transparent',
    fontSize: 15,
    padding: 5,
    width: 160,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'white',
  },
  friendText: {
    textAlign: 'center',
    fontSize: 15,
    paddingLeft: 5,
    color: 'white',
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
  groupNameInput: {
    color: 'black',
    backgroundColor: 'white',
    height: 40,
    width: '75%',
    marginRight: 10,
    marginBottom: 30,
  },
  groupNameInputError: {
    color: 'black',
    backgroundColor: 'white',
    height: 40,
    width: '75%',
    marginRight: 10,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: 'red',
  },
});

export default AddGroupModal;
