import React from 'react'
import { connect } from 'react-redux'

import jobSearchAction from '../../actions/jobSearchAction'
import JobSearchDisplayComponent from '../../components/jobSearch/JobSearchDisplayComponent'

const mapStateToProps = (state) => ({
    jobs: state.jobs.jobs2Display,
    displayStatus: state.jobs.status,
    previousStatus: state.jobs.previousStatus
})

const mapDispatchToProps = (dispatch) => ({
    onClickShowPending: () => { dispatch(jobSearchAction.set2ShowPending()) },
    onClickShowMissed: () => { dispatch(jobSearchAction.set2ShowMissed()) },
    onClickShowRecentFirst: () => { dispatch(jobSearchAction.set2ShowRecentFirst()) },
    onClickShowAll: () => { dispatch(jobSearchAction.set2ShowAll()) },
    onClickShowOne: (jobId) => { dispatch(jobSearchAction.setShowAJob(jobId)) },
    onClickCloseOne: () => { dispatch(jobSearchAction.setCloseAJob()) },
    onClickSetUpdate: (jobId) => { dispatch(jobSearchAction.setUpdate(jobId)) },
    onClickSetUpdateCancel: () => { dispatch(jobSearchAction.setUpdateCancel()) },
    onClickSetCompanyByName: () => { dispatch(jobSearchAction.sortCompanyByName()) }
})

// You have to connect() to any reducers that you wish to connect to yourself
const JobSearchDisplayContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(JobSearchDisplayComponent)

export default JobSearchDisplayContainer

