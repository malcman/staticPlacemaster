import React from 'react';
import HeadersManager from './HeadersManager';

const classNames = require('classnames');

class GroupManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    const className = classNames('Manager', { hidden: !this.props.focused });

    // TODO: change to get this from data
    // column headers for each member
    const groupHeaders = ['Number', 'Day', 'Time', 'Campus', 'Room', 'Level'];
    return (
      <section
        className={className}
        id="GroupManager"
        aria-labelledby="GroupTag"
      >
        <HeadersManager
          headers={groupHeaders}
          currentSort="Number"
          sortHandler={this.props.sortHandler}
        />
        <ul id="GroupList">
          {this.props.groups}
        </ul>
      </section>
    );
  }
}

export default GroupManager;
