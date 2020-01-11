import React from 'react';

import GroupAssignerForm from './GroupAssignerForm';

const classNames = require('classnames');

class GroupAssigner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
    this.getGroupsPreview = this.getGroupsPreview.bind(this);
    this.getExpandedInfo = this.getExpandedInfo.bind(this);
    this.toggleExpand = this.toggleExpand.bind(this);
  }

  getGroupsPreview() {
    return (
      <div className="groupsPreview">
        <div className="previewHeaders">
          <h6>Group</h6>
          <h6>Day</h6>
          <h6>Time</h6>
          <h6>Size</h6>
        </div>
        <GroupAssignerForm
          groupSizes={this.props.groupSizes}
          setGroup={this.props.setGroup}
        />
      </div>
    );
  }

  getExpandedInfo() {
    if (this.state.expanded) {
      return this.getGroupsPreview();
    }
    return null;
  }


  toggleExpand(e) {
    e.stopPropagation();
    this.setState((prevState) => ({
      expanded: !prevState.expanded,
    }));
  }

  render() {
    const assignerClass = classNames('GroupAssigner');
    const groupInfo = this.getExpandedInfo();
    return (
      <div className={assignerClass}>
        <button
          type="button"
          onClick={this.toggleExpand}
        >
        Assign Group
        </button>
        {groupInfo}
      </div>
    );
  }
}

export default GroupAssigner;
