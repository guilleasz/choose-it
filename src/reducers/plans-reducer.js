import {
  SET_SELECTED_PLAN,
  PUSH_PLAN,
  ADD_USER_VOTE,
  TAKE_PLAN_FROM_LIST,
  REMOVE_SELECTED_PLAN,
  CONFIRM_VOTE,
  UNCONFIRM_VOTE,
  SET_WINNER,
  CLOSE_PLAN
} from '../types';

const initialState = {
  entities: {},
  selected: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PUSH_PLAN:
      return { ...state, entities: { ...state.entities, [action.key]: action.payload } };
    case SET_SELECTED_PLAN:
      return { ...state, selected: action.payload };
    case TAKE_PLAN_FROM_LIST:
      return Object.keys(state.entities).reduce((newState, uid) => {
        if (uid === action.uid) return newState;
        newState.entities[uid] = { ...state.entities[uid] };
        return newState;
      }, { ...state, entities: {} });
    case ADD_USER_VOTE:
      return {
        ...state,
        selected: {
          ...state.selected,
          choices: {
            ...state.selected.choices,
            [action.uid]: {
              ...state.selected.choices[action.uid],
              votes: {
                ...state.selected.choices[action.uid].votes,
                [action.userId]: action.payload,
              },
            },
          },
        },
      };
    case REMOVE_SELECTED_PLAN:
      return { ...state, selected: {} };
    case CONFIRM_VOTE:
      return {
        ...state,
        selected: {
          ...state.selected,
          confirms: {
            ...state.selected.confirms,
            [action.uid]: true,
          },
        },
      };
    case UNCONFIRM_VOTE:
      return Object.keys(state.selected.confirms).reduce((newState, uid) => {
        if (uid === action.uid) return newState;
        newState.selected.confirms[uid] = true;
        return newState;
      }, { ...state, selected: { ...state.selected, confirms: {} } });
    case SET_WINNER:
      return {
        ...state,
        selected: {
          ...state.selected,
          winner: action.payload,
        },
      };
    case CLOSE_PLAN:
      return {
        ...state,
        selected: {
          ...state.selected,
          status: 'close',
        },
      };
    default:
      return state;
  }
};
