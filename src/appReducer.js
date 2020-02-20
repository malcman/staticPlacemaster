import { combineReducers } from 'redux';
import PanelContainer from './components/containers/PanelContainer/reducers';
import Placement from './components/containers/Placement/reducers';
import HeadersManager from './components/containers/HeadersManager/reducers';

// overall app state
const placemasterApp = combineReducers({
  PanelContainer,
  Placement,
  HeadersManager,
});

export default placemasterApp;
