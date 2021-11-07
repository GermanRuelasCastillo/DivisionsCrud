import { GET_DIVISIONS, DIVISION_ERROR, ADD_DIVISION } from '../utils/types';

const initialState = {
    divisions : [],
    loading : true,
    error : {}
}

export default function(state=initialState,action){
    const { type, payload } = action;

    switch(type){
        case GET_DIVISIONS:
            return {
                ...state,
                divisions : payload,
                loading : false
            }
        case ADD_DIVISION:
            return {
                ...state,
                divisions : [payload, ...state.divisions],
                loading : false
            }
            default:
                return state;
        }
}
