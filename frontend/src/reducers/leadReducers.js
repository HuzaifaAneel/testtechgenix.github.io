import { LEAD_CREATE_FAIL, LEAD_CREATE_REQUEST, LEAD_CREATE_SUCCESS } from "../constants/leadConstants"



export const leadcreateReducer = (state = {}, action) => {
    switch(action.type) {
        case LEAD_CREATE_REQUEST:
            return {loading: true}
        case LEAD_CREATE_SUCCESS:
            return {loading: false, leadcreated: action.payload}
        case LEAD_CREATE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}