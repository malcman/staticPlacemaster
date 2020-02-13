import { combineReducers } from 'redux';
import PanelContainer from './PanelContainer';
import Placement from './Placement';
import PlacementUI from './PlacementUI';

// overall app state
const placemasterApp = combineReducers({
  PanelContainer,
  Placement,
  PlacementUI,
});

export default placemasterApp;
