import React, {useState} from 'react';
import {ScrollView, StyleSheet, TextInput, Button, Text} from 'react-native';
import {createAccount} from '../api/mocks';
import {setToken} from '../api/token';

const CreateAccount = ({navigation}) => {
  const [displayName, onChangeDisplayName] = useState('');
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChangeDisplayName(text)}
        placeholder="Display Name"
        placeholderTextColor="grey"
        value={displayName}
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
      <Button
        title="Back to log in"
        onPress={() => navigation.navigate('Login')}
      />
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
});

export default CreateAccount;
