import React, {Component} from 'react';
import {TouchableOpacity, Image, StyleSheet, Text, View} from 'react-native';

import Swiper from 'react-native-swiper';

export default class SwiperComponent extends Component {
  state = {
    currentUser: null,
  };

  componentDidMount() {
    this.setState({
      currentUser: this.props?.route?.params,
    });
  }

  componentDidUpdate() {
    if (!this.state.currentUser) {
      this.setState({
        currentUser: this.props?.route?.params,
      });
    }
  }

  handleDoneClick = () => {
    this.props.navigation.navigate('Home', this.state.currentUser);
  };

  render() {
    return (
      <Swiper loop={false} style={styles.wrapper} showsButtons>
        <View style={styles.slide1}>
          <Text style={styles.subText}>
            Swipe Left on movies you do not want to see
          </Text>
          <Image
            style={styles.SwipCardImage}
            source={require('../assets/swipeleft.png')}
          />
        </View>
        <View style={styles.slide2}>
          <Text style={styles.subText}>
            Swipe Right on movies you do want to see
          </Text>
          <Image
            style={styles.SwipCardImage}
            source={require('../assets/swiperight.png')}
          />
        </View>
        <View style={styles.slide3}>
          <Text style={styles.subText}>
            Connect with your friends to see what you should watch together!
          </Text>
          <Image
            style={styles.SwipCardImage}
            source={require('../assets/friendslist.png')}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={this.handleDoneClick}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
              Let's Go!
            </Text>
          </TouchableOpacity>
        </View>
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#333333',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#c00913',
    padding: 10,
    width: 200,
    marginTop: 10,
  },
  slide1: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#333333',
  },
  slide2: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#333333',
  },
  slide3: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#333333',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  subText: {
    color: '#fff',
    fontSize: 25,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
  },
  SwipCardImage: {
    width: '100%',
    height: 550,
    resizeMode: 'contain',
  },
});
