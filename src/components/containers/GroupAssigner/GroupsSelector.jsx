// Helper component to display various group lists in GroupAssigner.
// Handles switching between all groups and valid groups with supplied props.
import React from 'react';
import PropTypes from 'prop-types';
import styles from './GroupsSelector.module.scss';

const classNames = require('classnames');

const GroupsSelector = ({ setShowAllGroups, showAllGroups, identifier }) => {
  const selectValidsID = `${identifier}ValidGroupsSelector`;
  const selectAllId = `${identifier}AllGroupsSelector`;
  const selectorClass = styles.groupsSelector;
  return (
    <div className={styles.groupsSelectorContainer}>
      { /* "All Groups" header */ }
      <label htmlFor={selectAllId}>
        <div
          className={classNames(selectorClass, { [styles.active]: showAllGroups })}
        >
          All Groups
        </div>
        <input
          id={selectAllId}
          type="radio"
          value="All Groups"
          checked={showAllGroups}
          onChange={() => setShowAllGroups(true)}
        />
      </label>

      { /* "Valid Groups" header */ }
      <label htmlFor={selectValidsID}>
        <div
          className={classNames(selectorClass, { [styles.active]: !showAllGroups })}
        >
          Valid Groups
        </div>
        <input
          id={selectValidsID}
          type="radio"
          value="Valid Groups"
          checked={!showAllGroups}
          onChange={() => setShowAllGroups(false)}
        />
      </label>
    </div>
  );
};

GroupsSelector.propTypes = {
  setShowAllGroups: PropTypes.func.isRequired,
  showAllGroups: PropTypes.bool.isRequired,
  // used to create unique ids
  identifier: PropTypes.string.isRequired,
};

export default GroupsSelector;
