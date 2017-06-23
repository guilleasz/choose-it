import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import firebase from 'firebase';

export default async () => {
  const { currentUser } = firebase.auth();
  const previousToken = await AsyncStorage.getItem('pushtoken');
  if (!previousToken) {
    const { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
    if (status === 'granted') {
      const token = await Notifications.getExponentPushTokenAsync();
      await firebase.database().ref(`/users/${currentUser.uid}`).update({ token });
      AsyncStorage.setItem('pushToken', token);
    }
  }
};
