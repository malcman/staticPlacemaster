// Unplaced/flagged member representation
// Allows manual placement into groups that the optimization did not compute.
import React from 'react';
import PropTypes from 'prop-types';
import GroupAssigner from './containers/GroupAssigner/GroupAssigner';

const classNames = require('classnames');

class FlaggedMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
    this.getConflictMessage = this.getConflictMessage.bind(this);
    this.getExpandedInfo = this.getExpandedInfo.bind(this);
    this.toggleExpand = this.toggleExpand.bind(this);
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
    const plural = conflictMessages.length > 1 ? 's' : '';
    const headerText = `Likely Conflict Reason${plural}:`;
    return (
      <div className="conflictInfo">
        <h6 className="conflictHeader">{headerText}</h6>
        <ul>
          {conflictMessages}
        </ul>
      </div>
    );
  }

  getExpandedInfo() {
    // Return fully expanded element allowing for placement in groups.
    // Must pass member data to GroupAssigner to compute valid groups
    if (this.state.expanded) {
      const expandedInfo = (
        <div className="flaggedExpandedInfo">
          {this.getConflictMessage()}
          <GroupAssigner
            memberData={{ ...this.props }}
          />
        </div>
      );
      return expandedInfo;
    }
    return null;
  }

  toggleExpand() {
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

FlaggedMember.propTypes = {
  campus: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  first: PropTypes.string.isRequired,
  last: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  grad_standing: PropTypes.string.isRequired,

  // strings containing time availability per day
  t_mon: PropTypes.string,
  t_tue: PropTypes.string,
  t_wed: PropTypes.string,
  t_thu: PropTypes.string,
};

export default FlaggedMember;
