import { ADD_INVITATION, DISMISS_INVITATION, ERASE_INVITATION } from '../types';

export default (state = [], action) => {
  switch (action.type) {
    case ADD_INVITATION:
      return [action.payload, ...state];
    case DISMISS_INVITATION: {
      const index = state.findIndex(invitation => invitation.uid === action.uid);
      return [...state.slice(0, index), ...state.slice(index + 1)];
    }
    case ERASE_INVITATION: {
      return [];
    }
    default:
      return state;
  }
};
