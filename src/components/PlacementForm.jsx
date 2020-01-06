import React from 'react';

const classNames = require('classnames');

class PlacementForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: '',
      signUpFile: null,
      groupsFile: null,
    };
    this.getBackButton = this.getBackButton.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSignUpChange = this.handleSignUpChange.bind(this);
    this.handleGroupsChange = this.handleGroupsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getBackButton() {
    const backButton = (
      <button
        className="backButton"
        type="button"
        onClick={this.props.backHandler}
      >
      Back
      </button>
    );
    if (this.props.activeIndex === 0) {
      return backButton;
    }
    return null;
  }

  handleTitleChange(e) {
    this.setState({
      titleText: e.target.value,
    });
  }

  handleSignUpChange(e) {
    // TODO do some header/size checking in here
    this.setState({
      signUpFile: e.target.files[0],
    });
  }

  handleGroupsChange(e) {
    console.log(e.target.files);
  }

  handleSubmit(e) {
    console.log(e);
  }

  render() {
    const moduleClass = classNames(
      'modulePane',
      {
        pushedLeft: this.props.activeIndex < 0,
        center: this.props.activeIndex === 0,
        pushedRight: this.props.activeIndex > 0,
      },
    );
    const backButton = this.getBackButton();
    return (
      <div id="newPlacementModule" className={moduleClass}>
        {backButton}
        <form
          id="newPlacementForm"
          action="/placement/create/"
          method="POST"
          encType="multipart/form-data"
          onSubmit={this.handleSubmit}
        >
          <h3>Title: </h3>
          <input
            type="text"
            placeholder="i.e. WSN Fall '20"
            name="placementTitle"
            onChange={this.handleTitleChange}
            value={this.state.titleText}
          />

          <h3>Sign-Up File:</h3>
          <input
            type="file"
            name="signUpFile"
            onChange={this.handleSignUpChange}
          />

          <h3>Groups File:</h3>
          <input
            type="file"
            name="groupsFile"
            onChange={this.handleGroupsChange}
          />
          <input
            type="submit"
            name="placementSubmit"
            value="Create and Optimize"
            onClick={this.handleSubmit}
          />
        </form>
      </div>
    );
  }
}

export default PlacementForm;
