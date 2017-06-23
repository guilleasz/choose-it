import React from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import _ from 'lodash'
import PlanForm from '../components/PlanForm';
import { addPlan } from '../actions';

class AddPlan extends React.Component {
  constructor(props) {
    super(props);

    this.planChange = this.planChange.bind(this);
    this.userChange = this.userChange.bind(this);
    this.choiceChange = this.choiceChange.bind(this);
    this.addChoice = this.addChoice.bind(this);
    this.addUser = this.addUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.removeChoice = this.removeChoice.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.selectUser = this.selectUser.bind(this);
  }
  state = {
    planValue: '',
    choiceValue: '',
    choices: [],
    userValue: '',
    users: [],
    error: false,
    loading: false,
    filteredUser: [],
    selectedUser: null,
  }


  onSubmit() {
    const { planValue, choices, users } = this.state;
    this.setState({
      loading: true,
      error: false,
    });
    this.props.addPlan(planValue, choices, users)
    .catch(() => {
      this.setState({
        loading: false,
        error: true,
      });
    });
  }

  valueChange(name, value) {
    this.setState({
      [name]: value,
    });
  }
  planChange(value) {
    this.valueChange('planValue', value);
  }
  userChange(value) {
    this.setState({
      userValue: value,
      selectedUser: null,
    });
    this.filterUser(value);
  }
  choiceChange(value) {
    this.valueChange('choiceValue', value);
  }
  addChoice() {
    this.setState({
      choices: [...this.state.choices, this.state.choiceValue],
      choiceValue: '',
    });
  }
  addUser() {
    if (this.state.selectedUser) {
      this.setState({
        users: [...this.state.users, this.state.selectedUser],
        userValue: '',
        selectedUser: null,
      });
    }
  }
  removeChoice(choice) {
    const index = this.state.choices.indexOf(choice);
    this.setState({
      choices: [...this.state.choices.slice(0, index), ...this.state.choices.slice(index + 1)],
    });
  }
  removeUser(idx) {
    this.setState({
      users: [...this.state.users.slice(0, idx), ...this.state.users.slice(idx + 1)],
    });
  }


  filterUser(email) {
    firebase.database()
    .ref('/users')
    .once('value', (snapshot) => {
      this.setState({
        filteredUser: _.map(snapshot.val(), (user, uid) => ({ uid, email: user.email }))
        .filter(user =>
          email &&
          user.email !== this.props.currentUser.email &&
          !user.email.toLowerCase().indexOf(email.toLowerCase()) &&
          !this.state.users.some(includedUser => includedUser.uid === user.uid)),
      });
    });
  }

  selectUser(user) {
    this.setState({
      selectedUser: user,
      userValue: user.email,
      filteredUser: [],
    });
  }

  render() {
    return (<PlanForm
      {...this.state}
      selectUser={this.selectUser}
      planChange={this.planChange}
      userChange={this.userChange}
      choiceChange={this.choiceChange}
      addChoice={this.addChoice}
      removeChoice={this.removeChoice}
      addUser={this.addUser}
      removeUser={this.removeUser}
      onSubmit={this.onSubmit}
      action="Add Plan"
    />);
  }
}

const mapStateToProps = ({ currentUser }) => ({ currentUser });

export default connect(mapStateToProps, { addPlan })(AddPlan);
