import { combineReducers } from 'redux';
import PanelContainer from './components/containers/PanelContainer/PanelContainerReducers';
import Placement from './components/containers/Placement/PlacementReducers';
import PlacementUI from './components/containers/Placement/PlacementUIReducers';

// overall app state
const placemasterApp = combineReducers({
  PanelContainer,
  Placement,
  PlacementUI,
});

export default placemasterApp;
