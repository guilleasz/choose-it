import { connect } from 'react-redux';
import SinglePlan from '../components/SinglePlan';
import { deletePlan, confirmUserVote, unconfirmUserVote } from '../actions';

const mapStateToProps = ({ plans, currentUser }) => ({ plan: plans.selected, currentUser });

export default connect(mapStateToProps, {
  deletePlan,
  confirmUserVote,
  unconfirmUserVote,
})(SinglePlan);
