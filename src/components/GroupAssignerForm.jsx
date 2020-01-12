import React from 'react';

class GroupAssignerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assignedGroup: '',
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
    const { allGroupsInfo } = this.props;
    Object.keys(allGroupsInfo).forEach((group) => {
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
            <p>{allGroupsInfo[group].time}</p>
            <p>{allGroupsInfo[group].size}</p>
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
        <input
          type="submit"
          disabled={this.state.assignedGroup === ''}
          value={`Assign Group ${this.state.assignedGroup}`}
        />
      </form>
    );
  }
}

export default GroupAssignerForm;
