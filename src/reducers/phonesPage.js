import * as R from 'ramda';
import {
  FETCH_PHONES_SUCCESS,
  LOAD_MORE_PHONES_SUCCESS,
  SEARCH_PHONE
} from '../actions/types';

const initialState = {
  ids: [],
  search: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_PHONES_SUCCESS:
      return R.merge(state, {
        ids: R.pluck('id', action.payload)
      });
    case LOAD_MORE_PHONES_SUCCESS:
      const ids = R.pluck('id', action.payload);
      return R.merge(state, {
        ids: R.concat(state.ids, ids)
      });
    case SEARCH_PHONE:
      return R.merge(state, {
        search: action.payload
      });
    default:
      return state;
  }
}
