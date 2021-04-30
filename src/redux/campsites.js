import { actions } from "react-redux-form";
import * as ActionTypes from "./ActionTypes";

export const Campsites = (state = {
    isLoading: true,
    errorMessage: null,
    campsites: []
    }, action) => {
        console.log("in campsites.js, action.type = " + action.type);
    switch(action.type) {
        case ActionTypes.ADD_CAMPSITES:
            console.log("in campsites.js, action.type = ADD_CAMPSITES");
            return {...state, isLoading: false, errorMessage: null, campsites: action.payload};
        case ActionTypes.CAMPSITES_LOADING:
            console.log("in campsites.js, action.type = CAMPSITES_LOADING");
            return {...state, isLoading: true, errorMessage: null, campsites: []};
        case ActionTypes.CAMPSITES_FAILED:
            console.log("in campsites.js, action.type = CAMPSITES_FAILED");
            return {...state, isLoading:false, errorMessage: action.payload};
        default:
            return state; //no actions defined, so just return state
    }
}