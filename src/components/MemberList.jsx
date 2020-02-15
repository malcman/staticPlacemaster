import React from 'react';
import PropTypes from 'prop-types';
import Member from './Member';

const MemberList = ({ members }) => (
  <ul id="MemberList">
    {members.map((memberData) => (
      <Member key={memberData.email} {...memberData} />
    ))}
  </ul>
);

export default MemberList;
