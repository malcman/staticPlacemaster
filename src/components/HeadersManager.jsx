import React from 'react';
import ToggleSortHeader from './ToggleSortHeader';

class HeadersManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSort: 'Name',
    };
    this.selectActiveHeader = this.selectActiveHeader.bind(this);
  }

  getSortHeaders() {
    const headers = [];
    this.props.headers.forEach((header) => {
      const newHeader = (
        <ToggleSortHeader
          headerName={header}
          key={header}
          active={header === this.state.currentSort}
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
