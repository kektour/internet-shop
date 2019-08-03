import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTotalBasketCount, getTotalBasketPrice } from '../selectors';

function BasketCart({ totalBasketCount, totalPrice }) {
  return (
    <div className='cart'>
      <div className='dropdown'>
        <Link
          to='/basket'
          id='dLabel'
          className='btn btn-inverse btn-block btn-lg'
        >
          <i className='fa fa-shopping-cart' />{' '}
          <span>
            {totalBasketCount} item(s) - ${totalPrice}
          </span>
        </Link>
      </div>
    </div>
  );
}

BasketCart.propTypes = {
  totalBasketCount: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired
};

function mapStateToProps(state) {
  return {
    totalBasketCount: getTotalBasketCount(state),
    totalPrice: getTotalBasketPrice(state)
  };
}

export default connect(
  mapStateToProps,
  null
)(BasketCart);
