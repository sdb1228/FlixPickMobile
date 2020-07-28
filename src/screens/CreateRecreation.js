import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Icon,
  Text,
} from 'react-native';
import {createAccount} from '../api/mocks';
import {setToken} from '../api/token';
import ImagePicker from 'react-native-image-picker';

const CreateRecreation = ({navigation}) => {
  const chooseImage = () => {
    const options = {
      title: 'Select Avatar',
      cameraType: 'front',
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        SetFileuri(response.uri); // update state to update Image
      }
    });
  };
  const [firstName, onChangeFirstName] = useState('');
  const [lastName, onChangeLastName] = useState('');
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  var [fileUri, SetFileuri] = useState();

  const submit = () => {
    createAccount(email, password)
      .then(async (res) => {
        console.log(res.data.auth_token);
        await setToken(res.data.auth_token);
        navigation.navigate('Home');
      })
      .catch((res) => {
        console.log(res);
        setErrorMessage(res.data.error);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={{
          alignSelf: 'center',
          marginTop: 35,
        }}>
        <Image
          style={{height: 100, width: 100, borderRadius: 50}}
          source={
            fileUri
              ? {uri: fileUri} // if clicked a new img
              : require('images/bg.jpg')
          } // else show random
        />
        <TouchableOpacity style={styles.addPictureIcon} onPress={chooseImage}>
          <Icon name="camera" size={20} />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChangeFirstName(text)}
        placeholder="First Name"
        placeholderTextColor="grey"
        value={firstName}
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChangeLastName(text)}
        placeholder="Last Name"
        placeholderTextColor="grey"
        value={lastName}
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChangeEmail(text)}
        value={email}
        placeholder="Email"
        placeholderTextColor="grey"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChangePassword(text)}
        value={password}
        placeholder="Password"
        placeholderTextColor="grey"
        secureTextEntry
      />
      <Button title="Sign up" onPress={submit} />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
  },

  addPictureIcon: {
    height: 30,
    width: 30,
    backgroundColor: 'white',
    borderRadius: 50,
    position: 'absolute',
    left: 65,
    top: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CreateRecreation;
