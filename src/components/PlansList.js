import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardItem } from './common';
import PlanItem from './PlanItem';

const styles = {
  invitationContainer: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  invitationText: {
    fontSize: 18,
    textDecorationLine: 'underline',
  },
  invitationArrow: {
    alignSelf: 'center',
    fontSize: 18,
  },
};

const PlansList = ({ plans, selectPlan, numOfInvitations }) => (
  <ScrollView>
    {numOfInvitations ?
      <TouchableOpacity onPress={() => Actions.invitations()}>
        <CardItem style={styles.invitationContainer}>
          <Text style={styles.invitationText}>
            You have {numOfInvitations} Invitation{numOfInvitations === 1 ? '' : 's'}
          </Text>
          <Text style={styles.invitationArrow}>&#9654;</Text>
        </CardItem>
      </TouchableOpacity>
      : null}
    {Object.keys(plans).map(key => (
      <PlanItem key={key} plan={plans[key]} selectPlan={selectPlan} />
    ))}
  </ScrollView>
);

export default PlansList;
