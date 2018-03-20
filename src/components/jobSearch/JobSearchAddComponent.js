import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field, reset, formValueSelector } from 'redux-form'
import PropTypes from 'prop-types'

var states = require('../../../server/constants/states')

var cst = require('../../../server/constants/jobDBCsts')

import jobDBCst from '../../constants/jobSearchCst'

import { renderInputField, renderTextareaField } from '../../common/reduxForm/renderField'



const validate = values => {
    const errors = {}
    if (!values.j_title) {
        errors.j_title = 'Required'
    }
    if (!values.j_url) {
        errors.j_url = 'Required'
    }
    if (!values.comp_name) {
        errors.comp_name = "Required"
    }
    if (!values.loc_town) {
        errors.loc_town = "Required"
    }
    if (values.comp_name) {
        if (!values.comp_type || values.comp_type == 'Please Select the Type') {
            errors.comp_type = 'Required'
        }
    }
    if(!values.j_appliedAt){
        errors.j_appliedAt = 'Required'
    }
    if (values.loc_town) {
        if (!values.loc_state || values.loc_state == 'Please Select the State') {
            errors.loc_state = 'Required'
        }
    }
    return errors
}

let JobSearchAddComponent = ({ handleSubmit, invalid, submitting, reset, onClickAddNewJob,
    hasContactValue, cName, lTown, selectType, selectState, onClickDisplayJobs }) => (
        <div className="container" style={{ 'backgroundColor': 'white' }}>
            <div align="center" className="mainTitle" style={{
                'backgroundColor': 'black',
                'color': 'cyan',
                'width': '100%',
                'borderRadius': "30px",
                'padding': '10px',
                'fontSize': '300%',
                'fontWeight': 'bold',
                'textAlign': 'center',
                'margin': '20px 0px'
            }}>Add New Job</div>

            <p align="center"><button type="button" className="btnSubmit" onClick={e => {
                e.preventDefault()
                Status: { status }
                onClickDisplayJobs(jobDBCst.JOB_DISPLAY_LIST)
            }}>Job Listing</button></p>

            {/* <h3>onClick: {JOB_STATUS_DISPLAY}</h3> */}
            <form onSubmit={handleSubmit(onClickAddNewJob)}>
                <div>
                    <Field name="j_title" component={renderInputField} placeholder="Job's Title" /><br />
                    <Field name="j_description" component={renderTextareaField} placeholder="Description" /><br />
                    <Field name="j_comment" component={renderTextareaField} placeholder="Comment" /><br />
                    <Field name="j_url" component={renderInputField} placeholder="Url" /><br />
                    <Field name="j_appliedAt" component={renderInputField} placeholder="Date" />
                </div>
                <hr />
                <div>
                    <label>Company's Name</label>&nbsp;
                {!cName && <span>&nbsp;(<font color="red">required</font>)</span>}
                    <Field name="comp_name" component="input" placeholder="Company Name" className="form-control" />
                    {cName &&
                        <div>
                            <br />
                            <label>What kind of Company?</label>  &nbsp;
                        <Field name="comp_type" component="select">
                                <option></option>
                                <option key={cst.COMPANY_TYPE_JOBS_NO_IDEA} value={cst.COMPANY_TYPE_JOBS_NO_IDEA} >Not Sure</option>
                                <option key={cst.COMPANY_TYPE_JOBS_LISTER} value={cst.COMPANY_TYPE_JOBS_LISTER} >Job Lister</option>
                                <option key={cst.COMPANY_TYPE_HIRING} value={cst.COMPANY_TYPE_HIRING}>Direct Hiring</option>
                            </Field> &nbsp;
                        {(selectType == undefined || selectType == 'Please Select the Type') &&
                                <span>&nbsp;(<font color="red">required</font>)</span>
                            }
                        </div>
                    }
                    <br /><br />
                    <label>Town</label>&nbsp;
                {!lTown && <span>&nbsp;(<font color="red">required</font>)</span>}
                    <Field name="loc_town" component="input" placeholder="Town" className="form-control" />
                    {lTown &&
                        <div>
                            <br />
                            <label>State</label> &nbsp;
                        <Field name="loc_state" component="select">
                                <option>Please Select the State</option>
                                {states.map(e =>
                                    <option key={e.abbr} value={e.abbr}>{e.name} ({e.abbr})</option>
                                )}
                            </Field> &nbsp;
                        {(selectState == undefined || selectState == 'Please Select the State') &&
                                <span>&nbsp;(<font color="red">required</font>)</span>
                            }
                        </div>
                    }
                </div>
                <hr />
                <div>
                    <label htmlFor="hasContact">Has Contact?</label>
                    <div>
                        <Field name="hasContact" component="input" type="checkbox" />
                    </div>
                </div>
                {hasContactValue &&
                    <div>
                        <Field name="cont_name" component={renderInputField} placeholder="Contact Person's Name" />
                        <Field name="cont_email" component={renderInputField} placeholder="Email" />
                        <Field name="cont_phone" component={renderInputField} placeholder="Phone" />
                    </div>
                }
                <br /><br />
                <p align="center"><button type="submit" className="btnSubmit" disabled={invalid || submitting}>Submit</button>&nbsp;&nbsp;&nbsp;
                <button type="button" className="btnSubmit" disabled={submitting} onClick={reset}>Clear Values</button>
                </p>
            </form>
        </div>
    )

JobSearchAddComponent.propTypes = {
    onClickAddNewJob: PropTypes.func.isRequired,
    onClickDisplayJobs: PropTypes.func.isRequired
};

// Reset the form after submission
const afterSubmit = (result, dispatch) =>
    dispatch(reset('jobAddForm'));

const setGoodDate = (expr) => {
    let c = new Date(expr);
    let m = (c.getMonth() + 1) < 10 ? "0" + (c.getMonth() + 1) : (c.getMonth() + 1)
    let d = c.getDate() < 10 ? "0" + c.getDate() : c.getDate()
    let h = c.getHours() < 10 ? "0" + c.getHours() : c.getHours()
    let mn = c.getMinutes() < 10 ? "0" + c.getMinutes() : c.getMinutes()
    return c.getFullYear() + "-" + m + "-" + d + " at " + h + ":" + mn
}

JobSearchAddComponent = reduxForm({
    form: 'jobAddForm',
    validate,
    initialValues: {
        j_appliedAt: setGoodDate(new Date()),
        j_description: "",
        j_comment: "",

        comp_name: ""
    },
    onSubmitSuccess: afterSubmit
})(JobSearchAddComponent)

// Decorate with connect to read form values
const selector = formValueSelector('jobAddForm') // <-- same as form name
JobSearchAddComponent = connect(
    state => {
        const hasContactValue = selector(state, 'hasContact');
        const cName = selector(state, 'comp_name');
        const lTown = selector(state, 'loc_town');
        const selectType = selector(state, 'comp_type')
        const selectState = selector(state, 'loc_state')
        return { hasContactValue, cName, lTown, selectType, selectState }
    }
)(JobSearchAddComponent)

export default JobSearchAddComponent
