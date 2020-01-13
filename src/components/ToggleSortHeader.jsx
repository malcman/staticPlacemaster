import React from 'react';

const classNames = require('classnames');

class ToggleSortHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ascending: true,
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.ascendingComp = this.ascendingComp.bind(this);
    this.descendingComp = this.descendingComp.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.active && this.props.active) {
      if (this.state.ascending) {
        // perform ascending comparisons of a.props.headerName and b.props.headerName
        this.props.sortHandler(this.ascendingComp);
      } else {
        // perform descending comparisons
        this.props.sortHandler(this.descendingComp);
      }
    }
  }

  handleToggle() {
    // switch between ascending and descending sorts
    if (this.props.active) {
      this.setState((prevState) => ({
        ascending: !prevState.ascending,
      }), () => {
        if (this.state.ascending) {
          // perform ascending comparisons of a.props.headerName and b.props.headerName
          this.props.sortHandler(this.ascendingComp, this.props);
        } else {
          // perform descending comparisons
          this.props.sortHandler(this.descendingComp, this.props);
        }
      });
    }
    this.props.setSortHandler(this.props.headerName);
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
    const headerClass = classNames(
      'ToggleSortHeader',
      {
        active: this.props.active,
        down: this.state.ascending && this.props.active,
        up: !this.state.ascending && this.props.active,
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
