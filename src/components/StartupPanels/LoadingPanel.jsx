import React from 'react';
import styles from './LoadingPanel.module.scss';

const classNames = require('classnames');

const LoadingPanel = (props) => {
  const panelClass = classNames(
    'panel',
    props.panelClass,
  );
  const backButton = props.visualIndex !== 0 ? null : (
    <button
      className="backButton"
      type="button"
      onClick={props.backHandler}
    >
    Back
    </button>
  );
  return (
    <div
      id={styles.LoadingPanel}
      className={panelClass}
    >
      {backButton}
      <h2>Please Wait</h2>
      <p>The optimization is loading...</p>
      <p>Do not close this page.</p>
    </div>
  );
};

export default LoadingPanel;
