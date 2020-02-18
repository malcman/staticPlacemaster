import React from 'react';

const classNames = require('classnames');

class ToggleSortHeader extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.ascendingComp = this.ascendingComp.bind(this);
    this.descendingComp = this.descendingComp.bind(this);
  }

  componentDidUpdate(prevProps) {
    // updates list sortFunc based on received props
    const {
      active,
      ascending,
      setSortFunc,
    } = this.props;

    // handle selection when not previously active
    // sort by previously stored order
    if (!prevProps.active && active) {
      if (ascending) {
        setSortFunc(this.ascendingComp);
      } else {
        setSortFunc(this.descendingComp);
      }
      return;
    }

    //  handle toggle when already active
    if (active) {
      if (!prevProps.ascending && ascending) {
        setSortFunc(this.ascendingComp);
      } else if (prevProps.ascending && !ascending) {
        setSortFunc(this.descendingComp);
      }
    }
  }

  handleToggle() {
    // ensures this SortHeader is specified as active for this list
    // if already active, toggle sort direction
    const {
      active,
      headerKey,
      toggleAscend,
      setSortKey,
    } = this.props;
    if (active) {
      toggleAscend(headerKey);
    }
    setSortKey(headerKey);
  }

  ascendingComp(a, b) {
    const propField = this.props.headerKey;
    if (a.props[propField] < b.props[propField]) {
      return -1;
    }
    if (a.props[propField] === b.props[propField]) {
      return 0;
    }
    return 1;
  }

  descendingComp(a, b) {
    const propField = this.props.headerKey;
    if (a.props[propField] > b.props[propField]) {
      return -1;
    }
    if (a.props[propField] === b.props[propField]) {
      return 0;
    }
    return 1;
  }


  render() {
    const { active, ascending } = this.props;
    const headerClass = classNames(
      'ToggleSortHeader',
      {
        active,
        down: ascending && active,
        up: !ascending && active,
      },
    );

    return (
      <div className={headerClass} onClick={this.handleToggle}>
        <h5>{this.props.headerName}</h5>
      </div>
    );
  }
}

export default ToggleSortHeader;
