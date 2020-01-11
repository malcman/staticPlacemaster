import React from 'react';
import HeadersManager from './HeadersManager';

const classNames = require('classnames');

class MemberManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const className = classNames('Manager', { hidden: !this.props.focused });

    // TODO: change to get this from data
    // column headers for each member
    const memberHeaders = ['Group', 'Name', 'Email', 'Campus', 'Gender', 'Year'];

    const flaggedSection = (!this.props.flaggedMembers.length) ? null : (
      <div>
        <h4 id="flaggedHeader">
          Flagged
          <div className="alert">
            <p>{this.props.flaggedMembers.length}</p>
          </div>
        </h4>
        <HeadersManager
          headers={memberHeaders}
          sortHandler={this.props.sortHandler}
          flagged
        />
        <ul id="FlaggedMemberList">
          {this.props.flaggedMembers}
        </ul>
      </div>
    );

    return (
      <section
        className={className}
        id="MemberManager"
        aria-labelledby="MemberTag"
      >
        {flaggedSection}
        <div>
          <h4>Placed</h4>
          <HeadersManager
            headers={memberHeaders}
            sortHandler={this.props.sortHandler}
            flagged={false}
          />
          <ul id="MemberList">
            {this.props.members}
          </ul>
        </div>
      </section>
    );
  }
}

export default MemberManager;
