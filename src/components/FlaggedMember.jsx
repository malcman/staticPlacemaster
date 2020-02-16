import React from 'react';
import GroupAssigner from './GroupAssigner';

const classNames = require('classnames');

class FlaggedMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
    this.toggleExpand = this.toggleExpand.bind(this);
    this.getExpandedInfo = this.getExpandedInfo.bind(this);
    this.getConflictMessage = this.getConflictMessage.bind(this);
  }

  getConflictMessage() {
    // try to determine why there was a problem placing this member
    // return jsx containing a basic descriptive message

    const conflictMessages = [];
    // if no availability was specified...
    if (!this.props.t_mon && !this.props.t_tue
      && !this.props.t_wed && !this.props.t_thu) {
      const message = <li key={1}><p>No availability listed.</p></li>;
      conflictMessages.push(message);
    }

    // North campus only students...
    if (!this.props.campus.includes('Central')) {
      const message = <li key={2}><p>Limited North Campus availability</p></li>;
      conflictMessages.push(message);
    }

    // Grad students
    if (!this.props.grad_standing.includes('Undergraduate')) {
      const message = <li key={3}><p>Limited grad student availability</p></li>;
      conflictMessages.push(message);
    }

    // don't create jsx if it wouldn't be helpful
    if (conflictMessages.length === 0) {
      return null;
    }
    return (
      <div className="conflictInfo">
        <h6 className="conflictHeader">Likely Conflict Reason:</h6>
        <ul>
          {conflictMessages}
        </ul>
      </div>
    );
  }

  getExpandedInfo() {
    // Return fully expanded element allowing for placement in groups.
    if (this.state.expanded) {
      // only display valid groups for placement
      const { validGroups } = this.props;
      const expandedInfo = (
        <div className="flaggedExpandedInfo">
          {this.getConflictMessage(validGroups)}
          <GroupAssigner
            allGroupsInfo={validGroups}
            setGroup={this.setGroup}
          />
        </div>
      );
      return expandedInfo;
    }
    return null;
  }

  toggleExpand(e) {
    // const flaggedID = `${this.props.email}Flagged`;
    // if (this.state.expanded
    //   && e.target.id !== flaggedID
    //   && e.target.parentNode.id !== flaggedID) {
    //   return;
    // }
    this.setState((prevState) => ({
      expanded: !prevState.expanded,
    }));
  }

  render() {
    const expandedInfo = this.getExpandedInfo();
    const flaggedClass = classNames(
      'FlaggedMember',
      { expanded: this.state.expanded },
    );
    const group = 'None';
    const name = `${this.props.first} ${this.props.last}`;
    return (
      <li
        id={`${this.props.email}Flagged`}
        className={flaggedClass}
      >
        <div
          role="menuitem"
          tabIndex="0"
          className="infoRow"
          onClick={this.toggleExpand}
          onKeyDown={(e) => { if (e.keyCode === 13) this.toggleExpand(); }}
        >
          <p>{group}</p>
          <p>{name}</p>
          <p>{this.props.email}</p>
          <p>{this.props.campus}</p>
          <p>{this.props.gender}</p>
        </div>
        <button
          type="button"
          className="expandToggle"
          onClick={this.toggleExpand}
        >
        +
        </button>
        {expandedInfo}
      </li>
    );
  }
}

export default FlaggedMember;
