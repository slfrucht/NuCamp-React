import * as ActionTypes from "./ActionTypes";
import {CAMPSITES} from "../shared/campsites"

export const addComment = (campsiteId, rating, author, text) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        campsiteId: campsiteId,
        rating: rating,
        author: author,
        text: text
    }
});

export const fetchCampsites = () => dispatch => { //nested arrow functions are possible because of thunk
    dispatch(campsitesLoading());
    console.log("fetching campsites");
    setTimeout(() => {
        dispatch(addCampsites(CAMPSITES));
    }, 2000);
}
export const campsitesLoading = () => ({
    type: ActionTypes.CAMPSITES_LOADING  //only has action type, no payload
});

export const campsitesFailed = errorMessage => ({
    type: ActionTypes.CAMPSITES_FAILED,
    payload: errorMessage
});

export const addCampsites = campsites => ({
    type: ActionTypes.ADD_CAMPSITES,
    payload: campsites
});