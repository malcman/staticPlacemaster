// GroupAssignerForm
// lists groups and handles member assignment
import React from 'react';
import PropTypes from 'prop-types';
import styles from './GroupAssigner.module.scss';

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

  componentDidUpdate(prevProps) {
    // clear previous selection if groups are updated
    // to prevent accidental assignment
    if (prevProps.groups !== this.props.groups) {
      this.setAssignedGroup('');
    }
  }

  setAssignedGroup(assignedGroup) {
    this.setState({
      assignedGroup,
    });
  }

  getGroupsPreview() {
    // return list of input elements for Group Assigner form
    const { groups } = this.props;
    const previewList = groups.map((group) => {
      const previewID = `groupPreview${group.group_id}`;
      let groupSize = 0;
      if (group.members) groupSize = group.members.length;
      const groupPreview = (
        // wrap with label to improve selection UX
        <label
          id={`${previewID}Label`}
          key={group.group_id}
          htmlFor={previewID}
        >
          <li>
            <input
              value={group.group_id}
              type="radio"
              id={previewID}
              checked={this.state.assignedGroup === group.group_id}
              onChange={(e) => this.setAssignedGroup(Number(e.target.value))}
            />
            <p>{group.group_id}</p>
            <p>{group.time}</p>
            <p>{groupSize}</p>
          </li>
        </label>
      );
      return groupPreview;
    });
    return previewList;
  }

  handleSubmit(e) {
    e.preventDefault();
    // dispatch action to assign parent member to group
    this.props.placeMember(this.state.assignedGroup);
  }

  render() {
    const { assignedGroup } = this.state;
    const groupsPreview = this.getGroupsPreview();
    return (
      <form action="" onSubmit={this.handleSubmit}>
        <ul className={styles.groupsPreviewList}>
          {groupsPreview}
        </ul>
        <input
          type="submit"
          disabled={assignedGroup === ''}
          value={`Assign Group ${assignedGroup}`}
        />
      </form>
    );
  }
}

GroupAssignerForm.propTypes = {
  placeMember: PropTypes.func.isRequired,
  groups: PropTypes.arrayOf(PropTypes.shape({
    campus: PropTypes.string.isRequired,
    grad_standing: PropTypes.string.isRequired,
    group_id: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    members: PropTypes.arrayOf(PropTypes.number),
  })).isRequired,
};

export default GroupAssignerForm;
