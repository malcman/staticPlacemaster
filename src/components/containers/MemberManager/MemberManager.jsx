// Container component for Members and Flagged/unplaced members.
// Renders lists of each and enables sorting.
import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import HeadersManager from '../HeadersManager/HeadersManager';
import MemberList from '../../MemberList';
import FlaggedMemberList from '../../FlaggedMemberList';

const classNames = require('classnames');

const PLACED_LIST_NAME = 'placed';
const UNPLACED_LIST_NAME = 'unplaced';
const MEMBER_HEADERS = [
  {
    label: 'Group',
    headerKey: 'group_id',
  },
  {
    label: 'Name',
    headerKey: 'first',
  },
  {
    label: 'Email',
    headerKey: 'email',
  },
  {
    label: 'Campus',
    headerKey: 'campus',
  },
  {
    label: 'Gender',
    headerKey: 'gender',
  },
];

// const getMembers = (state) => state.Placement.members;
// const getCurrentMembersSort = (state) => state.HeadersManager[PLACED_LIST_NAME].currentSort;
// const getAscendingInfo = (state) => state.HeadersManager[PLACED_LIST_NAME].ascendingHeaders;
// const getSortAscend = createSelector(
//   [getAscendingInfo, getCurrentMembersSort],
//   (ascending, sort) => ascending[sort],
// );

// const getSortedMembers = createSelector(
//   [getSortAscend, getCurrentMembersSort, getMembers],
//   (ascending, sortKey, members) => {
//     if (ascending) {
//       // statement
//     }
//     return members.sort()
//   },
// );

const MemberManager = (props) => {
  const {
    flaggedMembers,
    members,
    focused,
    unplacedSort,
    memberSort,
  } = props;
  const className = classNames('Manager', { hidden: !focused });

  // get unplaced members section if unplaced members present
  const flaggedSection = (!flaggedMembers.length) ? null : (
    <div>
      <h4 id="flaggedHeader">
        Flagged
        <div className="alert">
          <p>{flaggedMembers.length}</p>
        </div>
      </h4>
      <HeadersManager
        headers={MEMBER_HEADERS}
        list={UNPLACED_LIST_NAME}
      />
      <FlaggedMemberList
        members={flaggedMembers}
        sortFunc={unplacedSort}
      />
    </div>
  );

  return (
    <section
      className={className}
      id="MemberManager"
      aria-labelledby="MemberTag"
      role="tabpanel"
    >
      {flaggedSection}
      <div>
        <h4>Placed</h4>
        <HeadersManager
          headers={MEMBER_HEADERS}
          list={PLACED_LIST_NAME}
        />
        <MemberList members={members} sortFunc={memberSort} />
      </div>
    </section>
  );
};

function mapStateToProps(state) {
  let memberSort = () => {};
  let unplacedSort = () => {};
  const memberHeaders = state.HeadersManager[PLACED_LIST_NAME];
  const unplacedHeaders = state.HeadersManager[UNPLACED_LIST_NAME];
  if (memberHeaders) {
    memberSort = memberHeaders.sortFunc;
    unplacedSort = unplacedHeaders.sortFunc;
  }
  return {
    focused: !state.PlacementUI.groupFocus,
    members: state.Placement.members,
    memberSort,
    flaggedMembers: state.Placement.flaggedMembers,
    unplacedSort,
  };
}

export default connect(mapStateToProps)(MemberManager);
