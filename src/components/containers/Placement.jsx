import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PlacementView from '../PlacementView';
import FlaggedMember from '../FlaggedMember';
import Member from '../Member';

import {
  focusGroups,
  focusMembers,
} from '../../actions/PlacementUIActions';

// use for local testing without live optimization
import JSONData from '../../../content/placement.json';

function updateGroupData(allGroups, groupData, member = null) {
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

function createMembersAndGroups(data) {
  const allGroups = {};
  const flaggedMembers = [];

  if (data && data.groups) {
    // populate group data
    data.groups.forEach((groupData) => {
      updateGroupData(allGroups, groupData);
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
      updateGroupData(allGroups, groupInfo, newMember);
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
        />
      );
      flaggedMembers.push(newFlagged);
    });
  }
  return [allGroups, flaggedMembers];
}

const [allGroups, flaggedMembers] = createMembersAndGroups(JSONData);

class Placement extends React.Component {

  constructor(props) {
    super(props);
    this.sortFlaggedMembers = this.sortFlaggedMembers.bind(this);
    this.placeFlaggedMember = this.placeFlaggedMember.bind(this);
    // this.createMembersAndGroups = this.createMembersAndGroups.bind(this);
    // this.getCSVMemberData = this.getCSVMemberData.bind(this);
    this.validateBeforeDownload = this.validateBeforeDownload.bind(this);
  }

  // getCSVMemberData() {
  //   // Return list of objects with member properties
  //   // for CSVLink component
  //   const flaggedMemberData = this.state.flaggedMembers.map(
  //     (flagged) => {
  //       const {
  //         t_mon: tMon,
  //         t_tue: tTue,
  //         t_wed: tWed,
  //         t_thu: tThu,
  //         allGroupsInfo,
  //         placeFlaggedMember,
  //         ...rest
  //       } = flagged.props;
  //       return ({ group_id: 'NONE', ...rest });
  //     },
  //   );

  //   // go through allGroups
  //   const allMemberData = Object.keys(this.state.allGroups).map(
  //     // create list of objects with expanded member props for each group
  //     (groupNum) => {
  //       const group = this.state.allGroups[groupNum];
  //       const groupMembersData = [];
  //       group.members.forEach((member) => {
  //         // push expanded member props onto this group's list
  //         groupMembersData.push({ ...member.props });
  //       });
  //       return groupMembersData;
  //     },
  //   // reduce list of group lists to a single list
  //   ).reduce(
  //     (accum, groupMemberList) => accum.concat([...groupMemberList]),
  //     flaggedMemberData,
  //   );
  //   return allMemberData;
  // }

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
}

Placement.propTypes = {
  title: PropTypes.string,
  allGroups: PropTypes.object,
};

Placement.defaultProps = {
  title: 'Title',
  allGroups: {},
};

function mapStateToProps(state) {
  return {
    groupFocus: state.PlacementUI.groupFocus,
    // allGroups: state.Placement.allGroupsData,
    allGroups,
    // flaggedMembers: state.Placement.flaggedMembers,
    flaggedMembers,
    // title: state.Placement.title,
    title: 'Test',
  };
}

function mapDispatchToProps(dispatch) {
  return {
    focusMembers: () => {
      dispatch(focusMembers());
    },
    focusGroups: () => {
      dispatch(focusGroups());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlacementView);
