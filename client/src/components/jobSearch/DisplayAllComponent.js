import React from 'react'
import { connect } from 'react-redux'
import actions from '../../actions/jobSearchAction'
import requireAuth from '../requireAuth'
import DisplayAJobComponent from './DisplayAJobComponent'

import cst from '../../constants/jobSearchCst'

const date2DisplayWithMonthInWord = (d) => {
    let dd = d.split("at").map(a => a.trim())
    let ddd = dd[0].split("-") // get date
    let t = dd[1].split(":")
    let months = ["", "Jan", "Fev", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    // parseInt(t[0]).toString() --> to delete the '0': get "3:03" instead of "03:03"
    return months[parseInt(ddd[1], 10)] + " " + parseInt(ddd[2], 10).toString() + ", " + ddd[0] + " at " + parseInt(t[0], 10).toString() + ":" + t[1]
}

const ShortJobDescription = ({ job, company, setShowAJob, index }) =>
    <tr>
        <td style={{ 'padding': '10px' }}>
            <div onClick={e => { setShowAJob(job.id) }} className="jobsField">
                {index}. <font color="#308cf2"><b>{job.title.replace(/(\b\w)/gi, function (m) { return m.toUpperCase(); })}</b></font>  -
                &nbsp;{company.name.replace(/(\b\w)/gi, function (m) { return m.toUpperCase(); })} -
                &nbsp;{company.companyLocations[0].town.replace(/(\b\w)/gi, function (m) { return m.toUpperCase(); })},
                &nbsp;<b>{company.companyLocations[0].state.replace(/(\b\w)/gi, function (m) { return m.toUpperCase(); })}</b><br />
                &nbsp;(Applied on: {date2DisplayWithMonthInWord(job.appliedAt)}
                {job.status === cst.JOB_STATUS_PENDING && <span>, status: <font color="orange"><b>Pending</b></font></span>}
                {job.status !== cst.JOB_STATUS_PENDING && <span>, status: <font color="orange"><b>Missed/No Longer Exists</b></font></span>} )
            </div>
        </td>
    </tr>

class DisplayAllComponent extends React.Component {
    constructor(props) {
        super(props)
        const thisPath = this.props.location.pathname.split("/")
        const last = thisPath.length > 0 ? thisPath[thisPath.length - 1] : ""
        if (last === 'all') { this.props.set2ShowAll() }
        else if (last === 'missed') { this.props.set2ShowMissed() }
        else if (last === 'pending') { this.props.set2ShowPending() }
        else if (last === 'recent') { this.props.set2ShowRecentFirst() }
        else if (last === 'bycompanyname') { this.props.sortCompanyByName() }
    }

    render() {
        const { jobs, setShowAJob, isList } = this.props
        return (
            <div>
                {isList && jobs !== undefined &&
                    <div>
                        {
                            jobs.length > 0 &&
                            <div>
                                <table align="center" style={{ 'width': '100%', 'textAlign': 'left', 'borderWidth': '10px' }}><tbody>
                                    {jobs.map((elem, index) =>
                                        <ShortJobDescription
                                            key={elem.job.id}
                                            {...elem}
                                            setShowAJob={setShowAJob}
                                            index={index + 1}
                                        />
                                    )}
                                </tbody></table>
                            </div>
                        }
                        {jobs.length === 0 &&
                            <div>
                                <br /><br /><br />
                                <h1 align="center">No Job to Show!</h1>
                            </div>
                        }
                    </div>
                }
                {!isList &&
                    <div>
                        <DisplayAJobComponent />
                    </div>
                }
            </div>
        )
    }
}

const MapStateToProps = (state) => ({
    jobs: state.jobs.jobs2Display,
    isList: state.jobs.isList,
})

export default connect(
    MapStateToProps,
    actions
)(requireAuth(DisplayAllComponent))
