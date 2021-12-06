import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {userLoginReducer, userRegisterReducer} from './reducers/userReducers'
import { leadcreateReducer } from './reducers/leadReducers'

const reducer = combineReducers({
    
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    createLead: leadcreateReducer,

   
}) 


const userInfoFromStorage = localStorage.getItem('userInfo') 
                                ? JSON.parse(localStorage.getItem('userInfo')) : null

const leadFromStorage = localStorage.getItem('lead') 
                                ? JSON.parse(localStorage.getItem('lead')) : null                                


const initialState = {
    userLogin: {userInfo: userInfoFromStorage},
    createLead: {lead: leadFromStorage},
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store