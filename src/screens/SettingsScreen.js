import React, {useState} from 'react';
import axios from 'axios';
import {
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {updateUser} from '../api/mocks';

const SettingsScreen = (props) => {
  const [email, setEmail] = useState(props.route.params.currentUser.email);
  const [displayName, setDisplayName] = useState(
    props.route.params.currentUser.display_name,
  );
  const [password, setPassword] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState();
  const [unlikedMovieIds, setUnlikedMovieIds] = useState([]);

  const handleSubmit = () => {
    const user = {
      email,
      display_name: displayName,
      password,
      password_confirmation: passwordConfirmation,
    };

    updateUser(props.route.params.currentUser.id, user)
      .then(() => {
        showMessage({
          message: 'Your account info was updated',
          type: 'success',
        });
      })
      .catch((error) => {
        showMessage({
          message: error.response.data,
          type: 'danger',
        });
      });
  };

  const unlikeMovie = (movie) => {
    axios
      .delete(`/movie_reactions/${movie.movie_reaction_id}`)
      .then(() => setUnlikedMovieIds([...unlikedMovieIds, movie.id]))
      .catch((err) => console.log('TODO: error handling'));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{paddingTop: 30}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.loginTitle}>Settings</Text>
        </View>
        <TouchableOpacity
          style={styles.likedMoviesButton}
          onPress={handleSubmit}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
            Liked Movies
          </Text>
        </TouchableOpacity>
        <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholderTextColor="grey"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Display Name:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setDisplayName(text)}
              value={displayName}
              placeholderTextColor="grey"
            />
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Password:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setPassword(text)}
              value={password}
              placeholderTextColor="grey"
              secureTextEntry
            />
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Password Confirmation:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setPasswordConfirmation(text)}
              value={passwordConfirmation}
              placeholderTextColor="grey"
              secureTextEntry
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}></View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  rowContainer: {
    marginTop: 50,
  },
  label: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 15,
  },
  input: {
    borderBottomWidth: 1,
    color: 'white',
    borderColor: 'white',
    marginRight: 10,
    height: 40,
    width: 300,
    fontWeight: '700',
  },
  loginTitle: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 50,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#c00913',
    padding: 10,
    width: 200,
    marginTop: 30,
  },
  likedMoviesButton: {
    alignItems: 'center',
    backgroundColor: '#831010',
    padding: 10,
    width: 200,
    marginTop: 30,
  },
});
export default SettingsScreen;
