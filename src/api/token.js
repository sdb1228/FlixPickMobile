import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('@auth_token');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    return null;
  }
};

export const setToken = async (cookie) => {
  try {
    await AsyncStorage.setItem('@auth_token', cookie);
  } catch (e) {
    return null;
  }
};
