import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import axios from 'axios';
import {
  PUSH_PLAN,
  SET_SELECTED_PLAN,
  ADD_USER_VOTE,
  TAKE_PLAN_FROM_LIST,
  REMOVE_SELECTED_PLAN,
  CONFIRM_VOTE,
  UNCONFIRM_VOTE,
  CLOSE_PLAN,
  SET_WINNER,
} from '../types';

let deleted = null;

export const pushPlan = (key, payload) => ({
  type: PUSH_PLAN,
  payload,
  key,
});

export const setSelectedPlan = payload => ({
  type: SET_SELECTED_PLAN,
  payload,
});

export const addUserVote = (uid, userId, payload) => ({
  type: ADD_USER_VOTE,
  uid,
  userId,
  payload,
});

export const takePlanFormList = uid => ({
  type: TAKE_PLAN_FROM_LIST,
  uid,
});

export const removeSelectedPlan = () => ({
  type: REMOVE_SELECTED_PLAN,
});

export const confirmVote = uid => ({
  type: CONFIRM_VOTE,
  uid,
});
export const unconfirmVote = uid => ({
  type: UNCONFIRM_VOTE,
  uid,
});

export const closePlan = () => ({
  type: CLOSE_PLAN,
});

export const setWinner = payload => ({
  type: SET_WINNER,
  payload,
});

export const fetchPlans = () => (dispatch) => {
  const { currentUser } = firebase.auth();
  firebase.database().ref(`/users/${currentUser.uid}/plans`)
  .on('child_added', (snapshot) => {
    firebase.database().ref(`/plans/${snapshot.key}`)
    .on('value', (plan) => {
      if (snapshot.key === deleted) return false;
      return dispatch(pushPlan(snapshot.key, { ...plan.val(), uid: snapshot.key }));
    });
  });
};


function sendInvitationPushNotifications(tokens, email, plan) {
  return axios.post('https://gentle-reaches-85835.herokuapp.com/notifications', { tokens: tokens.map(token => ({
    to: token,
    sound: 'default',
    body: `${email} invited you to ${plan}`,
    data: { text: `${email} invited you to ${plan}` },
  })) });
}

export const addPlan = (plan, choices, users) => () => {
  const { currentUser } = firebase.auth();
  const choicesEntities = {};
  const userEntities = { [currentUser.uid]: true };
  _.map(users, (user) => { userEntities[user.uid] = true; });
  const planKey = firebase.database().ref('/plans/').push({
    question: plan,
    status: 'open',
    createdBy: currentUser.uid,
    users: userEntities,
  }).key;
  choices.map(choice => firebase.database().ref('/choices').push({ choice, planKey }).key)
  .forEach((key) => { choicesEntities[key] = true; });
  const addPlanToCurrentUser = firebase.database().ref(`/users/${currentUser.uid}/plans`)
  .update({ [planKey]: true });
  const inviteUsersToPlan = _.map(users, user =>
    firebase.database().ref(`/invitations/${user.uid}`).update({ [planKey]: true }));
  const notificationsTokens = [];
  let count = 0;
  const notifications = Promise.all(users.map(({ uid }) => firebase.database().ref(`/users/${uid}/token`)
    .once('value', (snapshot) => {
      snapshot.val() && notificationsTokens.push(snapshot.val());
      count += 1;
      if (count === users.length) {
        return sendInvitationPushNotifications(notificationsTokens, currentUser.email, plan);
      }
    })));
  return Promise.all([...inviteUsersToPlan, planKey, addPlanToCurrentUser, notifications])
  .then(() => {
    Actions.plans({ type: 'reset' });
  });
};


