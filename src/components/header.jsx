import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import PlacemasterLogo from './PlacemasterLogo';

const Header = ({ siteTitle }) => (
  <header>
    <div
      id="logoContainer"
    >
      <Link
        to="/"
        style={{
          color: 'white',
          textDecoration: 'none',
        }}
      >
        <PlacemasterLogo />
      </Link>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: '',
};

export default Header;
