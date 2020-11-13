import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';

const EmailForm = ({buttonText, onSubmit, onAuthentication, navigation}) => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submit = () => {
    onSubmit(email, password)
      .then((res) => {
        onAuthentication(res);
      })
      .catch((error) => {
        if (error.message.includes('401')) {
          showMessage({
            message: 'Password or Email incorrect',
            type: 'danger',
          });
          setErrorMessage();
        } else {
          showMessage({
            message: error.message,
            type: 'danger',
          });
        }
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.loginTitle}>FlickPix</Text>
      </View>
      <View style={{flex: 2}}>
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <TouchableOpacity
            color="white"
            onPress={() => navigation.navigate('CreateAccount')}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
              {buttonText}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            color="white"
            onPress={() =>
              Linking.openURL('https://www.flixpick.fun/forgot_password.user')
            }>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
              Forgot Password
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={submit}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
            Login
          </Text>
        </TouchableOpacity>
        {errorMessage ? <Text>{errorMessage}</Text> : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333333',
  },
  loginTitle: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 80,
  },
  input: {
    borderBottomWidth: 1,
    color: 'white',
    borderColor: 'white',
    marginRight: 10,
    height: 40,
    width: 300,
    marginTop: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#c00913',
    padding: 10,
    marginTop: 30,
  },
});

export default EmailForm;
