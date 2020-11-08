import React from 'react';
import {login} from '../api/mocks';
import EmailForm from '../forms/EmailForm';

const LoginScreen = ({navigation}) => {
  return (
    <EmailForm
      buttonText="Create Account"
      onSubmit={login}
      navigation={navigation}
      onAuthentication={(res) => navigation.navigate('Home', res)}></EmailForm>
  );
};

export default LoginScreen;
