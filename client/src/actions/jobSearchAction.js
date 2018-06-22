import axios from "axios"

import jobSearchCst from '../constants/jobSearchCst'

const dateAndTime = (expr) => {
    let extension = "AM"
    let v = expr.split("at").map(a => a.trim())
    let d = v[0].split("-") //date
    d[1] = d[1].length === 1 ? "0" + d[1] : d[1]
    d[2] = d[2].length === 1 ? "0" + d[2] : d[2]
    let t = v[1].split(":")
    if (parseInt(t[0], 10) < 12) {
        if (parseInt(t[0], 10) < 10)
            t[0] = "0" + t[0]
    }
    else {
        extension = "PM"
        t[0] -= 12
    }
    t[1] = t[1].length === 1 ? "0" + t[1] : t[1]

    return d[0] + "-" + d[1] + "-" + d[2] + " at " + t[0] + ":" + t[1] + " " + extension
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// just for old version
const compare = (a, b) => {
    if (a.job.appliedAt > b.job.appliedAt)
        return -1;
    if (a.job.appliedAt < b.job.appliedAt)
        return 1;

    return 0;
}

const date24hTime = (data) => {
    let v = data.split("at").map(a => a.trim())
    let d = v[0].split("-") //date
    d[1] = d[1].length === 1 ? "0" + d[1] : d[1]
    d[2] = d[2].length === 1 ? "0" + d[2] : d[2]
    let t = v[1].split(":")
    let e = t[1].split(" ").map(a => a.trim())
    if (e[1] === "PM") t[0] = (parseInt(t[0], 10) + 12).toString();
    else t[0] = parseInt(t[0], 10).toString().length === 1 ? "0" + parseInt(t[0], 10).toString() : parseInt(t[0], 10).toString()// deleting too many 0 as prefix

    e[0] = e[0].length === 1 ? "0" + e[0] : e[0]
    return d[0] + "-" + d[1] + "-" + d[2] + " at " + t[0] + ":" + e[0]
}

const correctAppliedAt = (data) => {
    data.map(a => a.job.appliedAt = date24hTime(a.job.appliedAt))
    let o = data.sort(compare)
    o.map(a => a.job.appliedAt = dateAndTime(a.job.appliedAt))
    return o
}

const getAll = () => {
    return axios.get('http://localhost:3090/api/job/get/all', {
        headers: {
            'authorization': localStorage.getItem('token')
        }
    })
}
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

const jobSearchAction = {
    updateDone: (data) => {
        return (dispatch, getState) => {
            let obj = getState().jobs.jobs2Display[0]
            obj.job.status = data.isStatusPending === true ? jobSearchCst.JOB_STATUS_PENDING : jobSearchCst.JOB_STATUS_MISSED
            obj.job.comment = data.comment === undefined ? "" : data.comment
            axios.put('http://localhost:3090/api/job/update/', { id: obj.job.id, comment: obj.job.comment, status: obj.job.status }, {
                headers: {
                    'authorization': localStorage.getItem('token')
                }
            })
                .then(result => {                    
                    //KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
                    console.log("actions, updateDone: " + JSON.stringify(result, null, 5))
                    const obj2array = []
                    obj2array.push(obj)
                    dispatch({
                        type: jobSearchCst.UPDATE_SUCCESS,
                        payload: obj2array
                    })
                })
        }
    },

    setDisplayUpdate: () => {
        return dispatch => dispatch({ type: jobSearchCst.SET_DISPLAY_UPDATE })
    },

    addNewJob: (values) => {
        let ob = {
            job: {
                title: values.j_title,
                description: values.j_description === undefined ? "" : values.j_description,
                comment: values.j_comment === undefined ? "" : values.j_comment,
                appliedAt: dateAndTime(values.j_appliedAt),
                status: jobSearchCst.JOB_STATUS_PENDING,
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

        if (values.contactPerson === undefined) {
            ob.contactPerson = {
                name: "",
                email: "",
                phone: ""
            }
        }
        else {
            ob.contactPerson = {
                name: values.cont_name === undefined ? "" : values.cont_name,
                email: values.cont_email === undefined ? "" : values.cont_email,
                phone: values.cont_phone === undefined ? "" : values.cont_phone,
            }
        }

        return dispatch => {
            axios.post('http://localhost:3090/api/job/add', ob, {
                headers: {
                    'authorization': localStorage.getItem('token')
                }
            })
                .then(data => {
                    getAll().then(result => {
                        dispatch({
                            type: jobSearchCst.ADD,
                            payload: result.data
                        })
                    })
                }).catch(err => console.log("Add job err: " + err))
        }
    },

    setUI2Display: () => {
        return (dispatch) => {
            getAll().then(result => {
                dispatch({
                    type: jobSearchCst.SET_DISPLAY,
                    payload: result.data
                })
            })
        }
    },

    setShowAJob: (jobId) => {
        return (dispatch) => {
            dispatch({ type: jobSearchCst.SET_DISPLAY_ONE_JOB, payload: jobId })
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
                type: jobSearchCst.DISPLAY_SORT_COMPANY_BY_NAME,
                payload: st
            })
        }
    },

    setOne2All: () => {
        return dispatch => dispatch({ type: jobSearchCst.SET_DISPLAY_ONE2ALL })
    },

    set2ShowPending: () => {
        return (dispatch) => {
            dispatch({ type: jobSearchCst.DISPLAY_PENDING })
        }
    },

    set2ShowMissed: () => {
        return (dispatch) => {
            dispatch({ type: jobSearchCst.DISPLAY_MISSED })
        }
    },

    set2ShowRecentFirst: () => {
        return (dispatch) => {

            axios.get('http://localhost:3090/api/job/get/recent', {
                headers: {
                    'authorization': localStorage.getItem('token')
                }
            })
                .then(result => {
                    dispatch({
                        type: jobSearchCst.DISPLAY_RECENT_FIRST,
                        payload: correctAppliedAt(result.data)
                    })
                })
        }
    },

    set2ShowAll: () => {
        return (dispatch) => {
            dispatch({
                type: jobSearchCst.DISPLAY_ALL,
            })
        }
    }
}

export default jobSearchAction