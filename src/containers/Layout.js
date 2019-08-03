import React from 'react';
import Sidebar from '../components/Sidebar';

function Layout({ children }) {
  return (
    <div className='view-container'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-3'>
            <Sidebar />
          </div>
          <div className='col-md-9'>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
