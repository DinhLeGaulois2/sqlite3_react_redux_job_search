import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "./store";

import JobSearchMainPageContainer from './containers/jobSearch/JobSearchMainPageContainer';

ReactDOM.render(
    <Provider store={store}>
        <JobSearchMainPageContainer />
    </Provider>,
    document.getElementById('app')
);