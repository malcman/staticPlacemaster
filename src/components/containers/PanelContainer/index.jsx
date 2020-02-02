// Wrapper component to display sliding modules
import { connect } from 'react-redux';
import {
  incrementModule,
  decrementModule,
} from '../../../actions/PanelContainerActions';

import StartupPanels from '../../StartupPanels/';

// props being passed to presentational components
const mapStateToProps = (state) => ({
  activeIndex: state.PanelContainer.activeIndex,
});

const mapDispatchToProps = (dispatch) => (
  {
    nextHandler: (panelIndex) => {
      dispatch(incrementModule(panelIndex));
    },
    backHandler: (panelIndex) => {
      dispatch(decrementModule(panelIndex));
    },
  }
);

const PanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StartupPanels);

export default PanelContainer;
