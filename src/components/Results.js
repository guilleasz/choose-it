import React from 'react';
import { View, Text } from 'react-native';

const styles = {
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    fontSize: 32,
    textAlign: 'center',
  },
};

const Results = ({ winner }) => (
  <View style={styles.container}>
    <Text style={styles.text}>The winner is {winner}</Text>
  </View>
);

export default Results;
