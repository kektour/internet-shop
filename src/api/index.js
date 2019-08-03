import phones from './mockPhones';
import categories from './mockCategories';
import * as R from 'ramda';

export function fetchPhones() {
  return new Promise(resolve => resolve(phones));
}

export function loadMorePhones({ offset }) {
  return new Promise(resolve => resolve(phones));
}

export function fetchPhoneById(id) {
  return new Promise((resolve, reject) => {
    const phone = R.find(R.propEq('id', id), phones);
    return resolve(phone);
  });
}

export function fetchCategories() {
  return new Promise(resolve => resolve(categories));
}
