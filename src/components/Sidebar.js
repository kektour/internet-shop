import React from 'react';

import BasketCart from './BasketCart';
import Search from './Search';
import Categories from './Categories';

function Sidebar() {
  return (
    <div>
      <BasketCart />
      <Search />
      <Categories />
    </div>
  );
}

export default Sidebar;
