import React from 'react'
import { connect } from 'react-redux'
require('../../style.scss')
import jobSearchAction from '../../actions/jobSearchAction'

import JobSearchMainPageComponent from '../../components/jobSearch/JobSearchMainPageComponent'

const mapStateToProps = (state) => ({
    status: state.jobs.status
})

const mapDispatchToProps = (dispatch) => ({
    onClickShowJobs: (data) => { dispatch(jobSearchAction.setUI2Display(data))},
})

const JobSearchMainPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(JobSearchMainPageComponent)

export default JobSearchMainPageContainer