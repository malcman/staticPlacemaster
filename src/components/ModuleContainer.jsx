// Wrapper component to display sliding modules
import React from 'react';

import WelcomeModule from './WelcomeModule';
import PlacementForm from './PlacementForm';
import LoadingModule from './LoadingModule';

class ModuleContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusIndex: 0,
    };
    this.getBackButton = this.getBackButton.bind(this);
    this.getNextButton = this.getNextButton.bind(this);
    this.getActiveIndex = this.getActiveIndex.bind(this);
    this.getPanels = this.getPanels.bind(this);
    this.decrementFocusIndex = this.decrementFocusIndex.bind(this);
    this.incrementFocusIndex = this.incrementFocusIndex.bind(this);
  }

  getBackButton(panels) {
    const backButton = (
      <button
        className="backButton"
        type="button"
        onClick={this.decrementFocusIndex}
      >
      Back
      </button>
    );
    const focusPanel = panels[this.state.focusIndex];
    // if this isn't the first panel AND
    // focusPanel does not have defined backHandler,
    // return a back button
    if (this.state.focusIndex > 0
      && (focusPanel && focusPanel.props.backHandler === undefined)) {
      return backButton;
    }
    return null;
  }

  getNextButton(panels) {
    const nextButton = (
      <button
        className="nextButton"
        type="button"
        onClick={this.incrementFocusIndex}
      >
      Next
      </button>
    );
    const focusPanel = panels[this.state.focusIndex];
    // if this isn't the last panel or
    // focusPanel does not have defined nextHandler,
    // return a next button
    if (this.state.focusIndex < panels.length - 1
      && (focusPanel && focusPanel.props.nextHandler === undefined)) {
      return nextButton;
    }
    return null;
  }

  getActiveIndex(index) {
    // returns -1 if pushedLeft, 0 if center view, ad 1 if pushedRight
    // compares index parameter to focusIndex
    if (index < this.state.focusIndex) {
      return -1;
    }
    if (index === this.state.focusIndex) {
      return 0;
    }
    return 1;
  }

  getPanels() {
    const panels = [
      // basic panel to initiate sequence
      <WelcomeModule
        key={0}
        activeIndex={this.getActiveIndex(0)}
        nextHandler={this.incrementFocusIndex}
      />,
      // actual form with data for placement
      <PlacementForm
        key={1}
        activeIndex={this.getActiveIndex(1)}
        backHandler={this.decrementFocusIndex}
        nextHandler={this.incrementFocusIndex}
        actionURL={process.env.PLACEMENT_FORM_ACTION}
      />,
      // informational loading module while server creates placement
      <LoadingModule
        key={2}
        activeIndex={this.getActiveIndex(2)}
        backHandler={this.decrementFocusIndex}
      />,
    ];
    return panels;
  }

  decrementFocusIndex() {
    this.setState((prevState) => ({
      focusIndex: prevState.focusIndex - 1,
    }), () => {
      // this.updateModuleClasses(this.state.focusIndex);
    });
  }

  incrementFocusIndex() {
    this.setState((prevState) => ({
      focusIndex: prevState.focusIndex + 1,
    }), () => {
      // this.updateModuleClasses(this.state.focusIndex);
    });
  }


  render() {
    const panels = this.getPanels();
    const backButton = this.getBackButton(panels);
    const nextButton = this.getNextButton(panels);
    return (
      <div className="moduleWindow" id="startupModule">
        {backButton}
        {panels}
        {nextButton}
      </div>
    );
  }
}

export default ModuleContainer;
