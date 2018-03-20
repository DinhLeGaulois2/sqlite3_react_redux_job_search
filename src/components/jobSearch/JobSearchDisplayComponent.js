import React from 'react'
import PropTypes from 'prop-types'

import Modal from '../../common/modal/modal'

import jobSearchCst from '../../constants/jobSearchCst'

import JobSearchUpdateContainer from '../../containers/jobSearch/JobSearchUpdateContainer'

const statusConverter = (expr) => {
    if (expr == jobSearchCst.JOB_SET_PENDING) return "Show Pending"
    else if (expr == jobSearchCst.JOB_SET_MISSED) return "Show Missed"
    else if (expr == jobSearchCst.JOB_SET_RECENT_FIRST) return "Most Recents First"
    else if (expr == jobSearchCst.JOB_DISPLAY_LIST) return "Show All"
    return ""
}

const jobStatusConverter = (expr) => {
    if (expr == "JOB_STATUS_PENDING") return "Pending"
    return "Missed/No Longer Exsists"
}

const date2DisplayWithMonthInWord = (d) => {
    let dd = d.split("at").map(a => a.trim())
    let ddd = dd[0].split("-") // get date
    let t = dd[1].split(":")
    let months = ["", "Jan", "Fev", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    // parseInt(t[0]).toString() --> to delete the '0': get "3:03" instead of "03:03"
    return months[parseInt(ddd[1])] + " " + parseInt(ddd[2]).toString() + ", " + ddd[0] + " at " + parseInt(t[0]).toString() + ":" + t[1]
}

const ShortJobDescription = ({ job, company, onClick, index }) =>
    <tr>
        <td style={{ 'padding': '10px' }}>
            <div onClick={e => { onClick(job.id) }} className="jobsField">
                {index}. <font color="#308cf2"><b>{job.title.replace(/(\b\w)/gi, function (m) { return m.toUpperCase(); })}</b></font>  -
                &nbsp;{company.name.replace(/(\b\w)/gi, function (m) { return m.toUpperCase(); })} -
                &nbsp;{company.companyLocations[0].town.replace(/(\b\w)/gi, function (m) { return m.toUpperCase(); })},
                &nbsp;<b>{company.companyLocations[0].state.replace(/(\b\w)/gi, function (m) { return m.toUpperCase(); })}</b><br />
                &nbsp;(Applied on: {date2DisplayWithMonthInWord(job.appliedAt)}
                {job.status == "JOB_STATUS_PENDING" && <span>, status: <font color="orange"><b>Pending</b></font></span>}
                {job.status != "JOB_STATUS_PENDING" && <span>, status: <font color="orange"><b>Missed/No Longer Exists</b></font></span>} )
            </div>
        </td>
    </tr>

const JobSearchDisplayComponent = ({ jobs, onClickShowPending, onClickShowMissed, onClickShowRecentFirst,
    onClickShowAll, onClickShowOne, displayStatus, onClickCloseOne, previousStatus, onClickSetUpdate, onClickSetUpdateCancel, onClickSetCompanyByName }) => (
        <div>
            <div><br />
                <table align="center" style={{ 'backgroundColor': 'white', 'width': '100%' }}><tbody><tr>
                    <td style={{ 'padding': '10px', 'align': 'center' }}>
                        <button type="button" className="btn" onClick={e => {
                            e.preventDefault()
                            onClickShowAll()
                        }}>Show All</button></td>
                    <td style={{ 'padding': '10px', 'align': 'center' }}>
                        <button type="button" className="btn" onClick={e => {
                            e.preventDefault()
                            onClickShowPending()
                        }}>Show Pending</button></td>
                    <td style={{ 'padding': '10px', 'align': 'center' }}>
                        <button type="button" className="btn" onClick={e => {
                            e.preventDefault()
                            onClickShowMissed()
                        }}>Show Missed</button></td>
                    <td style={{ 'padding': '10px', 'align': 'center' }}>
                        <button type="button" className="btn" onClick={e => {
                            e.preventDefault()
                            onClickSetCompanyByName()
                        }}>Company Sorting By Name</button></td>
                    <td style={{ 'padding': '10px', 'align': 'center' }}>
                        <button type="button" className="btn" onClick={e => {
                            e.preventDefault()
                            onClickShowRecentFirst()
                        }}>Most Recents First</button></td>
                </tr></tbody></table><br />
            </div>
            {jobs.length == 0 &&
                <div>
                    <br />
                    <div align="center" className="centeredChapterTitle">No Job in This Category!</div>
                </div>
            }
            {displayStatus == jobSearchCst.JOB_DISPLAY_ONE && jobs.length == 1 &&
                <Modal>
                    <div className="panel panel-success">
                        <div className="panel-heading">
                            <button onClick={e => { onClickCloseOne() }} className="btnModal">X</button>&nbsp;
                            <p align="center"><font size="+2">
                                <b>{jobs[0].job.title.replace(/(\b\w)/gi, function (m) { return m.toUpperCase(); })}</b>  -
                            &nbsp;{jobs[0].company.name.replace(/(\b\w)/gi, function (m) { return m.toUpperCase(); })} -
                            &nbsp;{jobs[0].company.companyLocations[0].town.replace(/(\b\w)/gi, function (m) { return m.toUpperCase(); })},
                            &nbsp;<b>{jobs[0].company.companyLocations[0].state.replace(/(\b\w)/gi, function (m) { return m.toUpperCase(); })}</b></font></p>

                        </div>
                        <div className="panel-body">
                            <div className="jobdetails">
                                <p align='center'><button type="button" className="btn" onClick={e => {
                                    e.preventDefault()
                                    onClickSetUpdate()
                                }}>Edit Status or Comment</button></p>
                                <hr />
                                <p><b><u>Applied on:</u></b> {date2DisplayWithMonthInWord(jobs[0].job.appliedAt)} (<b><u>Status:</u></b> <font color="orange">{jobStatusConverter(jobs[0].job.status)}</font>)</p>
                                {jobs[0].job.description.length > 0 &&
                                    < div >
                                        <label><b><u>Description:</u></b></label>
                                        <div>{jobs[0].job.description}</div><br />
                                    </div>
                                }
                                {jobs[0].job.comment.length > 0 &&
                                    < div >
                                        <label><b><u>Comment:</u></b></label>
                                        <div>{jobs[0].job.comment}</div><br />
                                    </div>
                                }
                                {jobs[0].job.url.length > 0 &&
                                    <p><b><u>Url:</u></b> <a href={jobs[0].job.url} target="_blank">here</a></p>
                                }
                                {jobs[0].company.contactPeople != undefined &&
                                    <div>
                                        {jobs[0].company.contactPeople.name != undefined && jobs[0].company.contactPeople.name.length > 0 &&
                                            <div><hr />
                                                <h3 align='center'>Contact</h3>
                                                <p><b><u>Name:</u></b> {jobs[0].company.contactPeople.name}</p>
                                            </div>
                                        }
                                        {jobs[0].company.contactPeople.email != undefined && jobs[0].company.contactPeople.email.length > 0 &&
                                            <p><b><u>Email:</u></b> {jobs[0].company.contactPeople.email}</p>
                                        }
                                        {jobs[0].company.contactPeople.phone != undefined && jobs[0].company.contactPeople.phone.length > 0 &&
                                            <p><b><u>Phone:</u></b> {jobs[0].company.contactPeople.phone}</p>
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </Modal>
            }
            {displayStatus == jobSearchCst.JOB_UPDATE && jobs.length == 1 &&
                <Modal>
                    <div className="panel panel-success">
                        <div className="panel-heading">
                            <button onClick={e => { onClickSetUpdateCancel() }} className="btnModal">X</button>&nbsp;
                        <p align="center"><font size="+2">{jobs[0].job.title}</font></p>
                        </div>
                        <div className="panel-body">
                            <JobSearchUpdateContainer />
                        </div>
                    </div>
                </Modal>
            }
            {displayStatus != jobSearchCst.JOB_DISPLAY_ONE && jobs.length > 0 &&
                <div>
                    <table align="center" style={{ 'width': '100%', 'textAlign': 'left', 'borderWidth': '10px' }}><tbody>
                        {jobs.map((elem, index) =>
                            <ShortJobDescription
                                key={elem.job.id}
                                {...elem}
                                onClick={onClickShowOne}
                                index={index + 1}
                            />
                        )}
                    </tbody></table>
                </div>
            }
        </div>
    )

const contactShape = {
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.shape
}

const locationShape = {
    town: PropTypes.string,
    state: PropTypes.string
}

const companyShape = {
    name: PropTypes.string,
    type: PropTypes.string,
    contactPeople: PropTypes.arrayOf(PropTypes.shape(contactShape)),
    companyLocation: PropTypes.arrayOf(PropTypes.shape(locationShape))
}

const jobShape = {
    id: PropTypes.integer,
    title: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    appliedAt: PropTypes.string,
    comment: PropTypes.string,
    url: PropTypes.string,
}

ShortJobDescription.propTypes = {
    job: PropTypes.shape(jobShape),
    company: PropTypes.shape(companyShape),
    index: PropTypes.number,
    onClick: PropTypes.func.isRequired
}

JobSearchDisplayComponent.propTypes = {
    jobs: PropTypes.arrayOf(PropTypes.shape({
        job: PropTypes.shape(jobShape),
        company: PropTypes.shape(companyShape)
    })),
    displayStatus: PropTypes.string,
    previousStatus: PropTypes.string,

    onClickShowPending: PropTypes.func.isRequired,
    onClickShowMissed: PropTypes.func.isRequired,
    onClickShowRecentFirst: PropTypes.func.isRequired,
    onClickShowAll: PropTypes.func.isRequired,
    onClickShowOne: PropTypes.func.isRequired,
    onClickCloseOne: PropTypes.func.isRequired,
    onClickSetUpdate: PropTypes.func.isRequired,
    onClickSetUpdateCancel: PropTypes.func.isRequired,
    onClickSetCompanyByName: PropTypes.func.isRequired,
}

export default JobSearchDisplayComponent
