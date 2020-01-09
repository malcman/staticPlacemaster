import React from 'react';

import GroupManager from './GroupManager';
import Group from './Group';
import MemberManager from './MemberManager';
import Member from './Member';
import FlaggedMember from './FlaggedMember';

import JSONData from '../../content/placement.json';

const classNames = require('classnames');

class Placement extends React.Component {
  static updateGroupData(groupData, member) {
    if (!groupData.hasOwnProperty(member.props.group)) {
      groupData[member.props.group] = [];
    }
    groupData[member.props.group].push(member);
  }

  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      groupData: {},
      members: [],
      flaggedMembers: [],
      groupFocus: true,
    };
    this.fetchPlacement = this.fetchPlacement.bind(this);
    this.toggleFocusEl = this.toggleFocusEl.bind(this);
    this.sortMembers = this.sortMembers.bind(this);
    this.sortGroups = this.sortGroups.bind(this);
    this.createMembersAndGroups = this.createMembersAndGroups.bind(this);
    // this.updateGroups = this.updateGroups.bind(this);
  }

  componentDidMount() {
    // this.fetchPlacement('./data/placement.json');
    this.createMembersAndGroups(JSONData);
  }

  toggleFocusEl(groupFocus) {
    // set groupFocus as indicated by target with the attached handler
    this.setState({
      groupFocus,
    });
  }

  sortMembers(sortFunc, flagged = false) {
    if (flagged) {
      this.setState((prevState) => ({
        flaggedMembers: prevState.flaggedMembers.sort(sortFunc),
      }));
    } else {
      this.setState((prevState) => ({
        members: prevState.members.sort(sortFunc),
      }));
    }
  }

  sortGroups(sortFunc) {
    this.setState((prevState) => ({
      groups: prevState.groups.sort(sortFunc),
    }));
  }

  fetchPlacement(fetchURL) {
    fetch(fetchURL, { credentials: 'same-origin' })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        this.createMembersAndGroups(data);
      })
      .catch((error) => {
        console.log(error); // eslint-disable-line
      });
  }

  createMembersAndGroups(data) {
    const groups = [];
    const groupData = {};
    const flaggedMembers = [];

    // add placed members
    data.results.placed.forEach((memberData) => {
      const newMember = (
        <Member
          {...memberData}
          key={memberData.name}
        />
      );
      // members.push(newMember);
      Placement.updateGroupData(groupData, newMember);
    });

    // create groups from groupData
    Object.keys(groupData).forEach((group) => {
      const newGroup = (
        <Group
          key={group}
          number={group}
          members={groupData[group]}
        />
      );
      groups.push(newGroup);
    });

    // add flagged members
    data.results.flagged.forEach((memberData) => {
      const newFlagged = (
        <FlaggedMember
          {...memberData}
          key={memberData.name}
        />
      );
      flaggedMembers.push(newFlagged);
    });

    // save in state
    this.setState({
      groups,
      flaggedMembers,
      groupData,
    }, () => {
      const allMembers = Object.keys(this.state.groupData).reduce(
        (accum, groupNum) => accum.concat(this.state.groupData[groupNum]),
        [],
      );
      this.setState({
        members: allMembers,
      });
    });
  }

  render() {
    return (
      <section className="Placement">
        <div id="PlacementHeader">
          <h1 className="placementName">{this.props.title}</h1>
          <button type="button" id="csvButton">Generate Attendance File</button>
          <ul
            id="placementTabs"
            role="tablist"
          >
            {/* group tab */}
            <li
              id="GroupTag"
              role="tab"
              aria-selected={this.state.groupFocus}
              aria-controls="GroupManager"
              onClick={(e) => this.toggleFocusEl(true, e)}
            >
              <h3>Groups</h3>
            </li>

            {/* member tab */}
            <li
              id="MemberTag"
              role="tab"
              aria-selected={!this.state.groupFocus}
              aria-controls="MemberManager"
              onClick={(e) => this.toggleFocusEl(false, e)}
            >
              <h3>Members</h3>
            </li>
          </ul>
        </div>
        <GroupManager
          role="tabpanel"
          focused={this.state.groupFocus}
          groupData={this.state.groupData}
          sortHandler={this.sortGroups}
        />
        <MemberManager
          role="tabpanel"
          focused={!this.state.groupFocus}
          members={this.state.members}
          flaggedMembers={this.state.flaggedMembers}
          sortHandler={this.sortMembers}
        />
      </section>
    );
  }
}

export default Placement;
