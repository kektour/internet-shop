import * as R from 'ramda';
import {
  ADD_PHONE_TO_BASKET,
  REMOVE_PHONE_FROM_BASKET,
  CLEAN_BASKET
} from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_PHONE_TO_BASKET:
      return R.append(action.payload, state);
    case REMOVE_PHONE_FROM_BASKET:
      return R.without(R.of(action.payload), state);
    case CLEAN_BASKET:
      return [];
    default:
      return state;
  }
}
