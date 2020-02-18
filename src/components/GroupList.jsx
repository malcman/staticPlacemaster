import React from 'react';
import PropTypes from 'prop-types';
import Group from './Group';
import { getNumericTimeVal } from '../helpers/groups';

const GroupList = ({ groups, members, sortFunc }) => (
  <ul id="GroupList">
    {groups.map((groupData) => {
      const memberInfo = [];
      groupData.members.forEach((memberIndex) => {
        memberInfo.push(members[memberIndex]);
      });
      return (
        <Group
          key={groupData.group_id}
          number={groupData.group_id}
          time_numeric={getNumericTimeVal(groupData.time)}
          {...groupData}
          members={memberInfo}
        />
      );
    }).sort(sortFunc)}
  </ul>
);

GroupList.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      group_id: PropTypes.number.isRequired,
      time: PropTypes.string.isRequired,
      campus: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default GroupList;
