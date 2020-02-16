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
    this.state = {
      groups: [],
      groupHeaders: [],
    };
    this.sortGroups = this.sortGroups.bind(this);
    this.getGroups = this.getGroups.bind(this);
  }

  componentDidMount() {
    // this.getGroups(this.props.groupData);
  }

  componentDidUpdate(prevProps) {
    // create Group components after groupData object has properly loaded
    // if ((!prevProps.groupData || Object.entries(prevProps.groupData).length === 0)
    //   && Object.entries(this.props.groupData).length > 0) {
    //   this.getGroups(this.props.groupData);
    // }
  }

  getGroups(groupObjs) {
    const groups = [];
    const groupHeaders = [
      {
        label: 'Number',
        headerKey: 'number',
      },
    ];
    const initialLength = groupHeaders.length;
    // create groups from groupData
    Object.keys(groupObjs).forEach((groupNum) => {
      // record data headers
      const groupObj = groupObjs[groupNum];
      if (groupHeaders.length === initialLength) {
        Object.keys(groupObj).forEach((headerKey) => {
          // perfrom necessary modifications to header fields

          // only add headers for string fields
          if (typeof groupObj[headerKey] !== typeof String()) {
            return;
          }
          // fix some labels up
          let label = `${headerKey.charAt(0).toUpperCase()}${headerKey.substr(1)}`;
          if (label === 'GradStanding') label = 'Grad Standing';
          if (label === 'Time') headerKey = 'time_numeric';
          // create a new data object for the header
          const newHeader = {
            label,
            headerKey,
          };
          // add data to list
          groupHeaders.push(newHeader);
        });
      }
      const { members, ...rest } = groupObj;
      const numericTime = GroupManager.getNumericTimeVal(rest.time);
      const newGroup = (
        <Group
          key={groupNum}
          number={Number(groupNum)}
          members={members}
          time_numeric={numericTime}
          {...rest}
        />
      );
      groups.push(newGroup);
    });
    this.setState({ groups, groupHeaders });
  }

  sortGroups(sortFunc) {
    this.setState((prevState) => ({
      groups: prevState.groups.sort(sortFunc),
    }));
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
          headers={this.state.groupHeaders}
          sortHandler={this.sortGroups}
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
