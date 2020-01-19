import React from 'react';
import PropTypes from 'prop-types';
import { CSVLink } from 'react-csv';

import GroupManager from './GroupManager';
import MemberManager from './MemberManager';
import Member from './Member';
import FlaggedMember from './FlaggedMember';

// use for local testing without live optimization
// import JSONData from '../../content/placement.json';

// headers for the CSV file that will be downloaded
const csvMemberHeaders = [
  { label: 'Group', key: 'group_id' },
  { label: 'First', key: 'first' },
  { label: 'Last', key: 'last' },
  { label: 'Email', key: 'email' },
  { label: 'Gender', key: 'gender' },
  { label: 'Grad Standing', key: 'grad_standing' },
];

class Placement extends React.Component {
  static updateGroupData(allGroups, groupData, member = null) {
    // if this groupID is not yet in group data,
    // create appropriate object
    // regardless, add new member to group
    const groupID = groupData.group_id;
    if (!allGroups.hasOwnProperty(groupID)) {  // eslint-disable-line
      allGroups[groupID] = {
        members: [],
        size: 0,
        time: groupData.time,
        campus: groupData.campus,
        gradStanding: groupData.grad_standing,
      };
    }
    if (member) {
      allGroups[groupID].members.push(member);
      allGroups[groupID].size += 1;
    }
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
    this.placeFlaggedMember = this.placeFlaggedMember.bind(this);
    this.createMembersAndGroups = this.createMembersAndGroups.bind(this);
    this.getCSVMemberData = this.getCSVMemberData.bind(this);
    this.validateBeforeDownload = this.validateBeforeDownload.bind(this);
  }

  componentDidMount() {
    this.createMembersAndGroups(this.props.data);
    // this.createMembersAndGroups(JSONData);
  }

  getCSVMemberData() {
    // Return list of objects with member properties
    // for CSVLink component
    const flaggedMemberData = this.state.flaggedMembers.map(
      (flagged) => {
        const {
          t_mon: tMon,
          t_tue: tTue,
          t_wed: tWed,
          t_thu: tThu,
          allGroupsInfo,
          placeFlaggedMember,
          ...rest
        } = flagged.props;
        return ({ group_id: 'NONE', ...rest });
      },
    );

    // go through allGroups
    const allMemberData = Object.keys(this.state.allGroups).map(
      // create list of objects with expanded member props for each group
      (groupNum) => {
        const group = this.state.allGroups[groupNum];
        const groupMembersData = [];
        group.members.forEach((member) => {
          // push expanded member props onto this group's list
          groupMembersData.push({ ...member.props });
        });
        return groupMembersData;
      },
    // reduce list of group lists to a single list
    ).reduce(
      (accum, groupMemberList) => accum.concat([...groupMemberList]),
      flaggedMemberData,
    );
    return allMemberData;
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

  placeFlaggedMember(newGroup, memberData) {
    // add to allGroups

    // create member with same props as previously flagged member
    const newMember = (
      <Member
        key={memberData.email}
        group_id={newGroup}
        {...memberData}
      />
    );
    // get existing members of this group and add newMember to the list
    const existingMembers = this.state.allGroups[newGroup].members;
    existingMembers.push(newMember);

    // get object of existing group data
    const existingGroup = this.state.allGroups[newGroup];

    // create copy of group data object with updated members list
    const newGroupObj = {};
    newGroupObj[newGroup] = {
      ...existingGroup,
      size: existingMembers.length,
      members: existingMembers,
    };

    // update state with new data for newGroup key
    // all other allGroups data remains the same
    this.setState((prevState) => ({
      allGroups: {
        ...prevState.allGroups,
        ...newGroup,
      },
    }), () => {
      // remove newly added member from flaggedMembers
      // while passing updated allGroupsInfo
      const newFlagged = [];
      this.state.flaggedMembers.forEach((flagged) => {
        if (flagged.props.email !== memberData.email) {
          // do not pass members list
          delete newGroupObj[newGroup].members;
          // create object with previous allGroupsInfo and updated data
          const allGroupsInfo = {
            ...flagged.props.allGroupsInfo,
            ...newGroupObj,
          };
          const newFlaggedMember = (
            <FlaggedMember
              {...flagged.props}
              key={flagged.props.email}
              allGroupsInfo={allGroupsInfo}
            />
          );
          newFlagged.push(newFlaggedMember);
        }
      });
      this.setState({ flaggedMembers: newFlagged });
    });
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

    if (data && data.groups) {
      // populate group data
      data.groups.forEach((groupData) => {
        Placement.updateGroupData(allGroups, groupData);
      });
    }

    // add placed members
    if (data && data.placed) {
      data.placed.forEach((memberData) => {
        const newMember = (
          <Member
            {...memberData}
            key={memberData.email}
          />
        );
        const groupInfo = data.groups[memberData.group_id - 1];
        Placement.updateGroupData(allGroups, groupInfo, newMember);
      });
    }

    if (data && data.unplaced) {
      // create object with group data that does not include
      // huge lists of members
      const allGroupsInfo = {};
      Object.keys(allGroups).forEach((group) => {
        const { members, ...groupInfo } = allGroups[group];
        allGroupsInfo[group] = groupInfo;
      });

      // add flagged members
      data.unplaced.forEach((memberData) => {
        const fullName = `${memberData.first} ${memberData.last}`;
        const newFlagged = (
          <FlaggedMember
            {...memberData}
            key={fullName}
            allGroupsInfo={allGroupsInfo}
            placeFlaggedMember={this.placeFlaggedMember}
          />
        );
        flaggedMembers.push(newFlagged);
      });
    }

    // save in state
    this.setState({
      flaggedMembers,
      allGroups,
    });
  }

  validateBeforeDownload(e) {
    if (this.state.flaggedMembers.length) {
      const confMsg = 'There are still unplaced members present.\nProceed with download?';
      const proceed = window.confirm(confMsg);  // eslint-disable-line
      return proceed;
    }
    return true;
  }

  render() {
    const csvData = this.getCSVMemberData();
    const flaggedAlert = !this.state.flaggedMembers.length ? null : (
      <div className="alert" />
    );
    return (
      <section className="Placement">
        <div id="PlacementHeader">
          <h1 className="placementName">{this.props.title}</h1>
          <CSVLink
            id="csvButton"
            headers={csvMemberHeaders}
            data={csvData}
            filename={`${this.props.title}_Placement.csv`}
            onClick={(e) => this.validateBeforeDownload(e)}
          >
          Generate Attendance File
          </CSVLink>
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
              <h3>
              Members
              {flaggedAlert}
              </h3>
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

Placement.propTypes = {
  title: PropTypes.string,
  data: PropTypes.object,
};

Placement.defaultProps = {
  title: 'Title',
  data: {
    groups: [],
    placed: [],
    unplaced: [],
  },
};
