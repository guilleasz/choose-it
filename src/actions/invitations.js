import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { ADD_INVITATION, DISMISS_INVITATION, ERASE_INVITATION } from '../types';

export const addInvitation = payload => ({
  type: ADD_INVITATION,
  payload,
});

export const dismissInvitation = uid => ({
  type: DISMISS_INVITATION,
  uid,
});
export const eraseInvitation = () => ({
  type: ERASE_INVITATION,
});

export const fetchInvitations = () => (dispatch) => {
  const { currentUser } = firebase.auth();
  dispatch(eraseInvitation());
  firebase.database().ref(`/invitations/${currentUser.uid}`)
  .on('child_added', (snapshot) => {
    firebase.database().ref(`/plans/${snapshot.key}`)
    .once('value', (plan) => {
      firebase.database().ref(`/users/${plan.val().createdBy}`)
      .once('value', user => dispatch(addInvitation({
        ...plan.val(),
        createdBy: user.val().email,
        uid: snapshot.key,
      })));
    });
  });
};

export const acceptInvitation = invitation => (dispatch) => {
  const { currentUser } = firebase.auth();
  const eraseInvitation = firebase.database().ref(`/invitations/${currentUser.uid}`)
  .update({ [invitation.uid]: null });
  const addPlanToUser = firebase.database().ref(`/users/${currentUser.uid}/plans`)
  .update({ [invitation.uid]: true });
  return Promise.all([eraseInvitation, addPlanToUser])
  .then(() => {
    dispatch(dismissInvitation(invitation.uid));
    Actions.plans(({ type: 'reset' }));
  });
};

export const rejectInvitation = invitation => (dispatch) => {
  const { currentUser } = firebase.auth();
  const eraseInvitation = firebase.database().ref(`/invitations/${currentUser.uid}`)
  .update({ [invitation.uid]: null });
  const eraseUserFromPlan = firebase.database().ref(`/plans/${invitation.uid}/users`)
  .update({ [currentUser.uid]: null });
  return Promise.all([eraseInvitation, eraseUserFromPlan])
  .then(() => {
    dispatch(dismissInvitation(invitation.uid));
    Actions.plans({ type: 'reset' });
  });
};
