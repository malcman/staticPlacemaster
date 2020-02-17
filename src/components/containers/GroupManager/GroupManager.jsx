import React from 'react';
import { connect } from 'react-redux';
import Group from '../../Group';
import HeadersManager from '../HeadersManager/HeadersManager';
import GroupList from '../../GroupList';

const classNames = require('classnames');


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
    this.groupHeaders = [
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
          headers={this.groupHeaders}
          list={this.groupListName}
        />
        <GroupList
          groups={this.props.groups}
          members={this.props.members}
        />
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    groups: state.Placement.groups,
    focused: state.PlacementUI.groupFocus,
    members: state.Placement.members,
  };
}

export default connect(mapStateToProps)(GroupManager);
export function getNumericTimeVal(timeStr) {
  return GroupManager.getNumericTimeVal(timeStr);
}
