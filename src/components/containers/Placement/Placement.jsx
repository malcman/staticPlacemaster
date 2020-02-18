import React from 'react';
import { connect } from 'react-redux';

import PlacementView from '../../PlacementView';

import {
  focusGroups,
  focusMembers,
} from './PlacementUIActions';

function mapStateToProps(state) {
  return {
    groupFocus: state.PlacementUI.groupFocus,
    numUnplaced: state.Placement.flaggedMembers.length,
    title: state.Placement.title,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    focusMembers: () => {
      dispatch(focusMembers());
    },
    focusGroups: () => {
      dispatch(focusGroups());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlacementView);
