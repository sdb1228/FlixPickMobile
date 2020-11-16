import axios from 'axios';

// const URL = 'http://localhost:3000';
const URL = 'https://www.flixpick.fun';

axios.defaults.baseURL = URL;

export const login = (email, password) => {
  return axios({
    method: 'post',
    headers: {'User-Agent': 'flixpick-mobile'},
    url: '/users/sign_in.json',
    data: {
      user: {
        email: email,
        password: password,
      },
    },
  });
};

export const updateUser = (id, user) => {
  return axios.put(`/users/${id}`, user);
};

export const getLikedMovies = () => {
  return axios.get(`/liked_movies`);
};

export const unlikeMovie = (movie) => {
  return axios.delete(`/movie_reactions/${movie.movie_reaction_id}`);
};

export const createGroup = (name, participants) => {
  return axios({
    method: 'post',
    url: '/groups',
    data: {
      group: {
        group_name: name,
        participants,
      },
    },
  });
};

export const userMovieReaction = (movieId, reaction) => {
  return axios({
    method: 'post',
    url: `/movie_reactions/${movieId}.json`,
    data: {
      reaction,
    },
  });
};

export const addFriend = (email) => {
  return axios({
    method: 'post',
    url: '/relationships.json',
    data: {
      email,
    },
  });
};

export const friendReaction = (reaction, id) => {
  return axios.post(`/relationships/${id}.json`, {
    addFriend: reaction,
  });
};

export const createAccount = (email, password, displayName) => {
  return axios({
    method: 'post',
    url: '/users.json',
    headers: {'User-Agent': 'flixpick-mobile'},
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

export const getHome = (limit) => {
  return axios({
    method: 'get',
    url: `/home.json?limit=${limit}`,
  });
};

export const getCurrentUser = () => {
  return axios({
    method: 'get',
    url: '/settings.json',
  });
};

export const getAllMovies = (searchTerm) => {
  return axios({
    method: 'get',
    url: `/movies.json?title=${searchTerm}`,
  });
};

export const logout = () => {
  return axios({
    method: 'delete',
    'Content-Type': 'application/json',
    url: '/users/sign_out',
  });
};

export const getFriendsList = () => {
  return axios({
    method: 'get',
    url: '/relationships.json',
  });
};
