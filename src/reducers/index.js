// reducers/index.js
import { combineReducers } from 'redux';
import patientReducer from './patientReducer';

const rootReducer = combineReducers({
  patientReducer,
  // Add other reducers if needed
});

export default rootReducer;
