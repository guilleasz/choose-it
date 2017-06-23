import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { CardItem } from './common';

const styles = {
  container: {
    height: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    alignItems: 'center',
    paddingLeft: 20,
    marginBottom: 10,
    marginTop: 5,
  },
  text: {
    fontSize: 22,
    fontWeight: '600',
  },
};

const PlanItem = ({ plan, selectPlan }) => (
  <TouchableOpacity onPress={() => selectPlan(plan)}>
    <CardItem style={styles.container}>
      <Text style={styles.text}>{plan.question}</Text>
    </CardItem>
  </TouchableOpacity>
);

export default PlanItem;
