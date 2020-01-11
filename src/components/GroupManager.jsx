import React from 'react';
import Group from './Group';
import HeadersManager from './HeadersManager';

import roomData from '../../content/roomData.json';


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
      this.getGroups(roomData);
    }
  }

  getGroups(groupData) {
    const groups = [];
    let groupHeaders = [];
    // create groups from groupData
    groupData.rooms.forEach((group) => {
      // record data headers
      if (group.number === 1) {
        groupHeaders = Object.keys(group);
      }
      const newGroup = (
        <Group
          key={group.number}
          number={group}
          members={this.props.groupData[group.number]}
          {...group}
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
