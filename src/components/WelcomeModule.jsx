import React from 'react';
import PropTypes from 'prop-types';

const classNames = require('classnames');


const WelcomeModule = (props) => {
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
      id="WelcomeModule"
      className={moduleClass}
    >
      <h2>Welcome.</h2>
      <button
        type="button"
        id="newPlacementButton"
        onClick={props.nextHandler}
      >
        Create new placements
      </button>
    </div>
  );
};

WelcomeModule.propTypes = {
  nextHandler: PropTypes.func,
};

WelcomeModule.defaultProps = {
  nextHandler: undefined,
};

export default WelcomeModule;