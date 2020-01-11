import React from 'react';

import roomData from '../../content/roomData.json';

class GroupAssignerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assignedGroup: null,
    };
    this.setAssignedGroup = this.setAssignedGroup.bind(this);
    this.getGroupsPreview = this.getGroupsPreview.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setAssignedGroup(e) {
    this.setState({
      assignedGroup: e.target.value,
    });
  }

  getGroupsPreview() {
    const previewList = [];
    Object.keys(this.props.groupSizes).forEach((group) => {
      const previewID = `groupPreview${group}`;
      const groupPreview = (
        <label
          id={`${previewID}Label`}
          key={group}
          htmlFor={previewID}
        >
          <li>
            <input
              value={group}
              type="radio"
              id={previewID}
              checked={this.state.assignedGroup === group}
              onChange={this.setAssignedGroup}
            />
            <p>{group}</p>
            <p>{roomData.rooms[group].day}</p>
            <p>{roomData.rooms[group].time}</p>
            <p>{this.props.groupSizes[group]}</p>
          </li>
        </label>
      );
      previewList.push(groupPreview);
    });
    return previewList;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.setGroup(this.state.assignedGroup);
  }

  render() {
    const groupsPreview = this.getGroupsPreview();
    return (
      <form action="" onSubmit={this.handleSubmit}>
        <ul className="groupsPreviewList">
          {groupsPreview}
        </ul>
        <input type="submit" />
      </form>
    );
  }
}

export default GroupAssignerForm;
