import axios from 'axios';
import { GET_DIVISIONS, DIVISION_ERROR, ADD_DIVISION, DELETE_DIVISION } from './types';

export const getDivisions = () => async dispatch => {
  try {
    const res = await axios.get('/api/division');
    console.log(res);
    dispatch({
        type : GET_DIVISIONS,
        payload : res.data.divisions
    })
  } catch (error) {
      dispatch({
          type : DIVISION_ERROR,
          payload : {
              msg: error.response.statusText,
              status: error.response.status
          }
      })
  }

};

export const addDivision = division_id => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.delete(`/api/division/${division_id}`, {}, config);
        if(res.data.status == 200){
            dispatch({
                type : DELETE_DIVISION,
                payload : division_id
            });
        }else{
            dispatch({
                type : DIVISION_ERROR,
                payload : {
                    msg: res.data.msg,
                    status: res.data.status
                }
            });
        }
    } catch (error) {
        dispatch({
            type : DIVISION_ERROR,
            payload : {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
};

export const deleteDivision = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.post('/api/division', formData, config);
        if(res.data.status == 200){
            dispatch({
                type : ADD_DIVISION,
                payload : res.data.division
            });
        }else{
            dispatch({
                type : DIVISION_ERROR,
                payload : {
                    msg: res.data.msg,
                    status: res.data.status
                }
            });
        }
    } catch (error) {
        dispatch({
            type : DIVISION_ERROR,
            payload : {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
};

