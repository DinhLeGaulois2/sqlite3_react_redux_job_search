import React from 'react'
import { connect } from 'react-redux'

import jobSearchAction from '../../actions/jobSearchAction'
import JobSearchAddComponent from '../../components/jobSearch/JobSearchAddComponent'

const mapDispatchToProps = (dispatch) => ({
    onClickAddNewJob: (data) => { dispatch(jobSearchAction.addNewJob(data)) },
    onClickDisplayJobs: (data) => { dispatch(jobSearchAction.setUI2Display(data))}
})

// You have to connect() to any reducers that you wish to connect to yourself
const JobSearchAddContainer = connect(
    null,
    mapDispatchToProps
)(JobSearchAddComponent)

export default JobSearchAddContainer

