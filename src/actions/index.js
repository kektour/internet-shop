import {
  FETCH_PHONES_START,
  FETCH_PHONES_SUCCESS,
  FETCH_PHONES_FAILURE,
  LOAD_MORE_PHONES_START,
  LOAD_MORE_PHONES_SUCCESS,
  LOAD_MORE_PHONES_FAILURE,
  FETCH_PHONE_BY_ID_START,
  FETCH_PHONE_BY_ID_SUCCESS,
  FETCH_PHONE_BY_ID_FAILURE,
  ADD_PHONE_TO_BASKET,
  SEARCH_PHONE,
  FETCH_CATEGORIES_START,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  REMOVE_PHONE_FROM_BASKET,
  CLEAN_BASKET
} from './types';

import {
  fetchPhones as fetchPhonesApi,
  loadMorePhones as loadMorePhonesApi,
  fetchPhoneById as fetchPhoneByIdApi,
  fetchCategories as fetchCategoriesApi
} from '../api';
import { getRenderedPhonesLength } from '../selectors';

export function fetchPhones() {
  return async function(dispatch) {
    dispatch({ type: FETCH_PHONES_START });
    try {
      const phones = await fetchPhonesApi();
      dispatch({
        type: FETCH_PHONES_SUCCESS,
        payload: phones
      });
    } catch (err) {
      dispatch({
        type: FETCH_PHONES_FAILURE,
        payload: err,
        err: true
      });
    }
  };
}

export function loadMorePhones() {
  return async function(dispatch, getState) {
    const offset = getRenderedPhonesLength(getState());

    dispatch({ type: LOAD_MORE_PHONES_START });
    try {
      const phones = await loadMorePhonesApi({ offset });
      dispatch({
        type: LOAD_MORE_PHONES_SUCCESS,
        payload: phones
      });
    } catch (err) {
      dispatch({
        type: LOAD_MORE_PHONES_FAILURE,
        payload: err,
        err: true
      });
    }
  };
}

export function fetchPhoneById(id) {
  return async function(dispatch) {
    dispatch({ type: FETCH_PHONE_BY_ID_START });
    try {
      const phone = await fetchPhoneByIdApi(id);
      dispatch({
        type: FETCH_PHONE_BY_ID_SUCCESS,
        payload: phone
      });
    } catch (err) {
      dispatch({
        type: FETCH_PHONE_BY_ID_FAILURE,
        payload: err,
        err: true
      });
    }
  };
}

export function addPhoneToBasket(id) {
  return {
    type: ADD_PHONE_TO_BASKET,
    payload: id
  };
}

export function searchPhone(text) {
  return {
    type: SEARCH_PHONE,
    payload: text
  };
}

export function fetchCategories() {
  return async function(dispatch) {
    dispatch({ type: FETCH_CATEGORIES_START });
    try {
      const categories = await fetchCategoriesApi();
      dispatch({
        type: FETCH_CATEGORIES_SUCCESS,
        payload: categories
      });
    } catch (err) {
      dispatch({
        type: FETCH_CATEGORIES_FAILURE,
        payload: err,
        err: true
      });
    }
  };
}

export function removePhoneFromBasket(id) {
  return {
    type: REMOVE_PHONE_FROM_BASKET,
    payload: id
  };
}

export function cleanBasket() {
  return {
    type: CLEAN_BASKET
  };
}

export function basketCheckout(phones) {
  return function() {
    alert(JSON.stringify(phones));
  };
}
