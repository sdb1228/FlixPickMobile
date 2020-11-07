import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {login} from '../api/mocks';
import EmailForm from '../forms/EmailForm';

const LoginScreen = ({navigation}) => {
  return (
    <EmailForm
      buttonText="Log in"
      onSubmit={login}
      onAuthentication={(res) => navigation.navigate('Home', res)}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CreateAccount')}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
          Create Account
        </Text>
      </TouchableOpacity>
    </EmailForm>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#c00913',
    padding: 10,
    marginTop: 30,
  },
});

export default LoginScreen;
