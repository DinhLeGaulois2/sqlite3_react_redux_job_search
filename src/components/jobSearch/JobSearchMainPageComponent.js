import React from 'react'
import PropTypes from 'prop-types'

import JobSearchDisplayContainer from '../../containers/jobSearch/JobSearchDisplayContainer'
import JobSearchAddContainer from '../../containers/jobSearch/JobSearchAddContainer'

import jobSearchCst from '../../constants/jobSearchCst'

const JobSearchMainPageComponent = ({ status }) => (
    <div className="container">
        {status === jobSearchCst.JOB_ADD && <JobSearchAddContainer />}
        {status != jobSearchCst.JOB_ADD && <JobSearchDisplayContainer />}
    </div>
)

JobSearchMainPageComponent.propTypes = {
    status: PropTypes.string
}

export default JobSearchMainPageComponent
