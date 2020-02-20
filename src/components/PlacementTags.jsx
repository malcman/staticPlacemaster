import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/PlacementView.module.scss';

const PlacementTags = (props) => {
  const {
    focusGroups,
    focusMembers,
    numUnplaced,
    groupFocus,
  } = props;
  const flaggedAlert = (!numUnplaced) ? null : (
    <div className={styles.alert} />
  );
  return (
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
        onClick={() => focusGroups()}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            focusGroups();
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
        onClick={() => focusMembers()}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            focusMembers();
          }
        }}
      >
        <h3>
        Members
          {flaggedAlert}
        </h3>
      </li>
    </ul>
  );
};

PlacementTags.propTypes = {
  focusMembers: PropTypes.func.isRequired,
  focusGroups: PropTypes.func.isRequired,
  numUnplaced: PropTypes.number.isRequired,
  groupFocus: PropTypes.bool.isRequired,
};

export default PlacementTags;
