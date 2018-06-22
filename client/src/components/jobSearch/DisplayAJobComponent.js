import React from 'react'
import { connect } from 'react-redux'
import actions from '../../actions/jobSearchAction'
import requireAuth from '../requireAuth'

import UpdateComponent from './UpdateComponent'

const jobStatusConverter = (expr) => {
    if (expr === "STATUS_PENDING") return "Pending"
    return "Missed/No Longer Exsists"
}

const date2DisplayWithMonthInWord = (d) => {
    let dd = d.split("at").map(a => a.trim())
    let ddd = dd[0].split("-") // get date
    let t = dd[1].split(":")
    let months = ["", "Jan", "Fev", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    // parseInt(t[0]).toString() --> to delete the '0': get "3:03" instead of "03:03"
    return months[parseInt(ddd[1], 10)] + " " + parseInt(ddd[2], 10).toString() + ", " + ddd[0] + " at " + parseInt(t[0], 10).toString() + ":" + t[1]
}

class DisplayAJobComponent extends React.Component {
    render() {
        const { jobs, isUpdating, isList, setDisplayUpdate } = this.props
        return (
            <div>
                {jobs.length === 1 && !isUpdating && !isList &&
                    <div className="panel panel-success">
                        <div className="panel-heading">
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
                                    setDisplayUpdate()
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
                                {jobs[0].company.contactPeople !== undefined &&
                                    <div>
                                        {jobs[0].company.contactPeople.name !== undefined && jobs[0].company.contactPeople.name.length > 0 &&
                                            <div><hr />
                                                <h3 align='center'>Contact</h3>
                                                <p><b><u>Name:</u></b> {jobs[0].company.contactPeople.name}</p>
                                            </div>
                                        }
                                        {jobs[0].company.contactPeople.email !== undefined && jobs[0].company.contactPeople.email.length > 0 &&
                                            <p><b><u>Email:</u></b> {jobs[0].company.contactPeople.email}</p>
                                        }
                                        {jobs[0].company.contactPeople.phone !== undefined && jobs[0].company.contactPeople.phone.length > 0 &&
                                            <p><b><u>Phone:</u></b> {jobs[0].company.contactPeople.phone}</p>
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                }
                {isUpdating && jobs.length === 1 &&
                    <div>
                        <p align="center"><font size="+2">{jobs[0].job.title}</font></p>
                        <UpdateComponent />
                    </div>
                }
            </div>
        )
    }
}

const MapStateToProps = (state) => ({
    jobs: state.jobs.jobs2Display,
    isUpdating: state.jobs.isUpdating,
    isList: state.jobs.isList
})

export default connect(
    MapStateToProps,
    actions
)(requireAuth(DisplayAJobComponent))
