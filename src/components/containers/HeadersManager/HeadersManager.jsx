import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ToggleSortHeader from '../../ToggleSortHeader';

import {
  registerHeaders,
  toggleListAscend,
  setCurrentSort,
} from './HeadersManagerActions';

class HeadersManager extends React.Component {
  componentDidMount() {
    const { headers, register } = this.props;
    const sortKeys = headers.map((header) => header.headerKey);
    register(sortKeys);
  }

  render() {
    const {
      setSort,
      toggleAscend,
      headers,
      headersAscending,
    } = this.props;
    return (
      <div className="headersContainer">
        {headers.map((header) => (
          <ToggleSortHeader
            key={header.label}
            headerName={header.label}
            headerKey={header.headerKey}
            active={header.headerKey === this.props.currentSort}
            ascending={headersAscending[header.headerKey]}
            setSort={setSort}
            toggleAscend={toggleAscend}
          />
        ))}
      </div>
    );
  }
}

HeadersManager.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.object),
  list: PropTypes.string.isRequired,
};

// list of objects descibing elements being sorted
// label: String to display on UI
// headerKey: name of prop to sort elements by
HeadersManager.defaultProps = {
  headers: [
    { label: '', headerKey: '' },
  ],
};

function mapStateToProps(state, ownProps) {
  const { list } = ownProps;
  let currentSort = '';
  let headersAscending = {};
  if (list && state.HeadersManager[list]) {
    currentSort = state.HeadersManager[list].currentSort;
    headersAscending = state.HeadersManager[list].headersAscending;
  }
  return {
    currentSort,
    headersAscending,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { list } = ownProps;
  return {
    setSort: (sortKey) => {
      dispatch(setCurrentSort(list, sortKey));
    },
    toggleAscend: (sortKey) => {
      dispatch(toggleListAscend(list, sortKey));
    },
    register: (sortKeys) => {
      dispatch(registerHeaders(list, sortKeys));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeadersManager);
