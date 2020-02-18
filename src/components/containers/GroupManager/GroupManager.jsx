import React from 'react';
import { connect } from 'react-redux';
import Group from '../../Group';
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

class GroupManager extends React.Component {
  render() {
    const className = classNames('Manager', { hidden: !this.props.focused });

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
          groups={this.props.groups}
          members={this.props.members}
          sortFunc={this.props.groupSort}
        />
      </section>
    );
  }
}

function mapStateToProps(state) {
  const groupHeaders = state.HeadersManager[GROUP_LIST_NAME];
  let groupSort;
  if (groupHeaders) {
    groupSort = groupHeaders.sortFunc;
  }
  return {
    groups: state.Placement.groups,
    groupSort,
    focused: state.PlacementUI.groupFocus,
    members: state.Placement.members,
  };
}

export default connect(mapStateToProps)(GroupManager);
