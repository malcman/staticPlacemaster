import React from 'react';
import PropTypes from 'prop-types';

const classNames = require('classnames');

function Member(props) {
  const memberClass = classNames('Member');
  let { group_id: group } = props;
  if (group === -1) {
    group = 'None';
  }
  const name = `${props.first} ${props.last}`;
  return (
    <li className={memberClass}>
      <div className="infoRow">
        <p>{group}</p>
        <p>{name}</p>
        <p>{props.email}</p>
        <p>{props.campus}</p>
        <p>{props.gender}</p>
      </div>
    </li>
  );
}

Member.propTypes = {
  group_id: PropTypes.number.isRequired,
  first: PropTypes.string.isRequired,
  last: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  campus: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
};

export default Member;
