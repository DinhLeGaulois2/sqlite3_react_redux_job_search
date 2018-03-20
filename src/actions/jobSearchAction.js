import axios from "axios"

import jobSearchCst from '../constants/jobSearchCst'

import jobDBCst from '../../server/constants/jobDBCsts'

const dateAndTime = (expr) => {
    let extension = "AM"
    let v = expr.split("at").map(a => a.trim())
    let d = v[0].split("-") //date
    d[1] = d[1].length == 1 ? "0" + d[1] : d[1]
    d[2] = d[2].length == 1 ? "0" + d[2] : d[2]
    let t = v[1].split(":")
    if (parseInt(t[0]) < 12){
        if(parseInt(t[0]) < 10)
            t[0] = "0" + t[0]
    }
    else{
        extension = "PM"
        t[0] -= 12
    }
    t[1] = t[1].length == 1 ? "0" + t[1] : t[1]

    return d[0] + "-" + d[1] + "-" + d[2] + " at " + t[0] + ":" + t[1] + " " + extension
}

const jobSearchAction = {
    setUpdate: (jobId) => {
        return (dispatch, getState) => {
            let st = getState().jobs
            dispatch({ type: jobSearchCst.JOB_UPDATE, payload: jobId })
        }
    },

    setUpdateCancel: () => {
        return (dispatch, getState) => {
            let st = getState()
            switch (st.jobs.previousStatus) {
                case jobSearchCst.JOB_DISPLAY_LIST: {
                    dispatch({ type: jobSearchCst.JOB_DISPLAY_LIST, payload: st.jobs.jobs })
                    break
                }
                case jobSearchCst.JOB_SET_PENDING: {
                    dispatch({ type: jobSearchCst.JOB_SET_PENDING })
                    break
                }
                case jobSearchCst.JOB_SET_MISSED: {
                    dispatch({ type: jobSearchCst.JOB_SET_MISSED })
                    break
                }
                case jobSearchCst.JOB_SET_RECENT_FIRST: {
                    dispatch({
                        type: jobSearchCst.JOB_SET_RECENT_FIRST,
                        payload: st.jobs.jobs
                    })
                    break
                }
                default: dispatch({ type: jobSearchCst.JOB_UPDATE_CANCEL })
            }
        }
    },

    setUpdateDone: (data) => {
        return (dispatch, getState) => {
            let obj = getState().jobs.jobs2Display[0]
            let st = getState().jobs
            obj.job.status = data.isStatusPending == true ? "JOB_STATUS_PENDING" : "JOB_STATUS_MISSED"
            obj.job.comment = data.comment
            axios.put('/api/job/update/', { id: obj.job.id, comment: obj.job.comment, status: obj.job.status })
                .then(result => {
                    st.jobs = st.jobs.map(a => a.job.id == obj.jobid ? job : a)
                    if (st.previousStatus == jobSearchCst.JOB_DISPLAY_LIST)
                        dispatch({ type: jobSearchCst.JOB_DISPLAY_LIST, payload: st.jobs })

                    switch (st.previousStatus) {
                        case jobSearchCst.JOB_DISPLAY_LIST: {
                            dispatch({ type: jobSearchCst.JOB_DISPLAY_LIST, payload: st.jobs })
                            break
                        }
                        case jobSearchCst.JOB_SET_PENDING: {
                            dispatch({ type: jobSearchCst.JOB_SET_PENDING })
                            break
                        }
                        case jobSearchCst.JOB_SET_MISSED: {
                            dispatch({ type: jobSearchCst.JOB_SET_MISSED })
                            break
                        }
                        case jobSearchCst.JOB_SET_RECENT_FIRST: {
                            dispatch({
                                type: jobSearchCst.JOB_SET_RECENT_FIRST,
                                payload: st.jobs
                            })
                            break
                        }
                    }
                    dispatch({ type: jobSearchCst.JOB_UPDATE_CANCEL })
                })
                .catch(err => console.log("setUpdate: " + err))
        }
    },

    addNewJob: (values) => {
        let ob = {
            job: {
                title: values.j_title,
                description: values.j_description == undefined ? "" : values.j_description,
                comment: values.j_comment == undefined ? "" : values.j_comment,
                appliedAt: dateAndTime(values.j_appliedAt),
                status: jobDBCst.JOB_STATUS_PENDING,
                url: values.j_url
            },
            company: {
                name: values.comp_name,
                type: values.comp_type,
                companyLocation: {
                    town: values.loc_town,
                    state: values.loc_state
                }
            }
        }

        if (values.contactPerson == undefined) {
            ob.contactPerson = {
                name: "",
                email: "",
                phone: ""
            }
        }
        else {
            ob.contactPerson = {
                name: values.cont_name == undefined ? "" : values.cont_name,
                email: values.cont_email == undefined ? "" : values.cont_email,
                phone: values.cont_phone == undefined ? "" : values.cont_phone,
            }
        }

        return dispatch => {
            axios.post("/api/job/add", ob)
                .then(data => {
                    axios.get('/api/job/get/all')
                        .then(result => {
                            dispatch({
                                type: jobSearchCst.JOB_ADD,
                                payload: result.data
                            })
                        })
                }).catch(err => console.log("Add job err: " + err))
        }
    },

    setUI2Display: (status) => {
        return (dispatch) => {
            if (status == jobSearchCst.JOB_DISPLAY_LIST) {
                axios.get('/api/job/get/all')
                    .then(result => {
                        dispatch({
                            type: jobSearchCst.JOB_DISPLAY_LIST,
                            payload: result.data
                        })
                    })
            }
            else dispatch({ type: jobSearchCst.JOB_DISPLAY_LIST, payload: status })
        }
    },

    setShowAJob: (jobId) => {
        return (dispatch) => {
            dispatch({ type: jobSearchCst.JOB_DISPLAY_ONE, payload: jobId })
        }
    },

    sortCompanyByName: () => {
        return (dispatch, getState) => {
            let st = getState().jobs.jobs2Display
            st.sort(function (a, b) {
                var nameA = a.company.name.toLowerCase(), nameB = b.company.name.toLowerCase()
                if (nameA < nameB) //sort string ascending
                    return -1
                if (nameA > nameB)
                    return 1
                return 0 //default return value (no sorting)
            })
            dispatch({
                type: jobSearchCst.JOB_SET_SORT_COMPANY_BY_NAME,
                payload: st
            })
        }
    },

    setCloseAJob: () => {
        return (dispatch, getState) => {
            let st = getState()
            switch (st.jobs.previousStatus) {
                case jobSearchCst.JOB_DISPLAY_LIST: {
                    dispatch({ type: jobSearchCst.JOB_DISPLAY_LIST, payload: st.jobs.jobs })
                    break
                }
                case jobSearchCst.JOB_SET_PENDING: {
                    dispatch({ type: jobSearchCst.JOB_SET_PENDING })
                    break
                }
                case jobSearchCst.JOB_SET_MISSED: {
                    dispatch({ type: jobSearchCst.JOB_SET_MISSED })
                    break
                }
                case jobSearchCst.JOB_SET_RECENT_FIRST: {
                    dispatch({
                        type: jobSearchCst.JOB_SET_RECENT_FIRST,
                        payload: st.jobs.jobs
                    })
                    break
                }
                default: dispatch({ type: jobSearchCst.JOB_DISPLAY_ONE_CLOSE })
            }
        }
    },

    set2ShowPending: () => {
        return (dispatch) => {
            dispatch({ type: jobSearchCst.JOB_SET_PENDING })
        }
    },

    set2ShowMissed: () => {
        return (dispatch) => {
            dispatch({ type: jobSearchCst.JOB_SET_MISSED })
        }
    },

    set2ShowRecentFirst: () => {
        return (dispatch) => {
            axios.get('/api/job/get/recent')
                .then(result => {
                    dispatch({
                        type: jobSearchCst.JOB_SET_RECENT_FIRST,
                        payload: result.data
                    })
                })
        }
    },

    set2ShowAll: () => {
        return (dispatch) => {
            axios.get('/api/job/get/all')
                .then(result => {
                    dispatch({
                        type: jobSearchCst.JOB_DISPLAY_LIST,
                        payload: result.data
                    })
                })
        }
    }
}

export default jobSearchAction