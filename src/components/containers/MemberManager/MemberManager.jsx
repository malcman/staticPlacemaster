import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import HeadersManager from '../HeadersManager/HeadersManager';
import MemberList from '../../MemberList';
import FlaggedMemberList from '../../FlaggedMemberList';

const classNames = require('classnames');

const membersSelector = (state) => state.Placement.members;

class MemberManager extends React.Component {
  constructor(props) {
    super(props);
    this.memberHeaders = [
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
    this.unplacedName = 'unplaced';
    this.placedName = 'placed';
  }

  render() {
    const {
      flaggedMembers,
      members,
      groups,
      focused,
    } = this.props;
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
          headers={this.memberHeaders}
          list={this.unplacedName}
        />
        <FlaggedMemberList members={flaggedMembers} groups={groups} />
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
            headers={this.memberHeaders}
            list={this.placedName}
          />
          <MemberList members={members} />
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    members: state.Placement.members,
    groups: state.Placement.groups,
    focused: !state.PlacementUI.groupFocus,
    flaggedMembers: state.Placement.flaggedMembers,
  };
}

export default connect(mapStateToProps)(MemberManager);
