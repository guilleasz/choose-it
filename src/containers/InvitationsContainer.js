import { connect } from 'react-redux';
import Invitations from '../components/Invitations';
import { acceptInvitation, rejectInvitation } from '../actions';

const mapStateToProps = ({ invitations }) => ({ invitations });

export default connect(mapStateToProps, { acceptInvitation, rejectInvitation })(Invitations);
