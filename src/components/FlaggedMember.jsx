import React from 'react';
import Member from './Member';

class CompName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <Member {...this.props} />
    );
  }
}

export default CompName;
