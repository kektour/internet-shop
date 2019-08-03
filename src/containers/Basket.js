import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBasketPhonesWithCount, getTotalBasketPrice } from '../selectors';
import * as R from 'ramda';
import { removePhoneFromBasket, cleanBasket, basketCheckout } from '../actions';
import { Link } from 'react-router-dom';

function Basket({
  phones,
  totalPrice,
  removePhoneFromBasket,
  cleanBasket,
  basketCheckout
}) {
  const isBasketEmpty = R.isEmpty(phones);

  function renderContent() {
    return (
      <div>
        {isBasketEmpty && <div>Your shopping cart is empty</div>}

        <div className='table-responsive'>
          <table className='table-bordered table-striped table-condensed cf'>
            <tbody>
              {phones.map((phone, index) => (
                <tr key={index} className='item-checout'>
                  <td className='first-column-checkout'>
                    <img
                      className='img-thumbnail'
                      src={phone.image}
                      alt={phone.name}
                    />
                  </td>
                  <td>{phone.name}</td>
                  <td>${phone.price}</td>
                  <td>{phone.count}</td>
                  <td>
                    <span
                      className='delete-cart'
                      onClick={() => {
                        removePhoneFromBasket(phone.id);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {R.not(isBasketEmpty) && (
          <div className='row'>
            <div className='float-right total-user-checkout'>
              <b>Total: </b>${totalPrice}
            </div>
          </div>
        )}
      </div>
    );
  }

  function renderSidebar() {
    return (
      <div>
        <Link className='btn btn-info' to='/'>
          <i className='fa fa-info-circle' /> <span>Continue shopping</span>
        </Link>
        {R.not(isBasketEmpty) && (
          <div>
            <button onClick={cleanBasket} className='btn btn-danger'>
              <i className='fa fa-trash' /> Clear card
            </button>
            <button
              className='btn btn-success'
              onClick={() => {
                basketCheckout(phones);
              }}
            >
              <i className='fa fa-envelope' /> Checkout
            </button>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className='view-container'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-9'>{renderContent()}</div>
          <div className='col-md-3 btn-user-checkout'>{renderSidebar()}</div>
        </div>
      </div>
    </div>
  );
}

Basket.propTypes = {
  phones: PropTypes.array.isRequired,
  totalPrice: PropTypes.number.isRequired,
  removePhoneFromBasket: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    phones: getBasketPhonesWithCount(state),
    totalPrice: getTotalBasketPrice(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removePhoneFromBasket: id => dispatch(removePhoneFromBasket(id)),
    cleanBasket: () => dispatch(cleanBasket()),
    basketCheckout: phones => dispatch(basketCheckout(phones))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Basket);
