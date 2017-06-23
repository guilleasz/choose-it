import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Card, CardItem } from './common';

const styles = {
  invitationItemContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameText: {
    fontSize: 22,
  },
  authorText: {
    fontSize: 14,
    opacity: 0.7,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonsText: {
    fontSize: 25,
  },
  button: {
    borderWidth: 1,
    borderRadius: 150,
    alignItems: 'center',
    padding: 10,
    margin: 10,
    width: 50,
    height: 50,
  },

};


const SingleInvitation = ({ invitation, acceptInvitation, rejectInvitation }) => (
  <Card>
    <CardItem style={styles.invitationItemContainer}>
      <View>
        <Text style={styles.nameText}>{invitation.question}</Text>
        <Text style={styles.authorText}>By: {invitation.createdBy}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => acceptInvitation(invitation)}
          style={[styles.button, { borderColor: 'green' }]}
        >
          <Text style={[styles.buttonsText, { color: 'green' }]}>&#10003;</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => rejectInvitation(invitation)}
          style={[styles.button, { borderColor: 'red' }]}
        >
          <Text style={[styles.buttonsText, { color: 'red' }]}>x</Text>
        </TouchableOpacity>
      </View>
    </CardItem>
  </Card>
);

export default SingleInvitation;
