import React from 'react';
import Group from './Group';
import HeadersManager from './HeadersManager';

const classNames = require('classnames');

class GroupManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      groupHeaders: [],
    };
    this.sortGroups = this.sortGroups.bind(this);
    this.getGroups = this.getGroups.bind(this);
  }

  componentDidUpdate(prevProps) {
    // create Group components after groupData object has properly loaded
    if (Object.entries(prevProps.groupData).length === 0
      && Object.entries(this.props.groupData).length > 0) {
      this.getGroups(this.props.groupData);
    }
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
      const newGroup = (
        <Group
          key={groupNum}
          number={Number(groupNum)}
          members={members}
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
      >
        <HeadersManager
          headers={this.state.groupHeaders}
          currentSort={this.state.groupHeaders[0]}
          sortHandler={this.sortGroups}
        />
        <ul id="GroupList">
          {this.state.groups}
        </ul>
      </section>
    );
  }
}

export default GroupManager;
