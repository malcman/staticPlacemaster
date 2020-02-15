import React from 'react';
import PropTypes from 'prop-types';
import Group from './Group';

function getNumericTimeVal(timeStr) {
  // returns a number representing the time of the week
  // to allow for more accurate sorting
  // Day Value: 4th digit
  // Time value: remaining digits of start time

  // "Monday 6:30-7:30" => 1630
  // "Thursday 5:00-6:00" => 4500
  const dayValues = {
    Monday: 1000,
    Tuesday: 2000,
    Wednesday: 3000,
    Thursday: 4000,
    Friday: 5000,
    Saturday: 6000,
    Sunday: 7000,
  };
  let numericTimeVal = 0;
  // gets day and first time period
  const regex = /^(?<day>\w+)? ?(?<time>\d:\d+)/g;
  const matches = regex.exec(timeStr);
  if (matches && matches.groups) {
    if (matches.groups.day) {
      numericTimeVal += dayValues[matches.groups.day];
    }
    let hourStr = matches.groups.time;
    hourStr = hourStr.replace(':', '');
    numericTimeVal += Number(hourStr);
  }
  return numericTimeVal;
}

const GroupList = ({ groups }) => (
  <ul id="GroupList">
    {groups.map((groupData) => (
      <Group
        key={groupData.group_id}
        number={groupData.group_id}
        time_numeric={getNumericTimeVal(groupData.time)}
        gradStanding={groupData.grad_standing}
        {...groupData}
      />
    ))}
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
