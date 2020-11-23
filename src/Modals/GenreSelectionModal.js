import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useHeaderHeight} from '@react-navigation/stack';
import CheckBox from '@react-native-community/checkbox';
import {
  ScrollView,
  Dimensions,
  StyleSheet,
  View,
  Text,
  Modal,
} from 'react-native';

const GenreSelectionModal = ({genres, modalVisible, setModalVisible}) => {
  const headerHeight = useHeaderHeight();
  return (
    <Modal animationType="fade" transparent visible={modalVisible}>
      <View style={styles.centeredView}>
        <View
          style={{
            backgroundColor: '#333333',
            borderRadius: 20,
            padding: 15,
            width: 350,
            height: Dimensions.get('window').height - headerHeight,
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
          }}>
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

          <ScrollView>
            <Text numberOfLines={6} style={styles.synopsis}>
              herheherherhehrhre
            </Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 35,
    paddingBottom: 35,
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

export default GenreSelectionModal;
