import jobSearchCst from '../constants/jobSearchCst'

import jobDBCst from '../../server/constants/jobDBCsts'

const jobSearchReducer = (state = {
    jobs: [],
    jobs2Display: [],
    updateId: -1,
    previousStatus: jobSearchCst.JOB_ADD,
    status: jobSearchCst.JOB_ADD
}, action) => {
    switch (action.type) {
        case jobSearchCst.JOB_ADD: {
            return Object.assign({}, state, {
                jobs: action.payload,
                jobs2Display: [],
                status: jobSearchCst.JOB_ADD
            })
        }
        case jobSearchCst.JOB_UPDATE: {
            return Object.assign({}, state, {
                updateId: action.payload,
                status: jobSearchCst.JOB_UPDATE
            })
        }
        case jobSearchCst.JOB_UPDATE_CANCEL: {
            return Object.assign({}, state, {
                updateId: -1,
                status: state.previousStatus
            })
        }
        case jobSearchCst.JOB_DISPLAY_LIST: {
            return Object.assign({}, state, {
                jobs: action.payload,
                jobs2Display: action.payload,
                updateId: -1,
                previousStatus: ((state.status == jobSearchCst.JOB_DISPLAY_ONE) || (state.status == jobSearchCst.JOB_UPDATE)) ? state.previousStatus : state.status,
                status: jobSearchCst.JOB_DISPLAY_LIST
            })
        }
        case jobSearchCst.JOB_DISPLAY_ONE: {
            return Object.assign({}, state, {
                jobs2Display: state.jobs.filter(a => a.job.id == action.payload ? a : null),
                updateId: -1,
                previousStatus: ((state.status == jobSearchCst.JOB_DISPLAY_ONE) || (state.status == jobSearchCst.JOB_UPDATE)) ? state.previousStatus : state.status,
                status: jobSearchCst.JOB_DISPLAY_ONE
            })
        }
        case jobSearchCst.JOB_DISPLAY_ONE_CLOSE: {
            return Object.assign({}, state, {
                status: state.previousStatus,
                updateId: -1,
            })
        }
        case jobSearchCst.JOB_SET_PENDING: {
            return Object.assign({}, state, {
                jobs2Display: state.jobs.filter(a => a.job.status == jobDBCst.JOB_STATUS_PENDING ? a : null),
                previousStatus: ((state.status == jobSearchCst.JOB_DISPLAY_ONE) || (state.status == jobSearchCst.JOB_UPDATE)) ? state.previousStatus : state.status,
                updateId: -1,
                status: jobSearchCst.JOB_SET_PENDING
            })
        }
        case jobSearchCst.JOB_SET_MISSED: {
            return Object.assign({}, state, {
                jobs2Display: state.jobs.filter(a => a.job.status == jobDBCst.JOB_STATUS_MISSED ? a : null),
                previousStatus: ((state.status == jobSearchCst.JOB_DISPLAY_ONE) || (state.status == jobSearchCst.JOB_UPDATE)) ? state.previousStatus : state.status,
                updateId: -1,
                status: jobSearchCst.JOB_SET_MISSED
            })
        }
        case jobSearchCst.JOB_SET_SORT_COMPANY_BY_NAME: {
            return Object.assign({}, state, {
                jobs2Display: action.payload,
                previousStatus: ((state.status == jobSearchCst.JOB_DISPLAY_ONE) || (state.status == jobSearchCst.JOB_UPDATE)) ? state.previousStatus : state.status,
                updateId: -1,
                status: jobSearchCst.JOB_SET_SORT_COMPANY_BY_NAME
            })
        }
        case jobSearchCst.JOB_SET_RECENT_FIRST: {
            return Object.assign({}, state, {
                jobs: action.payload,
                jobs2Display: action.payload,
                previousStatus: ((state.status == jobSearchCst.JOB_DISPLAY_ONE) || (state.status == jobSearchCst.JOB_UPDATE)) ? state.previousStatus : state.status,
                updateId: -1,
                status: jobSearchCst.JOB_SET_RECENT_FIRST
            })
        }
    }
    return state;
}

export default jobSearchReducer