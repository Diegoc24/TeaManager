import axios from "axios"
import {POST_REGISTER, POST_LOGIN, VERIFY_SESSION, CLEAR_ERROR} from "./actionsTypes"

export const postRegister = (user) =>{
    return async function (dispatch){
        try {
            
            const regis = await axios.post("http://localhost:3001/user/register", user)
            return dispatch({
                type: POST_REGISTER,
                payload: true
            })
        } catch (error) {
            console.log({error: error.message});
            return dispatch({
                type: POST_REGISTER,
                payload: false
            })
        }
    }
}


export const postLogin = (user) =>{
    console.log("entra");
    return async function(dispatch){
        try {
           
            const login = await axios.post("http://localhost:3001/user/login", user)
            console.log(login.data);
            return dispatch({
                type: POST_LOGIN,
                payload: login.data
            })
        } catch (error) {
            console.log({error: error.message});

            return dispatch({
                type: POST_LOGIN,
                payload: {message: "Error"}
            })

        }
    }
}

export const vSession = (session) =>{
    
    return {
        type: VERIFY_SESSION,
        payload: session
    }
}

export const clearRegister = () =>{
    return {
        type: CLEAR_ERROR,
        payload: ""
    }
}