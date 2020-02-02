import React from 'react';
import HeadersManager from '../HeadersManager/';

const classNames = require('classnames');

class MemberManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
    };
    this.getMembers = this.getMembers.bind(this);
    this.sortMembers = this.sortMembers.bind(this);
    this.memberHeaders = [
      {
        label: 'Group',
        headerKey: 'group_id',
      },
      {
        label: 'Name',
        headerKey: 'first',
      },
    ];
  }

  componentDidUpdate(prevProps) {
    if (prevProps.groupData !== this.props.groupData) {
      const members = this.getMembers();
      const validHeaders = ['Email', 'Campus', 'Gender'];
      this.extendHeaders(validHeaders);
      this.setState({
        members,
      });
    }
  }

  getMembers() {
    const members = Object.keys(this.props.groupData).reduce(
      (accum, groupNum) => accum.concat(this.props.groupData[groupNum].members),
      [],
    );
    return members;
  }

  sortMembers(sortFunc) {
    this.setState((prevState) => ({
      members: prevState.members.sort(sortFunc),
    }));
  }

  extendHeaders(validHeaders) {
    if (this.memberHeaders.length - validHeaders.length === 2) {
      return;
    }
    validHeaders.forEach((header) => {
      const newHeader = {
        label: header,
        headerKey: header.toLowerCase(),
      };
      this.memberHeaders.push(newHeader);
    });
  }

  render() {
    const className = classNames('Manager', { hidden: !this.props.focused });

    const flaggedSection = (!this.props.flaggedMembers.length) ? null : (
      <div>
        <h4 id="flaggedHeader">
          Flagged
          <div className="alert">
            <p>{this.props.flaggedMembers.length}</p>
          </div>
        </h4>
        <HeadersManager
          headers={this.memberHeaders}
          sortHandler={this.props.sortFlaggedHandler}
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
            headers={this.memberHeaders}
            sortHandler={this.sortMembers}
          />
          <ul id="MemberList">
            {this.state.members}
          </ul>
        </div>
      </section>
    );
  }
}

export default MemberManager;
