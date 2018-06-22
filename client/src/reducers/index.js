import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';

import jobDisplayReducer from './jobDisplayReducer'

export default combineReducers({
  auth, jobs: jobDisplayReducer,
  form: formReducer
});
