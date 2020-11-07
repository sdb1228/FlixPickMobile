import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Modal,
  TouchableOpacity,
} from 'react-native';
import MultiSelect from 'react-native-multiple-select';

class AddGroupModal extends Component {
  state = {
    selectedItems: [],
    groupName: '',
  };

  onSelectedItemsChange = (selectedItems) => {
    this.setState({selectedItems});
  };

  render() {
    const {selectedItems} = this.state;
    console.log(this.props.friends);
    return (
      <Modal animationType="fade" transparent visible={this.props.modalVisible}>
        <Spinner
          visible={this.props.addFriendLoading}
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
              style={styles.groupNameInput}
              onChangeText={(text) => this.setState({groupName: text})}
              value={this.state.groupName}
              placeholder="Group Name"
              placeholderTextColor="grey"
            />
            <View style={{width: '100%'}}>
              <MultiSelect
                hideTags
                items={this.props.friends}
                uniqueKey="id"
                ref={(component) => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={this.onSelectedItemsChange}
                selectedItems={selectedItems}
                selectText="Choose Friends"
                searchInputPlaceholderText="Search Friends..."
                tagRemoveIconColor="#b9b9b9"
                tagBorderColor="#b9b9b9"
                tagTextColor="#b9b9b9"
                selectedItemTextColor="#b9b9b9"
                selectedItemIconColor="#b9b9b9"
                hideDropdown
                itemTextColor="#000"
                searchInputStyle={{
                  color: 'black',
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                submitButtonColor="#000"
                submitButtonText="Done"
              />
              {this.multiSelect?.getSelectedItemsExt(selectedItems)}
              <TouchableOpacity
                onPress={() => {
                  this.sendFriendRequest();
                  this.setModalVisible(!this.props.modalVisible);
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
    padding: 15,
    width: 350,
    minHeight: 450,
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
    borderBottomWidth: 1,
    color: 'black',
    backgroundColor: 'white',
    height: 40,
    borderColor: 'white',
    width: '75%',
    marginRight: 10,
    marginBottom: 30,
  },
});

export default AddGroupModal;
