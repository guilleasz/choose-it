import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PlansList from '../components/PlansList';
import { fetchPlans, fetchPlan, fetchInvitations, removeSelectedPlan } from '../actions';

class Plans extends React.Component {

  constructor(props) {
    super(props);
    this.selectPlan = this.selectPlan.bind(this);
  }

  componentWillMount() {
    this.props.fetchPlans();
    this.props.fetchInvitations();
    this.props.removeSelectedPlan();
  }

  selectPlan(plan) {
    this.props.fetchPlan(plan);
    Actions.singlePlan({ title: plan.question });
  }

  render() {
    return (<PlansList
      numOfInvitations={this.props.numOfInvitations}
      selectPlan={this.selectPlan}
      plans={this.props.plans}
    />);
  }
}

const mapStateToProps = ({ plans, invitations }) => ({
  plans: plans.entities,
  numOfInvitations: invitations.length,
});

export default connect(mapStateToProps, {
  fetchPlans,
  fetchPlan,
  fetchInvitations,
  removeSelectedPlan,
})(Plans);
