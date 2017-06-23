import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardItem } from './common';

const styles = {
  container: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: '5%',
    width: '43%',
    borderWidth: 2,
    height: 80,
    alignItems: 'center',
    flexDirection: 'column',
  },
  choiceName: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 5,
  },
  votes: {
    textAlign: 'center',
  },
};

const SingleChoice = ({ choice, uid }) => (
  <CardItem style={styles.container}>
    <TouchableOpacity onPress={() => Actions.vote({ choice, uid, title: choice.choice })}>
      <Text style={styles.choiceName}>{choice.choice}</Text>
      <Text style={styles.votes}>{(
        choice.votes &&
        Object.keys(choice.votes).reduce((total, key) =>
          total + choice.votes[key], 0)
        ) || 0} Votes
      </Text>
    </TouchableOpacity>
  </CardItem>
);

export default SingleChoice;
