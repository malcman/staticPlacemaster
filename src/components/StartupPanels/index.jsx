// Presentational wrapper component for panels on startup page
import React from 'react';
import PropTypes from 'prop-types';

import WelcomePanel from './WelcomePanel';
import PlacementFormPanel from './PlacementFormPanel';
import LoadingPanel from './LoadingPanel';
import styles from './StartupPanels.module.scss';


function getPanelClass(activeIndex, panelIndex) {
  // Get class string for styling panels.
  // compares the index of the panel to the current activeIndex
  // of the parent container
  if (panelIndex < activeIndex) {
    return 'pushedLeft';
  }
  if (panelIndex === activeIndex) {
    return 'center';
  }
  return 'pushedRight';
}

function getBackButton(activeIndex, backHandler) {
  const backButton = (
    <button
      className={styles.backButton}
      type="button"
      onClick={() => backHandler(activeIndex)}
    >
    Back
    </button>
  );
  // if not the first panel (zero-index), return backButton
  return activeIndex ? backButton : null;
}


// define presentational panels that are contained by this wrapper
const panels = [
  // startup/intro
  <WelcomePanel />,

  // form for creating placement
  <PlacementFormPanel actionURL={process.env.PLACEMENT_FORM_ACTION} />,

  // loading information while waiting for optimization response
  <LoadingPanel />,
];


const StartupPanels = ({ activeIndex, nextHandler, backHandler }) => (
  <div className={styles.moduleWindow} id="startupModule">
    {getBackButton(activeIndex, backHandler)}
    {panels.map((panel, index) => {
      // create panel of specified type with relevant props
      let next = nextHandler;
      let back = backHandler;
      // don't allow first panel to have a back button
      // or last panel to have a next
      if (!index) back = () => {};
      if (index === panels.length - 1) next = () => {};
      return (
        <panel.type
          {...panel.props}
          key={index} // eslint-disable-line
          index={index}
          panelClass={getPanelClass(activeIndex, index)}
          nextHandler={next}
          backHandler={back}
        />
      );
    })}
  </div>
);

StartupPanels.propTypes = {
  // index of panels list representing the panel in view
  activeIndex: PropTypes.number.isRequired,

  // dispatcher that handles navigating to the next panel
  nextHandler: PropTypes.func.isRequired,

  // dispatcher that handles navigating to the next panel
  backHandler: PropTypes.func.isRequired,
};

export default StartupPanels;
