import { CAMPSITES } from "../shared/campsites";

export const Campsites = (state = CAMPSITES, action) => {
    switch(action.type) {
        default:
            return state; //no actions defined, so just return state
    }
}