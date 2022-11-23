import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'next/link';
import { FaAngleLeft } from 'react-icons/fa';

const Breadcrumb = ({ pageTitle, prevUrl }) => {
  return (
    <div className="breadcrumb-area bg-color--grey space-y--15">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-3">
            <Link to={process.env.PUBLIC_URL + prevUrl} className="back-link">
              {' '}
              <FaAngleLeft /> Back
            </Link>
          </div>
          <div className="col-6">
            <h4 className="page-title text-center">{pageTitle}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

Breadcrumb.propTypes = {
  pageTitle: PropTypes.string,
  prevUrl: PropTypes.string,
};

export default Breadcrumb;
