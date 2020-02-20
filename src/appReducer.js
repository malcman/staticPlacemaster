import { combineReducers } from 'redux';
import PanelContainer from './components/containers/PanelContainer/PanelContainerReducers';
import Placement from './components/containers/Placement/PlacementReducers';
import HeadersManager from './components/containers/HeadersManager/HeadersManagerReducers';

// overall app state
const placemasterApp = combineReducers({
  PanelContainer,
  Placement,
  HeadersManager,
});

export default placemasterApp;
