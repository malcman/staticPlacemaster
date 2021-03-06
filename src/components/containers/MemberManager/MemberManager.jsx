// Container component for Members and Flagged/unplaced members.
// Renders lists of each and enables sorting.
import React from 'react';
import { connect } from 'react-redux';

import HeadersManager from '../HeadersManager/HeadersManager';
import MemberList from '../../MemberList';
import FlaggedMemberList from '../../FlaggedMemberList';
import styles from './MemberManager.module.scss';

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
      <h4 id={styles.flaggedHeader}>
        Flagged
        <div className={styles.alert}>
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
        {focused ? (
          <MemberList members={members} sortFunc={memberSort} />
        ) : null}
      </div>
    </section>
  );
};

function mapStateToProps(state) {
  // check that relevant HeadersManager components
  // have mounted and registered before getting the sortFunction
  let memberSort = () => {};
  let unplacedSort = () => {};
  const memberHeaders = state.HeadersManager[PLACED_LIST_NAME];
  const unplacedHeaders = state.HeadersManager[UNPLACED_LIST_NAME];

  if (memberHeaders) memberSort = memberHeaders.sortFunc;
  if (unplacedHeaders) unplacedSort = unplacedHeaders.sortFunc;
  return {
    members: state.Placement.members,
    memberSort,
    flaggedMembers: state.Placement.flaggedMembers,
    unplacedSort,
  };
}

export default connect(mapStateToProps)(MemberManager);
