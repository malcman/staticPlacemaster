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
    // if (!prevProps.active && this.props.active) {
    //   if (this.state.ascending) {
    //     // perform ascending comparisons of a.props.headerName and b.props.headerName
    //     this.props.sortHandler(this.ascendingComp);
    //   } else {
    //     // perform descending comparisons
    //     this.props.sortHandler(this.descendingComp);
    //   }
    // }
  }

  handleToggle() {
    // switch between ascending and descending sorts
    // if (this.props.active) {
    //   this.setState((prevState) => ({
    //     ascending: !prevState.ascending,
    //   }), () => {
    //     if (this.state.ascending) {
    //       // perform ascending comparisons of a.props.headerName and b.props.headerName
    //       this.props.sortHandler(this.ascendingComp, this.props);
    //     } else {
    //       // perform descending comparisons
    //       this.props.sortHandler(this.descendingComp, this.props);
    //     }
    //   });
    // }
    // this.props.setSortHandler(this.props.headerName);
    const {
      active,
      headerKey,
      toggleAscend,
      setSort,
    } = this.props;
    if (active) {
      toggleAscend(headerKey);
    }
    setSort(headerKey);
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
