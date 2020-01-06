import React from 'react';
import Member from './Member';

class CompName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group: -1,
    };
  }

  render() {
    return (
      <Member {...this.props} group={this.state.group} />
    );
  }
}

export default CompName;
