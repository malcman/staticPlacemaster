import React from 'react';

const classNames = require('classnames');

function Member(props) {
  const memberClass = classNames('Member');
  return (
    <li className={memberClass}>
      <p>{props.groupNumber}</p>
      <p>{props.name}</p>
      <p>{props.email}</p>
      <p>{props.campus}</p>
      <p>{props.gender}</p>
      <p>{props.year}</p>
    </li>
  );
}

export default Member;
