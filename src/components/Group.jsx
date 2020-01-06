import React from 'react';

const classNames = require('classnames');

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    const groupClass = classNames('Group');
    return (
      <li className={groupClass}>
        <p>{this.props.number}</p>
        <p>{this.props.day}</p>
        <p>{this.props.time}</p>
        <p>{this.props.campus}</p>
        <p>{this.props.room}</p>
        <p>{this.props.level}</p>
      </li>
    );
  }
}

export default Group;
