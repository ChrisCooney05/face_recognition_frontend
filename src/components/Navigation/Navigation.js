import React from 'react'

function Navigation({ onRouteChange }) {
  return (
    <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <p onClick={() => onRouteChange('signIn')} className='f3 dim link underline pointer pa3 black'>Sign Out</p>
    </nav>
  );
}

export default Navigation