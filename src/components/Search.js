import React, { useState } from 'react';
import { connect } from 'react-redux';

import { searchPhone } from '../actions';

function Search({ searchPhone }) {
  const [text, setText] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    searchPhone(text);
  }

  return (
    <div className='card card-body bg-light blosd' style={{ marginBottom: 20 }}>
      <h3 className='lead'>Quick shop</h3>
      <form className='input-group' onSubmit={handleSubmit}>
        <input
          type='text'
          className='form-control'
          value={text}
          onChange={e => {
            setText(e.target.value);
          }}
        />
        <div className='input-group-append'>
          <button className='btn btn-outline-secondary'>
            <span className='fa fa-search' />
          </button>
        </div>
      </form>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    searchPhone: val => dispatch(searchPhone(val))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Search);
