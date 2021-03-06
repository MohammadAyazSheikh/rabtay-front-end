import * as ActionTypes from '../actionTypes';

export const Auth_Reducer = (state = { isLoading: false, user: null, errMess: null }, action) => {

    switch (action.type) {
        case ActionTypes.AUTH_SUCCES:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                errMess: null,
            };
        case ActionTypes.AUTH_FAILED:
            return {
                ...state,
                isLoading: false,
                user: null,
                errMess: action.payload,
            };
        case ActionTypes.AUTH_LOADING:
            return {
                ...state,
                isLoading: true,
                user: null,
                errMess: null,
            };
        case ActionTypes.DP_UPDATE:
            return {
                ...state,
                isLoading: false,
                user: {...state.user,user:action.payload},
                errMess: null,
            };
        case ActionTypes.LOGOUT_SUCCES:
            return {
                ...state,
                isLoading: false,
                user: null,
                errMess: null,
                logOutLoading:false
            };
        case ActionTypes.LOGOUT_FAILED:
            return {
                ...state,
                isLoading: false,
                errMess: action.payload,
                logOutLoading:false
            };
        case ActionTypes.LOGOUT_LOADING:
            return {
                ...state,
                isLoading: false,
                logOutLoading:true
            };
        default:
            return state;
    }
}