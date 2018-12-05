import { ADD_DIV } from '../actions/types';

const initialState = {
  divs: [],
  div: {},
}

export default function(state=initialState, action) {
  switch(action.type) {
    case ADD_DIV:

      break;
    default:
      return state;
  }
}