export const fetchPlan = plan => (dispatch) => {
  const populatedPlan = { ...plan, choices: {}, tokens: [] };
  const usersFetching = Object.keys(plan.users).map(key =>
    firebase.database().ref(`/users/${key}`)
    .once('value', (snapshot) => {
      populatedPlan.users[key] = snapshot.val().email;
      snapshot.val().token && populatedPlan.tokens.push(snapshot.val().token);
    }));
  const choicesFetching = firebase.database().ref('/choices')
  .orderByChild('planKey')
  .equalTo(plan.uid)
  .once('value', (snapshot) => { populatedPlan.choices = snapshot.val(); });
  return Promise.all([...usersFetching, choicesFetching])
  .then(() => dispatch(setSelectedPlan(populatedPlan)));
};


export const voteChoice = (uid, num) => (dispatch) => {
  const { currentUser } = firebase.auth();
  firebase.database().ref(`/choices/${uid}/votes`).update({ [currentUser.uid]: num })
  .then(() => {
    dispatch(addUserVote(uid, currentUser.uid, num));
    Actions.pop();
  });
};

export const deletePlan = plan => (dispatch) => {
  Object.keys(plan.users).forEach((uid) => {
    firebase.database().ref(`/users/${uid}/plans/${plan.uid}`).remove();
    firebase.database().ref(`/invitations/${uid}/${plan.uid}`).remove();
  });
  firebase.database().ref('/choices')
  .orderByChild('planKey')
  .equalTo(plan.uid)
  .on('child_added', (snapshot) => {
    snapshot.ref.remove();
  });
  firebase.database().ref(`/plans`)
  .on('child_removed', snapshot => {
    dispatch(takePlanFormList(snapshot.key));
    Actions.plans({ type: 'reset' });
  });
  firebase.database().ref(`/plans/${plan.uid}`).remove();
  deleted = plan.uid
};

function sendWinnerNotification(tokens, plan, winner) {
  return axios.post('https://gentle-reaches-85835.herokuapp.com/notifications', { tokens: tokens.map(token => ({
    to: token,
    sound: 'default',
    body: `${plan} has close!`,
    data: { text: `${plan} Winner: ${winner}` },
  })) });
}

function defineWiner(plan, dispatch) {
  const results = {}
  console.log('winner')
  Object.keys(plan.choices).forEach((key) => {
    firebase.database().ref(`/choices/${key}`)
    .once('value', (snapshot) => {
      console.log('CHOICE', snapshot.val())
      const votes = snapshot.val().votes;
      results[snapshot.val().choice] = Object.keys(votes)
      .reduce((total, user) => total + votes[user], 0);
      if (Object.keys(results).length === Object.keys(plan.choices).length) {
        console.log('started counting', results)
        console.log('we have tokens', plan.tokens);
        const winner = Object.keys(results).reduce((partialWinner, choice) => {
          if (results[choice] > results[partialWinner]) return choice;
          return partialWinner;
        });
        firebase.database().ref(`/plans/${plan.uid}`).update({ winner });
        sendWinnerNotification(plan.tokens, plan.question, winner);
        dispatch(setWinner(winner));
      }
    });
  });
}

export const confirmUserVote = plan => (dispatch) => {
  const { currentUser } = firebase.auth();
  firebase.database().ref(`/plans/${plan.uid}/confirms/`)
  .update({ [currentUser.uid]: true })
  .then(() => {
    dispatch(confirmVote(currentUser.uid));
    firebase.database().ref(`/plans/${plan.uid}/confirms/`)
    .once('value', (snapshot) => {
      if (Object.keys(snapshot.val()).length === Object.keys(plan.users).length) {
        firebase.database().ref(`/plans/${plan.uid}`).update({ status: 'close' });
        dispatch(closePlan());
        defineWiner(plan, dispatch);
      }
    });
  });
};

export const unconfirmUserVote = plan => (dispatch) => {
  const { currentUser } = firebase.auth();
  firebase.database().ref(`/plans/${plan.uid}/confirms/${currentUser.uid}`)
  .remove()
  .then(() => dispatch(unconfirmVote(currentUser.uid)));
};
