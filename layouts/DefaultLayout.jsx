import React from 'react';

import PropTypes from 'prop-types';

import MaterialNavbar from '../Shared/MaterialNavbar';
import BottomNavigationBar from '../Shared/BottomNavigation';

const DefaultLayout = ({ children }) => {
  return (
    <React.Fragment>
      <MaterialNavbar />
      <div>{children}</div>
      <BottomNavigationBar />
    </React.Fragment >
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.any,
};

export default DefaultLayout;
