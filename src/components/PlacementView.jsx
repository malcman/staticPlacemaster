import React from 'react';
import PropTypes from 'prop-types';
import { CSVLink } from 'react-csv';

import GroupManager from './containers/GroupManager/GroupManager';
import MemberManager from './containers/MemberManager/MemberManager';
import styles from '../styles/PlacementView.module.scss';

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
    numUnplaced,
    title,
  } = props;
  const flaggedAlert = (!numUnplaced) ? null : (
    <div className="alert" />
  );
  // const csvData = getCSVMemberData(flaggedMembers, allGroups);
  const csvData = '';
  return (
    <section className={styles.Placement}>
      <div id={styles.PlacementHeader}>
        <h1 className={styles.placementName}>{title}</h1>
        <CSVLink
          id={styles.csvButton}
          headers={csvMemberHeaders}
          data={csvData}
          filename={`${title}_Placement.csv`}
          onClick={() => validateBeforeDownload(numUnplaced)}
        >
        Generate Attendance File
        </CSVLink>
        <ul
          id={styles.placementTabs}
          role="tablist"
        >
          {/* group tab */}
          <li
            id="GroupTag"
            role="tab"
            tabIndex="0"
            aria-selected={groupFocus}
            aria-controls="GroupManager"
            onClick={() => props.focusGroups()}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                props.focusGroups();
              }
            }}
          >
            <h3>Groups</h3>
          </li>

          {/* member tab */}
          <li
            id="MemberTag"
            role="tab"
            tabIndex="0"
            aria-selected={!groupFocus}
            aria-controls="MemberManager"
            onClick={() => props.focusMembers()}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                props.focusMembers();
              }
            }}
          >
            <h3>
            Members
              {flaggedAlert}
            </h3>
          </li>
        </ul>
      </div>
      <GroupManager />
      <MemberManager />
    </section>
  );
};

PlacementView.propTypes = {
  // indicates focus on GroupManager or MemberManager
  groupFocus: PropTypes.bool,
  // length of unplaced member list
  numUnplaced: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

PlacementView.defaultProps = {
  groupFocus: true,
};

export default PlacementView;
