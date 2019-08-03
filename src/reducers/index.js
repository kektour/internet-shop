import { combineReducers } from 'redux';
import phonesReducer from './phones';
import phonesPageReducer from './phonesPage';
import phonePageReducer from './phonePage';
import basketReducer from './basket';
import categoriesReducer from './categories';

export default combineReducers({
  phones: phonesReducer,
  phonesPage: phonesPageReducer,
  phonePage: phonePageReducer,
  basket: basketReducer,
  categories: categoriesReducer
});
