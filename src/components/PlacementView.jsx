import React from 'react';
import PropTypes from 'prop-types';
import { CSVLink } from 'react-csv';

import styles from '../styles/PlacementView.module.scss';

import PlacementTags from './PlacementTags';
import GroupManager from './containers/GroupManager/GroupManager';
import MemberManager from './containers/MemberManager/MemberManager';


class PlacementView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupFocus: true,
    };
    this.focusGroups = this.focusGroups.bind(this);
    this.focusMembers = this.focusMembers.bind(this);
    this.validateBeforeDownload = this.validateBeforeDownload.bind(this);
  }

  validateBeforeDownload() {
    // ensure user is aware of unplaced members before download
    if (this.props.numUnplaced) {
      const confMsg = 'There are still unplaced members present.\nProceed with download?';
      const proceed = window.confirm(confMsg);  // eslint-disable-line
      return proceed;
    }
    return true;
  }

  focusGroups() {
    this.setState({
      groupFocus: true,
    });
  }

  focusMembers() {
    this.setState({
      groupFocus: false,
    });
  }

  render() {
    const {
      numUnplaced,
      title,
      csvHeaders,
      csvData,
    } = this.props;
    const { groupFocus } = this.state;
    return (
      <section className={styles.Placement}>
        <div id={styles.PlacementHeader}>
          <h1 className={styles.placementName}>{title}</h1>
          <CSVLink
            id={styles.csvButton}
            headers={csvHeaders}
            data={csvData}
            filename={`${title}_Placement.csv`}
            onClick={() => this.validateBeforeDownload(numUnplaced)}
          >
          Generate Attendance File
          </CSVLink>
          <PlacementTags
            focusMembers={this.focusMembers}
            focusGroups={this.focusGroups}
            numUnplaced={numUnplaced}
            groupFocus={groupFocus}
          />
        </div>
        <GroupManager focused={groupFocus} />
        <MemberManager focused={!groupFocus} />
      </section>
    );
  }
}

PlacementView.propTypes = {
  // length of unplaced member list
  numUnplaced: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default PlacementView;
