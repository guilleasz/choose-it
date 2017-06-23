import React from 'react';
import { View, Text } from 'react-native';
import { Card, CardItem } from './common';

const styles = {
  container: {
    marginTop: 20,
    padding: 15,
  },
  header: {
    fontSize: 22,
  },
  emailContainer: {
    padding: 15,
  },
  emailText: {
    fontSize: 18,
  },
  cofirmedText: {
    color: 'green',
    alignSelf: 'center',
    paddingLeft: 10,
    fontSize: 22,
  },
};

const Participants = ({ users, confirms }) => (
  <View style={styles.container}>
    <Text style={styles.header}>Participants:</Text>
    <Card>
      {Object.keys(users).map(key => (
        <CardItem style={styles.emailContainer} key={key}>
          <Text style={styles.emailText}>{users[key]}</Text>
          {confirms && confirms[key] ?
            <Text style={styles.cofirmedText}>&#10003;</Text>
            : null
          }
        </CardItem>),
      )}
    </Card>
  </View>
);


export default Participants;
