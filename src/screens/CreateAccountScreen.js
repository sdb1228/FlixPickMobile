import React, {useState} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import {createAccount} from '../api/mocks';

const CreateAccount = ({navigation}) => {
  const [displayName, onChangeDisplayName] = useState('');
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submit = () => {
    createAccount(email, password)
      .then(async (res) => {
        navigation.navigate('NewUserTutorial', res);
      })
      .catch((res) => {
        console.log(res);
        setErrorMessage(res.data.error);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.loginTitle}>New Account</Text>
      </View>
      <View style={{flex: 2}}>
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

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          {errorMessage ? <Text>{errorMessage}</Text> : null}
        </View>
        <TouchableOpacity style={styles.button} onPress={submit}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
            Create Account
          </Text>
        </TouchableOpacity>
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
    fontSize: 50,
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

export default CreateAccount;
