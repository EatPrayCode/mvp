import React from 'react';

import PropTypes from 'prop-types';

import MaterialNavbar from '../Shared/MaterialNavbar';
import { Container } from '@mui/material';

const BlankLayout = ({ children }) => {
  return (
    <React.Fragment>
      <MaterialNavbar />
      <div>{children}</div>
    </React.Fragment >
  );
};

BlankLayout.propTypes = {
  children: PropTypes.any,
};

export default BlankLayout;
