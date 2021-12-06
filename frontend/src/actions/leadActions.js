import { LEAD_CREATE_FAIL, LEAD_CREATE_REQUEST, LEAD_CREATE_SUCCESS } from "../constants/leadConstants"
import axios from "axios";

export const leadcreate = (user, customerName, customerRepresentative, linkedin, 
    contact, leadAssignedTo, nextFollowup, followUpEmail, followUpQutation, followUpLetter, remarks,image) => async (dispatch) => {
    try{
        dispatch({
            type: LEAD_CREATE_REQUEST,
        })

    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    }

    const {data} = await axios.post('/api/users/createlead', {user, customerName, customerRepresentative, linkedin, 
        contact, leadAssignedTo, nextFollowup, followUpEmail, followUpQutation, followUpLetter, remarks,image}, config)

    dispatch({
        type: LEAD_CREATE_SUCCESS,
        payload: data,
    })


    localStorage.setItem('lead', JSON.stringify(data))

}

    catch(error) {
        dispatch({
            type: LEAD_CREATE_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}