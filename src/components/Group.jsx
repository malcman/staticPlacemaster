import React from 'react';

const classNames = require('classnames');

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
    this.getExpandedInfo = this.getExpandedInfo.bind(this);
    this.toggleExpand = this.toggleExpand.bind(this);
  }

  getExpandedInfo() {
    if (this.state.expanded) {
      const expandedInfo = (
        <div className="groupExpandedInfo">
          <h6 className="groupLeadersHeader">Leader(s)</h6>
          {this.props.leader}
          <h6 className="groupMembersHeader">Members</h6>
          <div className="membersPreviewHeaders">
            <div>Name</div>
            <div>Email</div>
            <div>Campus</div>
            <div>Gender</div>
          </div>
          <ul className="groupMembers">
            {this.props.members}
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
          <p>{this.props.gradStanding}</p>
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
