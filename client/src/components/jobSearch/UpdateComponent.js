import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import actions from '../../actions/jobSearchAction'
import requireAuth from '../../components/requireAuth';
import { compose } from 'redux'
import cst from '../../constants/jobSearchCst'

import { renderTextareaField } from '../../common/reduxForm/renderField'

class JobSearchUpdateComponent extends React.Component {
    render() {
        const { handleSubmit, invalid, submitting, reset, updateDone } = this.props
        return (
            <div style={{ 'backgroundColor': 'white' }} className=" container jobdetails">
                <form onSubmit={handleSubmit(updateDone)}>
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
    }
}

export default compose(
    connect(
        state => ({
            initialValues: {
                comment: state.jobs.jobs2Display[0].job.comment,
                isStatusPending: state.jobs.jobs2Display[0].job.status === cst.JOB_STATUS_PENDING ? true : false
            }
        }), actions),
    reduxForm({
        form: 'jobUpdateForm'
    })
)(requireAuth(JobSearchUpdateComponent))
