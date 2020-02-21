import { connect } from 'react-redux';

import { csvMemberHeaders, getCSVData } from '../../../helpers/export';

import PlacementView from '../../PlacementView';

function mapStateToProps(state) {
  return {
    numUnplaced: state.Placement.flaggedMembers.length,
    title: state.Placement.title,
    csvHeaders: csvMemberHeaders,
    csvData: getCSVData(state),
  };
}

export default connect(mapStateToProps)(PlacementView);
