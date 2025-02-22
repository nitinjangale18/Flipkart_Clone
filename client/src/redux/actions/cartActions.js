import * as actionTypes from '../constants/cartConstant';
import axios from 'axios';

export const addToCart = (id, quantity) => async (dispatch) => {
    const URL='http://localhost:8000';
    try { 
        const { data } = await axios.get(`${URL}/product/${id}`);
        console.log("Product fetched from API:", data);
        console.log("Dispatching action: ADD_TO_CART with payload:", { ...data, quantity });
        dispatch({ type: actionTypes.ADD_TO_CART, payload: { ...data, quantity } });
        
    } catch (error) {
        console.log('Error while calling cart API');
    }
};

export const removeFromCart = (id) => (dispatch) => {
    dispatch({
        type: actionTypes.REMOVE_FROM_CART,
        payload: id
    })

};