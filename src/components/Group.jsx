import React from 'react';
import Member from './Member';

const classNames = require('classnames');

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
    this.getExpandedInfo = this.getExpandedInfo.bind(this);
    this.getLeaderInfo = this.getLeaderInfo.bind(this);
    this.toggleExpand = this.toggleExpand.bind(this);
  }

  getLeaderInfo() {
    // if leader info has been specified, return displayed info
    // else return null
    // NOTE: optimization implementation as of 01/31/2020 does not
    // return this info
    if (this.props.leader) {
      const leaderInfo = (
        <div className="groupLeader">
          <h6 className="groupLeadersHeader">Leader(s)</h6>
          <p>{this.props.leader}</p>
        </div>
      );
      return leaderInfo;
    }
    return null;
  }

  getExpandedInfo() {
    if (this.state.expanded) {
      // display member list and leader info (if present)
      const expandedInfo = (
        <div className="groupExpandedInfo">
          {this.getLeaderInfo()}
          <h6 className="groupMembersHeader">Members</h6>
          <div className="membersPreviewHeaders">
            <div>Name</div>
            <div>Email</div>
            <div>Campus</div>
            <div>Gender</div>
          </div>
          <ul className="groupMembers">
            {this.props.members.map((member) => <Member key={member.email} {...member} />)}
          </ul>
        </div>
      );
      return expandedInfo;
    }
    return null;
  }

  toggleExpand(e) {
    const targetParentClasses = e.target.parentNode.classList;
    // If already expanded and expanded group member list triggered
    // the event, don't close
    if (!this.state.expanded
      || (this.state.expanded
        && !targetParentClasses.contains('infoRow')
        && !targetParentClasses.contains('groupMembers')
        && !e.target.classList.contains('groupMembers')
        && !e.target.classList.contains('infoRow')
      )) {
      this.setState((prevState) => ({
        expanded: !prevState.expanded,
      }));
    }
  }


  render() {
    const expandedInfo = this.getExpandedInfo();
    const groupClass = classNames('Group', { expanded: this.state.expanded });
    return (
      <li
        className={groupClass}
        onClick={this.toggleExpand}
      >
        <div className="infoRow">
          <p>{this.props.number}</p>
          <p>{this.props.time}</p>
          <p>{this.props.campus}</p>
          <p>{this.props.grad_standing}</p>
        </div>
        <button
          type="button"
          className="expandToggle"
        >
        +
        </button>
        {expandedInfo}
      </li>
    );
  }
}

export default Group;
