import { combineReducers } from 'redux';
import PanelContainer from './components/containers/PanelContainer/PanelContainerReducers';
import Placement from './components/containers/Placement/PlacementReducers';
import PlacementUI from './components/containers/Placement/PlacementUIReducers';
import HeadersManager from './components/containers/HeadersManager/HeadersManagerReducers';

// overall app state
const placemasterApp = combineReducers({
  PanelContainer,
  Placement,
  PlacementUI,
  HeadersManager,
});

export default placemasterApp;
