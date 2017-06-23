import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Card, CardItem } from './common';

const styles = {
  voteCard: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  },
  pointsText: {
    fontSize: 18,
    opacity: 0.8,
  },
  pointsContainer: {
    borderRightWidth: 2,
    alignSelf: 'stretch',
    borderColor: '#ddd',
    paddingRight: 20,
    justifyContent: 'center',
  },
  labelText: {
    fontSize: 24,
  },
  selected: {
    backgroundColor: '#f7f7f7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.7,
  },
};


export default class Vote extends React.Component {

  getStyle(num) {
    return (this.props.choice.votes &&
      this.props.choice.votes[this.props.currentUser.uid] === num ?
        [styles.voteCard, styles.selected] : styles.voteCard);
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.voteChoice(this.props.uid, 2)}>
          <Card>
            <CardItem style={this.getStyle(2)}>
              <View style={styles.pointsContainer}>
                <Text style={[styles.pointsText, { color: '#24af0c' }]}>+2</Text>
              </View>
              <Text style={[styles.labelText, , { color: '#24af0c' }]}>I REALLY want this</Text>
            </CardItem>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.voteChoice(this.props.uid, 1)}>
          <Card>
            <CardItem style={this.getStyle(1)}>
              <View style={styles.pointsContainer}>
                <Text style={[styles.pointsText, { color: '#22e800' }]}>+1</Text>
              </View>
              <Text style={[styles.labelText, , { color: '#22e800' }]}>I want this</Text>
            </CardItem>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.voteChoice(this.props.uid, 0)}>
          <Card>
            <CardItem style={this.getStyle(0)}>
              <View style={styles.pointsContainer}>
                <Text style={[styles.pointsText, { color: 'grey' }]}> 0</Text>
              </View>
              <Text style={[styles.labelText, , { color: 'grey' }]}>Meh...</Text>
            </CardItem>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.voteChoice(this.props.uid, -1)}>
          <Card>
            <CardItem style={this.getStyle(-1)}>
              <View style={styles.pointsContainer}>
                <Text style={[styles.pointsText, { color: '#fc1400' }]}>-1</Text>
              </View>
              <Text style={[styles.labelText, { color: '#fc1400' }]}>
                I don{'\''}t want this
              </Text>
            </CardItem>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.voteChoice(this.props.uid, -2)}>
          <Card>
            <CardItem style={this.getStyle(-2)}>
              <View style={styles.pointsContainer}>
                <Text style={[styles.pointsText, { color: '#c42719' }]}>-2</Text>
              </View>
              <Text style={[styles.labelText, { color: '#c42719' }]}>
                I REALLY don{'\''}t want this
              </Text>
            </CardItem>
          </Card>
        </TouchableOpacity>
      </View>
    );
  }
}

