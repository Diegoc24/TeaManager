import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postLogin, clearRegister, vSession } from "../redux/actions";
import style from "./Login.module.css"
import Swal from "sweetalert2"

const Login = () =>{
    const navigate = useNavigate()
    const token = useSelector((state) => state?.token)
    const errorRegister = useSelector((state => state?.errorRegister))
    const dispatch = useDispatch()
    const [condition, setCondition] = useState("")
    const [login, setLogin] = useState({
        email: "",
        password: ""
    })
    
   
    const handlerChange = (e) =>{
        const {value, name} = e.target
        
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const contraseñaRegex = /^(?=.*[A-Z]).{8,16}$/;

        switch(name){

            case "email":
               
                if(!emailRegex.test(value)) setCondition("El email ingresado no es valido")
                else setCondition("")
            break;

            case "password":
                
                if(!contraseñaRegex.test(value)) setCondition("La contraseña debe contener en 8 a 16 caracteres y una mayuscula")
                else setCondition("")

            break;
        }
        setLogin({
            ...login,
            [name]: value
        })
       
    }

    const verifyInput = ()=>{
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const contraseñaRegex = /^(?=.*[A-Z]).{8,16}$/;
    
        if(!emailRegex.test(login.email)) return {send: false, message: "El email ingresado no es valido"}
        else if(!contraseñaRegex.test(login.password)) return {send: false, message: "La contraseña debe contener en 8 a 16 caracteres y una mayuscula"}
        else return {send: true}
    }

    const handlerSubmit = async (e)=>{

        e.preventDefault()
        if(condition === "" && verifyInput()){
            dispatch(postLogin(login))
            dispatch(vSession(true))
        }
        
        
   
    }
    useEffect(()=>{
        if(token !== undefined){
        window.localStorage.setItem("token", JSON.stringify(token))
        window.localStorage.setItem("data", JSON.stringify(token ? JSON.parse(atob(token.token.split(".")[1])) : null))
        }
    },[dispatch, token])
   
    useEffect(()=>{
        if(errorRegister === true){
            Swal.fire({
                title: 'Usted esta logueado!',
                text: 'Bienvenido!',
                icon: 'success',
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(clearRegister())
                    navigate("/")
                }
              });
        }else if(errorRegister === false){
            Swal.fire({
                title: 'Verifique que el usuario o contraseña sean validos',
                
                icon: 'error',
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(clearRegister())

                }
              });
        }
    },[dispatch, errorRegister])
    return(
        <div className={style.container}>
            <form onSubmit={(e)=> handlerSubmit(e)}>
                <label>Email: </label>
                <input type="text" name="email" value={login.email} onChange={handlerChange}></input>
                <label>Contraseña: </label>
                <input type="password" name="password" value={login.password} onChange={handlerChange}></input>
                <h5>{condition}</h5>
                <button type="submit">Login</button>
            </form>
            
           
            
        </div>
    )

}

export default Login;