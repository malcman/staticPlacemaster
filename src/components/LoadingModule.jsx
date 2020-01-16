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
  return (
    <div
      id="LoadingModule"
      className={moduleClass}
    >
      <h2>Please Wait</h2>
      <p>The optimization is loading...</p>
      <p>Do not close this page.</p>
    </div>
  );
};

export default LoadingModule;
