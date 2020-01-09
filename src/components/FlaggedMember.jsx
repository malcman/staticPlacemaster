import React from 'react';
import Member from './Member';

class CompName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group: -1,
      expanded: false,
    };
    this.toggleExpand = this.toggleExpand.bind(this);
  }

  toggleExpand() {
    this.setState((prevState) => ({
      expanded: !prevState.expanded,
    }));
  }

  render() {
    return (
      <Member {...this.props} group={this.state.group} />
    );
  }
}

export default CompName;
