import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchPhones,
  loadMorePhones,
  addPhoneToBasket,
  fetchCategories
} from '../actions';
import { getPhones } from '../selectors';
import { Link } from 'react-router-dom';
import * as R from 'ramda';

function Phones({
  phones,
  fetchPhones,
  loadMorePhones,
  addPhoneToBasket,
  fetchCategories
}) {
  useEffect(() => {
    fetchPhones();
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  function renderPhone(phone, index) {
    const shortDescription = `${R.take(60, phone.description)}...`;

    return (
      <div className='col-sm-4 col-lg-4 col-md-4 book-list' key={index}>
        <div className='thumbnail'>
          <img className='img-thumbnail' src={phone.image} alt={phone.name} />
          <div className='caption'>
            <h4 className='float-right'>${phone.price}</h4>
            <h4>
              <Link to={`/phones/${phone.id}`}>{phone.name}</Link>
            </h4>
            <p>{shortDescription}</p>
            <p className='itemButton'>
              <button
                className='btn btn-primary'
                onClick={() => {
                  addPhoneToBasket(phone.id);
                }}
              >
                Buy Now!
              </button>
              <Link to={`/phones/${phone.id}`} className='btn btn-default'>
                More info
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className='books row'>
        {phones.map((phone, index) => renderPhone(phone, index))}
      </div>
      <div className='row'>
        <div className='col-md-12'>
          <button
            className='float-right btn btn-primary'
            onClick={loadMorePhones}
          >
            Load more
          </button>
        </div>
      </div>
    </div>
  );
}

Phones.propTypes = {
  phones: PropTypes.array.isRequired,
  fetchPhones: PropTypes.func.isRequired,
  loadMorePhones: PropTypes.func.isRequired,
  addPhoneToBasket: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    phones: getPhones(state, ownProps)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPhones: () => dispatch(fetchPhones()),
    loadMorePhones: () => dispatch(loadMorePhones()),
    addPhoneToBasket: id => dispatch(addPhoneToBasket(id)),
    fetchCategories: () => dispatch(fetchCategories())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Phones);
