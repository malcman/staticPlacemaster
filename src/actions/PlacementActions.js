import React from 'react';
import { navigate } from 'gatsby';
import {
  REQUEST_PLACEMENT,
  RECEIVE_PLACEMENT,
  INVALIDATE_PLACEMENT,
  LOAD_PLACEMENT,
  UPDATE_TITLE,
} from './actionTypes';
import Member from '../components/Member';
import FlaggedMember from '../components/FlaggedMember';

export function updateTitle(title) {
  return {
    type: UPDATE_TITLE,
    title,
  };
}

export function invalidatePlacement() {
  return {
    type: INVALIDATE_PLACEMENT,
  };
}

export function receivePlacement(data) {
  return {
    type: RECEIVE_PLACEMENT,
    data,
  };
}

export function requestPlacement(formData) {
  return {
    type: REQUEST_PLACEMENT,
    formData,
  };
}

function updateGroupData(allGroups, groupData, member = null) {
  // if this groupID is not yet in group data,
  // create appropriate object
  // regardless, add new member to group
  const groupID = groupData.group_id;
  if (!allGroups.hasOwnProperty(groupID)) {  // eslint-disable-line
    allGroups[groupID] = {
      members: [],
      size: 0,
      time: groupData.time,
      campus: groupData.campus,
      gradStanding: groupData.grad_standing,
    };
  }
  if (member) {
    allGroups[groupID].members.push(member);
    allGroups[groupID].size += 1;
  }
}

function loadGroups(allGroups, rawGroupData) {
  // populate group data
  rawGroupData.forEach((groupData) => {
    updateGroupData(allGroups, groupData);
  });
}

function loadMembers(allGroups, rawGroupData, rawMemberData) {
  rawMemberData.forEach((memberData) => {
    const newMember = (
      <Member
        {...memberData}
        key={memberData.email}
      />
    );
    const groupInfo = rawGroupData[memberData.group_id - 1];
    updateGroupData(allGroups, groupInfo, newMember);
  });
}

function loadFlagged(rawUnplacedData, allGroupsInfo) {
  // rawUnplaced data is list response from optimization
  // containing objects representing unplaced members
  // allGroupsInfo is object containing full group information
  // without lists of associated Members
  const flaggedMembers = [];

  // add flagged members
  rawUnplacedData.forEach((memberData) => {
    const fullName = `${memberData.first} ${memberData.last}`;
    const newFlagged = (
      <FlaggedMember
        {...memberData}
        key={fullName}
        allGroupsInfo={allGroupsInfo}
        // placeFlaggedMember={this.placeFlaggedMember}
      />
    );
    flaggedMembers.push(newFlagged);
  });
  return flaggedMembers;
}

export function loadPlacement(placementResponse = {}) {
  const allGroups = {};
  let flaggedMembers = [];

  // populate group data
  if (placementResponse.groups) {
    loadGroups(allGroups, placementResponse.groups);
  }

  // add placed members
  if (placementResponse.placed) {
    loadMembers(allGroups, placementResponse.groups, placementResponse.placed);
  }

  // add flagged/unplaced members
  if (placementResponse.unplaced) {
    // create object with group data that does not include
    // huge lists of members
    const allGroupsInfo = {};
    Object.keys(allGroups).forEach((group) => {
      const { members, ...groupInfo } = allGroups[group];
      allGroupsInfo[group] = groupInfo;
    });
    flaggedMembers = loadFlagged(placementResponse.unplaced, allGroupsInfo);
  }
  return {
    type: LOAD_PLACEMENT,
    allGroups,
    flaggedMembers,
  };
}

export function fetchPlacement(formData, actionURL) {
  return (dispatch) => {
    // notify the store we have requested an async call
    dispatch(requestPlacement(formData));

    // send the form data to actionURL
    const xhr = new XMLHttpRequest();
    xhr.open('POST', actionURL, true);
    xhr.setRequestHeader('credentials', 'same-origin');
    xhr.onload = () => {
      // make sure all is kosher
      if (xhr.status >= 200 && xhr.status < 300) {
        // get JSON data to send to placement page
        const data = JSON.parse(xhr.response);
        dispatch(receivePlacement(data));
        dispatch(loadPlacement(data));
        navigate('/placement/');
      }
    };
    xhr.onerror = () => {
      const alertText = 'There was a problem submitting the form.\n Please make sure the right files have been selected and try again.';
      window.alert(alertText);
      // this.props.backHandler(this.props.index);
      dispatch(invalidatePlacement());
    };
    xhr.send(formData);
  };
}
