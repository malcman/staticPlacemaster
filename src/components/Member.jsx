import React from 'react';
import PropTypes from 'prop-types';

const classNames = require('classnames');

function Member(props) {
  const memberClass = classNames('Member');
  let group = props.group;
  if (props.group === -1) {
    group = 'None';
  }
  return (
    <li className={memberClass}>
      <p>{group}</p>
      <p>{props.name}</p>
      <p>{props.email}</p>
      <p>{props.campus}</p>
      <p>{props.gender}</p>
      <p>{props.year}</p>
    </li>
  );
}

Member.propTypes = {
  group: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  campus: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
};

export default Member;
