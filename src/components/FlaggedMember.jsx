import React from 'react';
import GroupAssigner from './GroupAssigner';
import { getNumericTimeVal } from './GroupManager';

const classNames = require('classnames');

class FlaggedMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group: -1,
      expanded: false,
    };
    this.toggleExpand = this.toggleExpand.bind(this);
    this.getExpandedInfo = this.getExpandedInfo.bind(this);
    this.getValidGroups = this.getValidGroups.bind(this);
    this.groupIsValid = this.groupIsValid.bind(this);
    this.setGroup = this.setGroup.bind(this);
  }

  getExpandedInfo() {
    // Return fully expanded element allowing for placement in groups.
    if (this.state.expanded) {
      // only display valid groups for placement
      const validGroups = this.getValidGroups();
      const expandedInfo = (
        <div className="flaggedExpandedInfo">
          <h6 className="conflictHeader">Conflict</h6>
          <p>{this.props.conflictMessage}</p>
          <GroupAssigner
            allGroupsInfo={validGroups}
            setGroup={this.setGroup}
          />
        </div>
      );
      return expandedInfo;
    }
    return null;
  }

  getValidGroups() {
    // return object of valid groups that match this member's constraints
    const validGroups = {};
    const allGroups = this.props.allGroupsInfo;
    Object.keys(allGroups).forEach((groupKey) => {
      // only consider valid campus matches
      if (this.props.campus.includes(allGroups[groupKey].campus)) {
        // do time comparisons
        if (this.groupIsValid(allGroups[groupKey])) {
          validGroups[groupKey] = allGroups[groupKey];
        }
      }
    });
    return validGroups;
  }

  setGroup(group) {
    this.setState({
      group,
    }, () => {
      this.props.placeFlaggedMember(this.state.group, this.props);
    });
  }

  groupIsValid(groupObj) {
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
    const timeKey = dayMappings[groupDay];
    // get numeric time values for the group's time
    const [groupStartStr, groupEndStr] = groupTimeStr.trim().split('-');
    const groupStart = getNumericTimeVal(groupStartStr.trim());
    const groupEnd = getNumericTimeVal(groupEndStr.trim());

    const availableTimes = this.props[timeKey].split(',');
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

  toggleExpand(e) {
    const flaggedID = `${this.props.email}Flagged`;
    if (this.state.expanded
      && e.target.id !== flaggedID
      && e.target.parentNode.id !== flaggedID) {
      return;
    }
    this.setState((prevState) => ({
      expanded: !prevState.expanded,
    }));
  }

  render() {
    const expandedInfo = this.getExpandedInfo();
    const flaggedClass = classNames(
      'FlaggedMember',
      { expanded: this.state.expanded },
    );
    let { group } = this.state;
    const name = `${this.props.first} ${this.props.last}`;
    if (group === -1) group = 'None';
    return (
      <li
        id={`${this.props.email}Flagged`}
        className={flaggedClass}
        onClick={this.toggleExpand}
      >
        <div className="infoRow">
          <p>{group}</p>
          <p>{name}</p>
          <p>{this.props.email}</p>
          <p>{this.props.campus}</p>
          <p>{this.props.gender}</p>
        </div>
        <button
          type="button"
          className="expandToggle"
        >
        +
        </button>
        {expandedInfo}
      </li>
    );
  }
}

export default FlaggedMember;
