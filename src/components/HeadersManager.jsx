import React from 'react';
import PropTypes from 'prop-types';
import ToggleSortHeader from './ToggleSortHeader';

class HeadersManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSort: 'Name',
    };
    this.selectActiveHeader = this.selectActiveHeader.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.headers
        && prevProps.headers.length !== this.props.headers.length) {
      this.setState({
        currentSort: this.props.headers[0].label,
      });
    }
  }

  getSortHeaders() {
    const headers = [];
    this.props.headers.forEach((header) => {
      const newHeader = (
        <ToggleSortHeader
          headerName={header.label}
          headerKey={header.headerKey}
          key={header.label}
          active={header.label === this.state.currentSort}
          setSortHandler={this.selectActiveHeader}
          sortHandler={this.props.sortHandler}
          flagged={this.props.flagged}
        />
      );
      headers.push(newHeader);
    });
    return headers;
  }

  selectActiveHeader(headerName) {
    this.setState({
      currentSort: headerName,
    });
  }

  render() {
    const sortHeaders = this.getSortHeaders();
    return (
      <div className="headersContainer">
        {sortHeaders}
      </div>
    );
  }
}

export default HeadersManager;

HeadersManager.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.object),
};

// list of objects descibing elements being sorted
// label: String to display on UI
// headerKey: name of prop to sort elements by
HeadersManager.defaultProps = {
  headers: [
    { label: '', headerKey: '' },
  ],
};
