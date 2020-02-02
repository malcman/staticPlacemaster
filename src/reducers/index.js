import { combineReducers } from 'redux';
import PanelContainer from './PanelContainer';

// overall app state
const placemasterApp = combineReducers({
  PanelContainer,
});

export default placemasterApp;
