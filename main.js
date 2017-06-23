import Expo, { Notifications } from 'expo';
import React from 'react';
import { Alert } from 'react-native';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import Router from './src/Router';
import store from './src/store';

export default class App extends React.Component {

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyB0ppPG30cwP6-jN2MP-6I9RVfSzx_7OTk',
      authDomain: 'stackathon-e376c.firebaseapp.com',
      databaseURL: 'https://stackathon-e376c.firebaseio.com',
      projectId: 'stackathon-e376c',
      storageBucket: 'stackathon-e376c.appspot.com',
      messagingSenderId: '473966298307',
    });
  }
  componentDidMount() {
    Notifications.addListener((notification) => {
      const { data: { text }, origin } = notification;
      if (origin === 'received' && text) {
        Alert.alert(
          'choose.it: ',
          text,
          [{ text: 'Ok' }],
        );
      }
    });
  }

  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}


Expo.registerRootComponent(App);
