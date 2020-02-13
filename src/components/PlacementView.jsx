import React from 'react';
import PropTypes from 'prop-types';
import { CSVLink } from 'react-csv';

import GroupManager from './containers/GroupManager/';
import MemberManager from './containers/MemberManager/';


// headers for the CSV file that will be downloaded
const csvMemberHeaders = [
  { label: 'Group', key: 'group_id' },
  { label: 'First', key: 'first' },
  { label: 'Last', key: 'last' },
  { label: 'Email', key: 'email' },
  { label: 'Gender', key: 'gender' },
  { label: 'Grad Standing', key: 'grad_standing' },
];

function getCSVMemberData(flaggedMembers, allGroups) {
  // Return list of objects with member properties
  // for CSVLink component
  const flaggedMemberData = flaggedMembers.map(
    (flagged) => {
      const {
        t_mon: tMon,
        t_tue: tTue,
        t_wed: tWed,
        t_thu: tThu,
        allGroupsInfo,
        placeFlaggedMember,
        ...rest
      } = flagged.props;
      return ({ group_id: 'NONE', ...rest });
    },
  );

  // go through allGroups
  const allMemberData = Object.keys(allGroups).map(
    // create list of objects with expanded member props for each group
    (groupNum) => {
      const group = allGroups[groupNum];
      const groupMembersData = [];
      group.members.forEach((member) => {
        // push expanded member props onto this group's list
        groupMembersData.push({ ...member.props });
      });
      return groupMembersData;
    },
  // reduce list of group lists to a single list
  ).reduce(
    (accum, groupMemberList) => accum.concat([...groupMemberList]),
    flaggedMemberData,
  );
  return allMemberData;
}

function validateBeforeDownload(numFlagged) {
  if (numFlagged) {
    const confMsg = 'There are still unplaced members present.\nProceed with download?';
    const proceed = window.confirm(confMsg);  // eslint-disable-line
    return proceed;
  }
  return true;
}

const PlacementView = (props) => {
  const {
    groupFocus,
    allGroups,
    flaggedMembers,
    sortFlaggedMembers,
    title,
  } = props;
  const flaggedAlert = (flaggedMembers && !flaggedMembers.length) ? null : (
    <div className="alert" />
  );
  const csvData = getCSVMemberData(flaggedMembers, allGroups);
  return (
    <section className="Placement">
      <div id="PlacementHeader">
        <h1 className="placementName">{title}</h1>
        <CSVLink
          id="csvButton"
          headers={csvMemberHeaders}
          data={csvData}
          filename={`${title}_Placement.csv`}
          onClick={() => validateBeforeDownload(flaggedMembers.length)}
        >
        Generate Attendance File
        </CSVLink>
        <ul
          id="placementTabs"
          role="tablist"
        >
          {/* group tab */}
          <li
            id="GroupTag"
            role="tab"
            aria-selected={groupFocus}
            aria-controls="GroupManager"
            onClick={() => props.focusGroups()}
          >
            <h3>Groups</h3>
          </li>

          {/* member tab */}
          <li
            id="MemberTag"
            role="tab"
            aria-selected={!groupFocus}
            aria-controls="MemberManager"
            onClick={() => props.focusMembers()}
          >
            <h3>
            Members
              {flaggedAlert}
            </h3>
          </li>
        </ul>
      </div>
      <GroupManager
        role="tabpanel"
        focused={groupFocus}
        groupData={allGroups}
      />
      <MemberManager
        role="tabpanel"
        focused={!groupFocus}
        groupData={allGroups}
        flaggedMembers={flaggedMembers}
        sortFlaggedHandler={sortFlaggedMembers}
      />
    </section>
  );
};

export default PlacementView;
