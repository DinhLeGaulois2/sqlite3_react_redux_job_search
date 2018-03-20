import React from 'react'
import { connect } from 'react-redux'

import jobSearchAction from '../../actions/jobSearchAction'
import JobSearchUpdateComponent from '../../components/jobSearch/JobSearchUpdateComponent'

const mapDispatchToProps = (dispatch) => ({
    onClickSetUpdateDone: (data) => { dispatch(jobSearchAction.setUpdateDone(data))},
})

// You have to connect() to any reducers that you wish to connect to yourself
const JobSearchUpdateContainer = connect(
    null,
    mapDispatchToProps
)(JobSearchUpdateComponent)

export default JobSearchUpdateContainer

