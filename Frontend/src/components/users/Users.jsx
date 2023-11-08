import React, { useEffect, useState } from "react";
import style from "./users.module.css"
import verifySession from "../../utils/verifySession"
import ListUser from "./ListUser";
import { useDispatch, useSelector } from "react-redux";
import { vSession } from "../../redux/actions";
import { NavLink } from "react-router-dom";

const Users = () =>{
  const dispatch = useDispatch()
  const reduxSession = useSelector((state)=> state?.session)
    const [showList, setShowList] = useState(false)
    const [session, setSession] = useState(false)
    useEffect(()=>{
        
        const intervalo = setInterval(()=>{
        setSession(verifySession())
        
        }
        , 5000);

        
        return () => clearInterval(intervalo);
    },[])
    useEffect(()=>{
      dispatch(vSession(verifySession()))
    },[session, setSession])
    const data = JSON.parse(window.localStorage.getItem("data"))
   const handlerList = (e) =>{
    e.preventDefault()
    setShowList(!showList)
    
   }
    return(
        <div>
        <div className={style.user}>
          {reduxSession && data?.profile_picture !== undefined ? (
            <div>
              <img src={data?.profile_picture} alt="Profile" />
              <div className={style.name}>
                <span>{`${data?.name} `}</span>
                <span>{`${data?.last_name}`}</span>
                <span ><svg onClick={handlerList} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down" viewBox="0 0 16 16">
  <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
</svg></span>
              </div>
              {showList ? <ListUser/> : <div></div>}
            </div>
          ) : (
            <div className={style.initSession}>
            <NavLink className={style.navRegister} to={"/register"}>Registrarme</NavLink>
            <NavLink className={style.navLogin} to={"/login"}>Iniciar sesión</NavLink>
            </div>
          )}
        </div>
      </div>
  
    )
}

export default Users