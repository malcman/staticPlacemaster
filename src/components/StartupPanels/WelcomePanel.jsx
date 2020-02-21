// WelcomePanel
// Short text introduction panel explaining application use.
import React from 'react';
import PropTypes from 'prop-types';
import styles from './WelcomePanel.module.scss';

const classNames = require('classnames');


const WelcomePanel = (props) => {
  const panelClass = classNames(
    'panel',
    props.panelClass,
  );

  return (
    <div
      id={styles.WelcomeModule}
      className={panelClass}
    >
      <h2>Welcome.</h2>
      <p>
        This is a scheduling app for Wolverine Support Network,
        a peer-support organization at the University of Michigan.
      </p>
      <h3>You will need:</h3>
      <ul>
        <li><p>a .csv file specifying member availability (from Qualtrics)</p></li>
        <li><p>a .csv file specifying this semester&apos;s groups.</p></li>
      </ul>
      <button
        type="button"
        id={styles.newPlacementButton}
        onClick={() => props.nextHandler(props.index)}
      >
        Create new placements
      </button>
    </div>
  );
};

WelcomePanel.propTypes = {
  // function that handles advancing to the next panel in the container
  nextHandler: PropTypes.func,

  // panelClass determines placement relative to container
  panelClass: PropTypes.string,
};

WelcomePanel.defaultProps = {
  nextHandler: undefined,
  panelClass: 'center',
};

export default WelcomePanel;
