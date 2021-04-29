import { PROMOTIONS } from "../shared/promotions";

export const Promotions = (state = PROMOTIONS, action) => {
    switch(action.type) {
        default:
            return state; //no actions defined, so just return state
    }
}