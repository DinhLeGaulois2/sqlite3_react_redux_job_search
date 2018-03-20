import { applyMiddleware, createStore, combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { reducer as reduxFormReducer } from 'redux-form'

import jobSearchReducer from './reducers/jobSearchReducer'

const middleware = applyMiddleware(promise(), thunk, logger());

export default createStore(combineReducers({
    jobs: jobSearchReducer,

    form: reduxFormReducer // mounted under "form"
}), middleware);