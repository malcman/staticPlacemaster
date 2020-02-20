import React from 'react';
import PropTypes from 'prop-types';
import { CSVLink } from 'react-csv';

import styles from '../styles/PlacementView.module.scss';

import GroupManager from './containers/GroupManager/GroupManager';
import MemberManager from './containers/MemberManager/MemberManager';

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
    csvHeaders,
    csvData,
  } = props;
  const flaggedAlert = (!numUnplaced) ? null : (
    <div className={styles.alert} />
  );
  return (
    <section className={styles.Placement}>
      <div id={styles.PlacementHeader}>
        <h1 className={styles.placementName}>{title}</h1>
        <CSVLink
          id={styles.csvButton}
          headers={csvHeaders}
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
