import React from 'react';
import PropTypes from 'prop-types';
import Member from './Member';

const MemberList = ({ members, sortFunc }) => {
  let placedSection = null;
  if (members) {
    // statement
    placedSection = (
      <ul id="MemberList">
        {members.map((memberData) => (
          <Member key={memberData.email} {...memberData} />
        )).sort(sortFunc)}
      </ul>
    );
  }
  return placedSection;
};

export default MemberList;
