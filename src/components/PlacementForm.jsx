import React from 'react';
import { navigate } from 'gatsby';

const classNames = require('classnames');

class PlacementForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: '',
      groupMin: undefined,
      groupMax: undefined,
    };
    this.getBackButton = this.getBackButton.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleMaxChange = this.handleMaxChange.bind(this);
    this.handleMinChange = this.handleMinChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.signUpRef = React.createRef();
    this.groupsRef = React.createRef();
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

  handleMaxChange(e) {
    this.setState({
      groupMax: e.target.value,
    });
  }

  handleMinChange(e) {
    this.setState({
      groupMin: e.target.value,
    });
  }

  handleTitleChange(e) {
    this.setState({
      titleText: e.target.value,
    });
  }

  validateForm() {
    // Return true if titleText has a value and both files are present.
    return (this.state.titleText && this.state.titleText !== ''
      && this.signUpRef.current.files.length > 0
      && this.groupsRef.current.files.length > 0
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    // create FormData object from the form
    // note: use network inspector to observe behavior
    // will not show up on console.log
    const formData = new FormData(e.target);
    formData.append('API_KEY', process.env.API_KEY);
    // formData.append('group_min', 4);
    // formData.append('group_max', 12);
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


    // send the form data to this.props.actionURL
    const xhr = new XMLHttpRequest();
    xhr.open('POST', this.props.actionURL, true);
    xhr.setRequestHeader('credentials', 'same-origin');
    xhr.onload = () => {
      // make sure all is kosher
      if (xhr.status >= 200 && xhr.status < 300) {
        // get JSON data to send to placement page
        const data = JSON.parse(xhr.response);
        const title = this.state.titleText;
        // send the data and navigate the user to placement
        navigate('/placement/', { state: { data, title } });
      }
    };
    xhr.onerror = () => {
      const alertText = 'There was a problem submitting the form.\n Please make sure the right files have been selected and try again.';
      window.alert(alertText);
      this.props.backHandler();
    };
    xhr.send(formData);
    // display loading module
    this.props.nextHandler();
  }

  render() {
    const numOptions = [];
    numOptions.push(<option key={-1} value={undefined}>{undefined}</option>);
    for (let i = 1; i < 26; i += 1) {
      numOptions.push(<option key={i} value={i}>{i}</option>);
    }
    const moduleClass = classNames(
      'modulePane',
      {
        pushedLeft: this.props.activeIndex < 0,
        center: this.props.activeIndex === 0,
        pushedRight: this.props.activeIndex > 0,
      },
    );
    const backButton = this.getBackButton();
    const formID = 'newPlacementForm';
    return (
      <div id="newPlacementModule" className={moduleClass}>
        {backButton}
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
            onChange={this.handleTitleChange}
            value={this.state.titleText}
            form={formID}
            required
          />
          {/* Currently needed for form to be accepted on server. */}
          <input
            type="text"
            name="user"
            value="michigan_spring_2019_dev"
            className="hidden"
            readOnly
            form={formID}
          />

          <h3>Sign-Up File:</h3>
          <input
            type="file"
            name="responses_csv_file"
            onChange={this.handleSignUpChange}
            form={formID}
            ref={this.signUpRef}
            required
          />

          <h3>Groups File:</h3>
          <input
            type="file"
            name="rooms_csv_file"
            onChange={this.handleGroupsChange}
            form={formID}
            ref={this.groupsRef}
            required
          />

          <input
            type="submit"
            name="placementSubmit"
            value="Create and Optimize"
            form={formID}
          />
        </form>
      </div>
    );
  }
}

export default PlacementForm;
