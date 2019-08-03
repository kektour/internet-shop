import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getCategories, getActiveCategoryId } from '../selectors';
import { Link, withRouter } from 'react-router-dom';
import * as R from 'ramda';

function Categories({ categories, activeCategoryId }) {
  function renderCategory(category, index) {
    const getActiveState = R.propEq('id', activeCategoryId);
    const linkClass = classnames(
      { 'list-group-item': true },
      { active: getActiveState(category) }
    );

    return (
      <Link key={index} to={`/categories/${category.id}`} className={linkClass}>
        {category.name}
      </Link>
    );
  }

  function renderAllCategories() {
    const linkClass = classnames(
      { 'list-group-item': true },
      { active: R.isNil(activeCategoryId) }
    );

    return (
      <Link to='/' className={linkClass}>
        All
      </Link>
    );
  }

  return (
    <div className='card card-body bg-light'>
      <h4>Brand</h4>
      <div className='list-group'>
        {renderAllCategories()}
        {categories.map((category, index) => renderCategory(category, index))}
      </div>
    </div>
  );
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  activeCategoryId: PropTypes.string
};

function mapStateToProps(state, ownProps) {
  return {
    categories: getCategories(state),
    activeCategoryId: getActiveCategoryId(ownProps)
  };
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    null
  )
)(Categories);
