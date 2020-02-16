import React from 'react';
import { connect } from 'react-redux';
import HeadersManager from '../HeadersManager/HeadersManager';
import MemberList from '../../MemberList';
import FlaggedMemberList from '../../FlaggedMemberList';

const classNames = require('classnames');

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
  }

  render() {
    const className = classNames('Manager', { hidden: !this.props.focused });
    const {
      flaggedMembers,
      members,
      groups,
    } = this.props;

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
          sortHandler={this.props.sortFlaggedHandler}
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
            sortHandler={this.sortMembers}
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
