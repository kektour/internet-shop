import * as R from 'ramda';

export function getPhoneByID(state, id) {
  return R.prop(id, state.phones);
}

export function getPhones(state, ownProps) {
  const activeCategoryId = getActiveCategoryId(ownProps);

  return R.compose(
    R.filter(item => R.contains(state.phonesPage.search, R.prop('name', item))),
    R.when(
      R.always(activeCategoryId),
      R.filter(item => R.equals(activeCategoryId, R.prop('categoryId', item)))
    ),
    R.map(id => getPhoneByID(state, id))
  )(state.phonesPage.ids);
}

export function getRenderedPhonesLength(state) {
  return R.length(state.phonesPage.ids);
}

export function getTotalBasketCount(state) {
  return R.length(state.basket);
}

export function getTotalBasketPrice(state) {
  return R.compose(
    R.sum,
    R.pluck('price'),
    R.map(id => getPhoneByID(state, id))
  )(state.basket);
}

export function getCategories(state) {
  return R.values(state.categories);
}

export function getActiveCategoryId(ownProps) {
  return R.path(['match', 'params', 'id'], ownProps);
}

export function getBasketPhonesWithCount(state) {
  const uniqueIds = R.uniq(state.basket);
  function phoneCount(id) {
    return R.compose(
      R.length,
      R.filter(basketId => R.equals(id, basketId))
    )(state.basket);
  }

  return R.compose(
    R.map(phone => R.assoc('count', phoneCount(phone.id), phone)),
    R.map(id => getPhoneByID(state, id))
  )(uniqueIds);
}
