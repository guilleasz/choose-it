import { connect } from 'react-redux';
import Vote from '../components/Vote';
import { voteChoice } from '../actions';

const mapStateToProps = ({ currentUser }) => ({ currentUser });

export default connect(mapStateToProps, { voteChoice })(Vote);
