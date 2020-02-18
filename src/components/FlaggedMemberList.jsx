// List that renders unplaced/flagged members and sorts with current sort
import React from 'react';
import PropTypes from 'prop-types';
import FlaggedMember from './FlaggedMember';

const FlaggedMemberList = ({ members, sortFunc }) => (
  <ul id="FlaggedMemberList">
    {members.map((memberData) => (
      <FlaggedMember
        key={memberData.email}
        {...memberData}
      />
    )).sort(sortFunc)}
  </ul>
);

FlaggedMemberList.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape({
    campus: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    first: PropTypes.string.isRequired,
    last: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    grad_standing: PropTypes.string.isRequired,

    // strings containing time availability per day
    t_mon: PropTypes.string.isRequired,
    t_tue: PropTypes.string.isRequired,
    t_wed: PropTypes.string.isRequired,
    t_thu: PropTypes.string.isRequired,
  })).isRequired,
  sortFunc: PropTypes.func.isRequired,
};

export default FlaggedMemberList;
