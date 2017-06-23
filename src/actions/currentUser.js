import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { SET_CURRENT_USER } from '../types';
import registerForNotifications from '../services/push-notifications';

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  payload: user,
});

export const checkUser = () => dispatch => {
  console.log('THIS IS RUNNING');
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(setCurrentUser(user));
      Actions.main();
      registerForNotifications();
    } else {
      dispatch(setCurrentUser(user));
      Actions.auth();
    }
  });
};

export const login = (...credentials) => dispatch =>
  firebase.auth().signInWithEmailAndPassword(...credentials)
  .then((user) => {
    dispatch(setCurrentUser(user));
    Actions.main();
  });

export const signup = (...credentials) => dispatch =>
  firebase.auth().createUserWithEmailAndPassword(...credentials)
  .then((user) => {
    firebase.database().ref(`/users/${user.uid}`).update({ email: user.email });
    dispatch(setCurrentUser(user));
    Actions.main();
  });

