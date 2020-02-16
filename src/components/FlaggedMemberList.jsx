import React from 'react';
import PropTypes from 'prop-types';
import FlaggedMember from './FlaggedMember';
import { getNumericTimeVal } from './containers/GroupManager/GroupManager';


function groupIsValid(groupObj, memberData) {
  // checks if group represented by groupObj is a valid group
  // for this FlaggedMember. Checks times in props against groupObj's time.

  // specify mappings for days to availability prop for that specific day
  const dayMappings = {
    Monday: 't_mon',
    Tuesday: 't_tue',
    Wednesday: 't_wed',
    Thursday: 't_thu',
  };
  // get the day for this group
  // format: "Monday 6:00-7:00"
  const [groupDay, groupTimeStr] = groupObj.time.split(' ');

  // get the prop key associated with this day's time availability
  const timeKey = dayMappings[groupDay];

  // get numeric time values for the group's time
  const [groupStartStr, groupEndStr] = groupTimeStr.trim().split('-');
  const groupStart = getNumericTimeVal(groupStartStr.trim());
  const groupEnd = getNumericTimeVal(groupEndStr.trim());

  if (!memberData[timeKey] || memberData[timeKey] === 'null') {
    return false;
  }
  const availableTimes = memberData[timeKey].split(',');
  let validGroup = false;
  availableTimes.forEach((timeStr) => {
    // skip work if a match has already been found
    if (validGroup) return;

    // get start and end times from props
    const digitRegex = /(?<start>\d{1})-(?<end>\d{1})/g;
    // set bounds with times in availability
    let lowerBound = Infinity;
    let upperBound = 0;
    const matches = digitRegex.exec(timeStr.trim());
    if (matches && matches.groups) {
      // format start and end digits into times,
      // get numeric value for comparisons
      lowerBound = getNumericTimeVal(`${matches.groups.start}:00`);
      upperBound = getNumericTimeVal(`${matches.groups.end}:00`);
    }
    // if available within the group's bounds, set true
    if (lowerBound >= groupStart && upperBound <= groupEnd) {
      validGroup = true;
    }
  });
  return validGroup;
}

function getValidGroups(allGroups, memberData) {
  // return object of valid groups that match this member's constraints
  const validGroups = [];
  allGroups.forEach((group) => {
    // only consider valid campus and grad level matches
    if (memberData.campus.includes(group.campus)
      && memberData.grad_standing.includes(group.grad_standing)) {
      // do time comparisons
      if (groupIsValid(group, memberData)) {
        validGroups.push(group);
      }
    }
  });
  return validGroups;
}


const FlaggedMemberList = ({ members, groups }) => (
  <ul id="FlaggedMemberList">
    {members.map((memberData) => {
      const validGroups = getValidGroups(groups, memberData);
      return (
        <FlaggedMember
          key={memberData.email}
          validGroups={validGroups}
          {...memberData}
        />
      );
    })}
  </ul>
);

export default FlaggedMemberList;
