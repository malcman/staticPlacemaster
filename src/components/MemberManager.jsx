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
    return (
      <section
        className={className}
        id="MemberManager"
        aria-labelledby="MemberTag"
      >
        <HeadersManager
          headers={memberHeaders}
          currentSort="Name"
          sortHandler={this.props.sortHandler}
        />
        <ul id="MemberList">
          {this.props.members}
        </ul>
      </section>
    );
  }
}

export default MemberManager;
