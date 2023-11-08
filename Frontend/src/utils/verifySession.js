import { useDispatch } from "react-redux";


const verifySession = () =>{
    
    

    const tok = window.localStorage.getItem("token")
    let tokParce = JSON.parse(tok)
    if(tokParce !== null && tokParce !== "undefined" && tokParce !== ""){
        console.log(tokParce);
        
    
    const tokenPayload = tokParce ? atob(tokParce?.token.split(".")[1]) : undefined
   
    const t = JSON.parse(tokenPayload)
    const tokenExpiration = t?.exp;
    const currentTime = Math.floor((Date.now() / 1000) + -1000);

    if (tokenExpiration > currentTime) {
        console.log(tokenExpiration);
        console.log(currentTime);
        return true
    } else {
       
        let tokParse = window.localStorage.getItem("token")
        tokParse = JSON.parse(tokParse)
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("data")
        
        return false
    }
}

return false
    
}

export default verifySession;