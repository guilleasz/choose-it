import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Card, CardItem, Confirm, Button } from './common';
import Choices from './Choices';
import Participants from './Participants';
import Results from './Results';

const styles = {
  view: {
    justifyContent: 'space-between',
    flex: 1,
  },
  deleteContainer: {
    backgroundColor: '#C61F19',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  deleteText: {
    color: '#fff',
    fontSize: 18,
  },
  unconfirmBottom: {
    borderColor: 'red',
  },
  unconforimText: {
    color: 'red'
  },
};

export default class SinglePlan extends React.Component {
  constructor(props) {
    super(props);
    this.onAccept = this.onAccept.bind(this);
    this.onDecline = this.onDecline.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  state = {
    showModal: false,
  }
  onAccept() {
    this.setState({
      showModal: false,
    });
    this.props.deletePlan(this.props.plan);
  }
  onDecline() {
    this.setState({
      showModal: false,
    });
  }
  handleDelete() {
    this.setState({
      showModal: true,
    });
  }
  render() {
    const { plan, currentUser, confirmUserVote, unconfirmUserVote } = this.props;
    return (
      <ScrollView contentContainerStyle={styles.view}>
        {plan.status === 'close' ? <Results winner={plan.winner} /> :
        <View>
          <Choices
            disable={plan.confirms && plan.confirms[currentUser.uid]}
            choices={plan.choices || {}}
          />
          {plan.confirms && plan.confirms[currentUser.uid] ?
            <Button
              style={styles.unconfirmBottom}
              textStyle={styles.unconforimText}
              onPress={() => unconfirmUserVote(plan)}
            >
              Unconfirm Vote
            </Button> :
            <Button onPress={() => confirmUserVote(plan)}>Confirm Vote</Button>}
        </View>
        }
        <Participants confirms={plan.confirms} users={plan.users || {}} />
        {plan.createdBy === currentUser.uid ?
          <View>
            <TouchableOpacity onPress={this.handleDelete}>
              <Card>
                <CardItem style={styles.deleteContainer}>
                  <Text style={styles.deleteText}>Delete Plan</Text>
                </CardItem>
              </Card>
            </TouchableOpacity>
            <Confirm
              onAccept={this.onAccept}
              onDecline={this.onDecline}
              visible={this.state.showModal}
            >
              Are you sure you want to delete {plan.question}?
            </Confirm>
          </View>
          : null
        }
      </ScrollView>
    );
  }
}

