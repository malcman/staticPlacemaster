// Group Assigner
// Container for manual flagged/unplaced member placement.
// Allows for placement into any group, or only those that
// satisfy this unplaced member's time availability.
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { groupIsValid } from '../../../helpers/groups';
import { placeMember } from '../Placement/PlacementActions';
import styles from './GroupAssigner.module.scss';
import GroupAssignerForm from './GroupAssignerForm';
import GroupsSelector from './GroupsSelector';

const classNames = require('classnames');

class GroupAssigner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // UI: visibility
      expanded: false,
      // toggle which list of groups to show
      showAllGroups: true,
    };
    this.getGroupsPreview = this.getGroupsPreview.bind(this);
    this.getValidGroups = this.getValidGroups.bind(this);
    this.toggleExpand = this.toggleExpand.bind(this);
    this.setShowAllGroups = this.setShowAllGroups.bind(this);
  }

  getGroupsPreview() {
    // Return preview of groups and the form that allows manual placement.
    // if no valid groups, display an error message.
    let { groups } = this.props;
    const { showAllGroups } = this.state;

    // class for inner group list
    const groupListClass = 'groupFormContainer';
    // get email to construct unique ids
    const { email } = this.props.memberData;

    if (!showAllGroups) {
      groups = this.getValidGroups();
    }
    // by default, display list of valid groups
    let groupList = (
      <div className={groupListClass}>
        <div className={styles.previewHeaders}>
          <h6>Group</h6>
          <h6>Time</h6>
          <h6>Size</h6>
        </div>
        <GroupAssignerForm
          groups={groups}
          placeMember={this.props.placeMember}
        />
      </div>
    );

    // display message if no valid groups
    if (!groups.length) {
      groupList = (
        <div className={groupListClass}>
          <h6 className={styles.noGroups}>
            No Valid Groups
            <span role="img" aria-label="Pensive sad face emoji"> 😔 </span>
          </h6>
        </div>
      );
    }
    return (
      <div className={styles.groupsPreview}>
        <GroupsSelector
          setShowAllGroups={this.setShowAllGroups}
          showAllGroups={showAllGroups}
          identifier={email}
        />
        {groupList}
      </div>
    );
  }

  getValidGroups() {
    // return object of valid groups that match this member's constraints
    const validGroups = [];
    const { groups, memberData } = this.props;
    groups.forEach((group) => {
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

  setShowAllGroups(showAllGroups) {
    this.setState({
      showAllGroups,
    });
  }

  toggleExpand(e) {
    e.stopPropagation();
    this.setState((prevState) => ({
      expanded: !prevState.expanded,
    }));
  }

  render() {
    const { expanded } = this.state;
    const assignerClass = classNames(
      styles.GroupAssigner,
      { [styles.expanded]: expanded },
    );
    return (
      <div className={assignerClass}>
        <button
          type="button"
          onClick={this.toggleExpand}
        >
        Assign Group
        </button>
        {expanded ? (this.getGroupsPreview()) : null}
      </div>
    );
  }
}

GroupAssigner.propTypes = {
  memberData: PropTypes.object.isRequired,
  groups: PropTypes.arrayOf(PropTypes.shape({
    campus: PropTypes.string.isRequired,
    grad_standing: PropTypes.string.isRequired,
    group_id: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    members: PropTypes.arrayOf(PropTypes.number),
  })).isRequired,
};

function mapStateToProps(state) {
  return {
    groups: state.Placement.groups,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    placeMember: (groupNum) => {
      dispatch(placeMember(groupNum, ownProps.memberData));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupAssigner);
