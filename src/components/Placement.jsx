import React from 'react';

import GroupManager from './GroupManager';
import Group from './Group';
import MemberManager from './MemberManager';
import Member from './Member';
import FlaggedMember from './FlaggedMember';

import JSONData from '../../content/placement.json';

const classNames = require('classnames');

class Placement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      members: [],
      flaggedMembers: [],
      groupFocus: true,
    };
    this.fetchPlacement = this.fetchPlacement.bind(this);
    this.toggleFocusEl = this.toggleFocusEl.bind(this);
    this.sortMembers = this.sortMembers.bind(this);
    this.sortGroups = this.sortGroups.bind(this);
    this.createMembersAndGroups = this.createMembersAndGroups.bind(this);
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
    const members = [];
    const flaggedMembers = [];

    // add placed members
    data.results.placed.forEach((memberData) => {
      const newMember = (
        <Member
          {...memberData}
          key={memberData.name}
        />
      );
      members.push(newMember);
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
      members,
      flaggedMembers,
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
          groups={this.state.groups}
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
