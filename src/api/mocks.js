import {getToken} from './token';
import axios from 'axios';

const URL = 'https://fathomless-eyrie-54692.herokuapp.com';
axios.defaults.baseURL = URL;

const mockSuccess = (value) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), 2000);
  });
};

const mockFailure = (value) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(value), 2000);
  });
};

export const login = (email, password) => {
  return axios({
    method: 'post',
    url: '/users/login',
    data: {
      user: {
        email: email,
        password: password,
      },
    },
  });
};

export const createAccount = (email, password, firstName, lastName) => {
  return axios({
    method: 'post',
    url: '/users',
    data: {
      user: {
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
      },
    },
  });
};

export const getUsers = async (shouldSucceed = true) => {
  const token = await getToken();

  if (!token) {
    return mockFailure({error: 401, message: 'Invalid Request'});
  }

  return mockSuccess({
    users: [
      {
        email: 'test@test.ca',
      },
      {
        email: 'test2@test.ca',
      },
    ],
  });
};
