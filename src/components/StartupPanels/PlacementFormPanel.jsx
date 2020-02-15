import React from 'react';
import { connect } from 'react-redux';
import { updateTitle, fetchPlacement } from '../containers/Placement/PlacementActions';
import styles from './PlacementFormPanel.module.scss';

const classNames = require('classnames');

class PlacementFormPanel extends React.Component {
  constructor(props) {
    super(props);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.signUpRef = React.createRef();
    this.groupsRef = React.createRef();
  }

  handleTitleChange(title) {
    this.props.dispatch(updateTitle(title));
  }

  validateForm() {
    // Return true if titleText has a value and both files are present.
    const valid = (this.props.title && this.props.title !== ''
      && this.signUpRef.current.files.length > 0
      && this.groupsRef.current.files.length > 0
    );
    return valid;
  }

  handleSubmit(e) {
    e.preventDefault();
    // create FormData object from the form
    // note: use network inspector to observe behavior
    // will not show up on console.log
    const formData = new FormData(e.target);
    formData.append('API_KEY', process.env.API_KEY);
    formData.append('user', 'michigan_spring_2019_dev');

    // delete unset values
    // if (!this.state.groupMin) formData.delete('group_min');
    // if (!this.state.groupMax) formData.delete('group_max');

    if (!this.validateForm()) {
      if (!this.signUpRef.current.files.length
        || !this.groupsRef.current.files.length) {
        window.alert('Make sure both signups.csv and groups.csv are chosen.');
      }
      return;
    }

    const { actionURL } = this.props;
    this.props.dispatch(fetchPlacement(formData, actionURL));
    // display loading module
    this.props.nextHandler(this.props.index);
  }

  render() {
    const panelClass = classNames(
      'panel',
      this.props.panelClass,
    );
    const formID = 'newPlacementForm';
    return (
      <div className={panelClass}>
        <form
          id={formID}
          onSubmit={this.handleSubmit}
          method="POST"
          encType="multipart/form-data"
        >
          <h3>Title: </h3>
          <input
            type="text"
            placeholder="i.e. WSN Fall '20"
            name="placementTitle"
            onChange={(e) => this.handleTitleChange(e.target.value)}
            value={this.props.title}
            form={formID}
            required
          />

          <h3>Sign-Up File:</h3>
          <input
            type="file"
            name="responses_csv_file"
            form={formID}
            ref={this.signUpRef}
            required
          />

          <h3>Groups File:</h3>
          <input
            type="file"
            name="rooms_csv_file"
            form={formID}
            ref={this.groupsRef}
            required
          />

          <input
            type="submit"
            name="placementSubmit"
            value="Optimize"
            form={formID}
          />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    isFetching,
    didInvalidate,
    title,
    placementResponse,
  } = state.Placement;
  return {
    isFetching,
    didInvalidate,
    title,
    placementResponse,
  };
}

export default connect(mapStateToProps)(PlacementFormPanel);
