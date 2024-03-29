import React from 'react';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';
import {useHeaderHeight} from '@react-navigation/stack';
import CheckBox from '@react-native-community/checkbox';
import {
  ScrollView,
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';

const GenreSelectionModal = ({
  genres,
  selectedGenres,
  modalVisible,
  setModalVisible,
  setSelectedGenere,
}) => {
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
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}>
            <Icon
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              name="close-outline"
              size={30}
              color="white"
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
                done
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={{width: '100%'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: '100%',
              }}>
              <CheckBox
                value={_.isEqual(
                  genres.map((genre) => genre.name).sort(),
                  selectedGenres.sort(),
                )}
                onValueChange={(newValue) => setSelectedGenere('All', newValue)}
                lineWidth={1}
                hideBox={false}
                boxType={'square'}
                tintColor={'white'}
                onCheckColor={'white'}
                onFillColor={'#4DABEC'}
                onTintColor={'#F4DCF8'}
                animationDuration={0}
                disabled={false}
              />
              <Text style={styles.checkboxText}>Select All</Text>
            </View>
            <View style={{paddingLeft: 20, paddingTop: 5}}>
              {genres.map((genre) => (
                <View
                  key={genre.id}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    width: '100%',
                    paddingTop: 10,
                  }}>
                  <CheckBox
                    key={genre.id}
                    value={selectedGenres.includes(genre.name)}
                    onValueChange={(newValue) => {
                      setSelectedGenere(genre, newValue);
                    }}
                    lineWidth={1}
                    hideBox={false}
                    boxType={'square'}
                    tintColor={'white'}
                    onCheckColor={'white'}
                    onFillColor={'#4DABEC'}
                    onTintColor={'#F4DCF8'}
                    animationDuration={0}
                    disabled={false}
                  />
                  <Text style={styles.checkboxText}>{genre.name}</Text>
                </View>
              ))}
            </View>
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
  checkboxText: {
    color: 'white',
    fontSize: 20,
    paddingLeft: 10,
  },
  modalTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
    paddingTop: 10,
    backgroundColor: 'transparent',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#c00913',
    padding: 10,
    marginTop: 5,
    marginRight: 10,
  },
});

export default GenreSelectionModal;
