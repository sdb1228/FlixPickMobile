import axios from 'axios';

const URL = 'http://localhost:3000';
axios.defaults.baseURL = URL;

export const login = (email, password) => {
  return axios({
    method: 'post',
    url: 'users/sign_in.json',
    data: {
      user: {
        email: email,
        password: password,
      },
    },
  });
};

export const createAccount = (email, password, displayName) => {
  return axios({
    method: 'post',
    url: '/users',
    data: {
      user: {
        email: email,
        password: password,
        password_confirmation: password,
        display_name: displayName,
      },
    },
  });
};

export const getHome = () => {
  return axios({
    method: 'get',
    url: '/home.json',
  });
};

export const logout = () => {
  return axios({
    method: 'delete',
    'Content-Type': 'application/json',
    url: 'users/sign_out',
  });
};
