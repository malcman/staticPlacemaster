import React from 'react';
import GroupAssigner from './GroupAssigner';

const classNames = require('classnames');

class FlaggedMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group: -1,
      expanded: false,
    };
    this.toggleExpand = this.toggleExpand.bind(this);
    this.getExpandedInfo = this.getExpandedInfo.bind(this);
    this.setGroup = this.setGroup.bind(this);
  }

  getExpandedInfo() {
    if (this.state.expanded) {
      const expandedInfo = (
        <div className="flaggedExpandedInfo">
          <h6 className="conflictHeader">Conflict</h6>
          <p>{this.props.conflictMessage}</p>
          <GroupAssigner
            groupSizes={this.props.groupSizes}
            setGroup={this.setGroup}
          />
        </div>
      );
      return expandedInfo;
    }
    return null;
  }

  setGroup(group) {
    this.setState({
      group,
    });
  }

  toggleExpand(e) {
    const flaggedID = `${this.props.name}Flagged`;
    if (this.state.expanded
      && e.target.id !== flaggedID
      && e.target.parentNode.id !== flaggedID) {
      return;
    }
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
    let { group } = this.state;
    if (group === -1) group = 'None';
    return (
      <li
        id={`${this.props.name}Flagged`}
        className={flaggedClass}
        onClick={this.toggleExpand}
      >
        <div className="infoRow">
          <p>{group}</p>
          <p>{this.props.name}</p>
          <p>{this.props.email}</p>
          <p>{this.props.campus}</p>
          <p>{this.props.gender}</p>
          <p>{this.props.year}</p>
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

export default FlaggedMember;
