import { POST_REGISTER, POST_LOGIN, VERIFY_SESSION, CLEAR_ERROR } from "./actionsTypes"


const initialState = {
    session: false,
    token: "",
    errorRegister: ""
    
}

const reducer = (state = initialState, action) =>{

    switch(action.type){
        case POST_REGISTER:
           
            return {
                ...state,
                errorRegister: action.payload
            }

        case POST_LOGIN:
            
            if(action.payload.message === "Error"){
                return{
                    ...state,
                    errorRegister: false
                }
            }else{
                return {
                    ...state,
                    token: action.payload,
                    errorRegister: true
                }
            }
           

        case VERIFY_SESSION:
            if(action.payload === false){
                return{
                    ...state,
                    session: action.payload,
                    token: ""
                }
            }else{
                return{
                    ...state,
                    session: action.payload
                }
            }
            
        case CLEAR_ERROR: 
            return{
                ...state,
                errorRegister: action.payload
            }
        break;
    }

}

export default reducer