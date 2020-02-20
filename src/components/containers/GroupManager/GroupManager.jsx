import React from 'react';
import { connect } from 'react-redux';
import HeadersManager from '../HeadersManager/HeadersManager';
import GroupList from '../../GroupList';

const classNames = require('classnames');

const GROUP_LIST_NAME = 'groups';
const GROUP_HEADERS = [
  {
    label: 'Group',
    headerKey: 'number',
  },
  {
    label: 'Time',
    headerKey: 'time_numeric',
  },
  {
    label: 'Campus',
    headerKey: 'campus',
  },
  {
    label: 'Grad Standing',
    headerKey: 'grad_standing',
  },
];

const GroupManager = (props) => {
  const {
    groups,
    members,
    groupSort,
    focused,
  } = props;
  const className = classNames('Manager', { hidden: !focused });

  return (
    <section
      className={className}
      id="GroupManager"
      aria-labelledby="GroupTag"
      role="tabpanel"
    >
      <HeadersManager
        headers={GROUP_HEADERS}
        list={GROUP_LIST_NAME}
      />
      <GroupList
        groups={groups}
        members={members}
        sortFunc={groupSort}
      />
    </section>
  );
};

function mapStateToProps(state) {
  // check that relevant HeadersManager components
  // have mounted and registered before getting the sortFunction
  const groupHeaders = state.HeadersManager[GROUP_LIST_NAME];
  let groupSort;
  if (groupHeaders) {
    groupSort = groupHeaders.sortFunc;
  }
  return {
    groups: state.Placement.groups,
    groupSort,
    members: state.Placement.members,
  };
}

export default connect(mapStateToProps)(GroupManager);
