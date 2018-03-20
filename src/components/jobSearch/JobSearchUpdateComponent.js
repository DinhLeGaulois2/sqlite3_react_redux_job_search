import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field, reset, formValueSelector } from 'redux-form'
import PropTypes from 'prop-types'

import Modal from '../../common/modal/modal'

import {
    JOB_DISPLAY_LIST,
    JOB_ADD, JOB_UPDATE, JOB_DISPLAY_ONE,
    JOB_SET_PENDING, JOB_SET_MISSED, JOB_SET_RECENT_FIRST,
    JOB_FETCH_ALL,
    JOB_STATUS_ADD, JOB_STATUS_DISPLAY
} from '../../constants/jobSearchCst'

import { renderInputField, renderTextareaField } from '../../common/reduxForm/renderField'

let JobSearchUpdateComponent = ({ handleSubmit, invalid, submitting, reset, onClickSetUpdateDone }) => (
    <div style={{ 'backgroundColor': 'white' }} className="jobdetails">
        <form onSubmit={handleSubmit(onClickSetUpdateDone)}>
            <div>
                <Field name="comment" component={renderTextareaField} placeholder="Comment" /><br />
                <h3>Pending: <Field name="isStatusPending" component="input" type="checkbox" /></h3>
            </div>
            <hr />
            <p align="center"><button type="submit" className="btnSubmit" disabled={invalid || submitting}>Submit</button>&nbsp;&nbsp;&nbsp;
                <button type="button" className="btnSubmit" disabled={submitting} onClick={reset}>Clear Values</button>
            </p>
        </form>
    </div>
)



JobSearchUpdateComponent.propTypes = {
    onClickSetUpdateDone: PropTypes.func.isRequired,
};

JobSearchUpdateComponent = reduxForm({
    form: 'jobUpdateForm'
})(JobSearchUpdateComponent)

JobSearchUpdateComponent = connect(
    state => ({
        initialValues: {
            comment: state.jobs.jobs2Display[0].job.comment,
            isStatusPending: state.jobs.jobs2Display[0].job.status == "JOB_STATUS_PENDING" ? true : false
        }
    })
)(JobSearchUpdateComponent)
export default JobSearchUpdateComponent
