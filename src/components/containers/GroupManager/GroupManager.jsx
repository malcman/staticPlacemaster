import React from 'react';
import { connect } from 'react-redux';
import Group from '../../Group';
import HeadersManager from '../HeadersManager/HeadersManager';
import GroupList from '../../GroupList';

const classNames = require('classnames');

const GROUP_LIST_NAME = 'groups';
const GROUP_HEADERS = [
  {
    label: 'Group',
    headerKey: 'number',
  },
  {
    label: 'Time',
    headerKey: 'time_numeric',
  },
  {
    label: 'Campus',
    headerKey: 'campus',
  },
  {
    label: 'Grad Standing',
    headerKey: 'grad_standing',
  },
];

class GroupManager extends React.Component {
  static getNumericTimeVal(timeStr) {
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

  constructor(props) {
    super(props);
    this.groupListName = 'groups';
  }

  render() {
    const className = classNames('Manager', { hidden: !this.props.focused });

    return (
      <section
        className={className}
        id="GroupManager"
        aria-labelledby="GroupTag"
        role="tabpanel"
      >
        <HeadersManager
          headers={GROUP_HEADERS}
          list={GROUP_LIST_NAME}
        />
        <GroupList
          groups={this.props.groups}
          members={this.props.members}
          sortFunc={this.props.groupSort}
        />
      </section>
    );
  }
}

function mapStateToProps(state) {
  const groupHeaders = state.HeadersManager[GROUP_LIST_NAME];
  let groupSort;
  if (groupHeaders) {
    groupSort = groupHeaders.sortFunc;
  }
  return {
    groups: state.Placement.groups,
    groupSort,
    focused: state.PlacementUI.groupFocus,
    members: state.Placement.members,
  };
}

export default connect(mapStateToProps)(GroupManager);
export function getNumericTimeVal(timeStr) {
  return GroupManager.getNumericTimeVal(timeStr);
}
