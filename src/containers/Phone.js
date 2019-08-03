import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPhoneById, addPhoneToBasket } from '../actions';
import { getPhoneByID } from '../selectors';
import * as R from 'ramda';
import BasketCart from '../components/BasketCart';
import { Link } from 'react-router-dom';

function Phone({ fetchPhoneById, match, phone, addPhoneToBasket }) {
  useEffect(() => {
    fetchPhoneById(match.params.id);
    // eslint-disable-next-line
  }, []);

  function renderFields() {
    const columnFields = R.compose(
      R.toPairs,
      R.pick([
        'cpu',
        'camera',
        'size',
        'weight',
        'display',
        'battery',
        'memory'
      ])
    )(phone);

    return columnFields.map(([key, value]) => (
      <div className='column' key={key}>
        <div className='ab-details-title'>
          <p>{key}</p>
        </div>
        <div className='ab-details-info'>{value}</div>
      </div>
    ));
  }

  function renderContent() {
    return (
      <div className='thumbnail'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              <img
                className='img-thumbnail'
                src={phone.image}
                alt={phone.name}
              />
            </div>
            <div className='col-md-6'>{renderFields()}</div>
            <div className='caption-full'>
              <h4 className='float-right'>${phone.price}</h4>
              <h4>{phone.name}</h4>
              <p>{phone.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderSidebar() {
    return (
      <div>
        <p className='lead'>Quick shop</p>
        <BasketCart />
        <div className='form-group'>
          <h1>{phone.name}</h1>
          <h2>${phone.price}</h2>
        </div>
        <Link to='/' className='btn btn-info btn-block'>
          Back to store
        </Link>
        <button
          type='button'
          className='btn btn-success btn-block'
          onClick={() => {
            addPhoneToBasket(phone.id);
          }}
        >
          Add to cart
        </button>
      </div>
    );
  }

  return (
    <div className='view-container'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-9'>{phone && renderContent()}</div>
          <div className='col-md-3'>{phone && renderSidebar()}</div>
        </div>
      </div>
    </div>
  );
}

Phone.propTypes = {
  fetchPhoneById: PropTypes.func.isRequired,
  phone: PropTypes.object
};

function mapStateToProps(state) {
  return {
    phone: getPhoneByID(state, state.phonePage.id)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPhoneById: id => dispatch(fetchPhoneById(id)),
    addPhoneToBasket: id => dispatch(addPhoneToBasket(id))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Phone);
