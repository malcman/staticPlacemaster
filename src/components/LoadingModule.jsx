import React from 'react';

const classNames = require('classnames');

const LoadingModule = (props) => {
  const moduleClass = classNames(
    'modulePane',
    {
      pushedLeft: props.activeIndex < 0,
      center: props.activeIndex === 0,
      pushedRight: props.activeIndex > 0,
    },
  );
  const backButton = props.activeIndex !== 0 ? null : (
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
      id="LoadingModule"
      className={moduleClass}
    >
      {backButton}
      <h2>Please Wait</h2>
      <p>The optimization is loading...</p>
      <p>Do not close this page.</p>
    </div>
  );
};

export default LoadingModule;
