import React from 'react';

import GroupManager from './GroupManager';
import MemberManager from './MemberManager';
import Member from './Member';
import FlaggedMember from './FlaggedMember';

import JSONData from '../../content/placement.json';

const classNames = require('classnames');

class Placement extends React.Component {
  static updateGroupData(allGroups, groupData, member) {
    // if this groupID is not yet in group data,
    // create appropriate object
    // regardless, add new member to group
    const groupID = member.props.group_id;
    if (!allGroups.hasOwnProperty(groupID)) {
      allGroups[groupID] = {
        members: [],
        size: 0,
        time: groupData.time,
        campus: groupData.campus,
        gradStanding: groupData.grad_standing,
      };
    }
    allGroups[groupID].members.push(member);
    allGroups[groupID].size += 1;
  }

  constructor(props) {
    super(props);
    this.state = {
      allGroups: {},
      flaggedMembers: [],
      groupFocus: true,
    };
    this.fetchPlacement = this.fetchPlacement.bind(this);
    this.toggleFocusEl = this.toggleFocusEl.bind(this);
    this.sortFlaggedMembers = this.sortFlaggedMembers.bind(this);
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

  sortFlaggedMembers(sortFunc) {
    this.setState((prevState) => ({
      flaggedMembers: prevState.flaggedMembers.sort(sortFunc),
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
    const allGroups = {};
    const flaggedMembers = [];

    // add placed members
    data.results.placed.forEach((memberData) => {
      const fullName = `${memberData.first} ${memberData.last}`;
      const newMember = (
        <Member
          {...memberData}
          key={fullName}
        />
      );
      const groupInfo = data.results.groups[memberData.group_id - 1];
      // console.log(groupInfo);
      // console.log(memberData.group_id)
      // console.log(data.results.groups)
      Placement.updateGroupData(allGroups, groupInfo, newMember);
    });

    // create object with group data that does not include
    // huge lists of members
    const allGroupsInfo = {};
    Object.keys(allGroups).forEach((group) => {
      const { members, ...groupInfo } = allGroups[group];
      allGroupsInfo[group] = groupInfo;
    });

    // add flagged members
    data.results.unplaced.forEach((memberData) => {
      const fullName = `${memberData.first} ${memberData.last}`;
      const newFlagged = (
        <FlaggedMember
          {...memberData}
          key={fullName}
          allGroupsInfo={allGroupsInfo}
        />
      );
      flaggedMembers.push(newFlagged);
    });

    // save in state
    this.setState({
      flaggedMembers,
      allGroups,
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
          groupData={this.state.allGroups}
          sortHandler={this.sortGroups}
        />
        <MemberManager
          role="tabpanel"
          focused={!this.state.groupFocus}
          groupData={this.state.allGroups}
          flaggedMembers={this.state.flaggedMembers}
          sortFlaggedHandler={this.sortFlaggedMembers}
        />
      </section>
    );
  }
}

export default Placement;
