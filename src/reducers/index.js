import { combineReducers } from 'redux';
import currentUser from './currentUser-reducer';
import plans from './plans-reducer';
import invitations from './invitations-reducer';

export default combineReducers({
  currentUser,
  plans,
  invitations,
});
