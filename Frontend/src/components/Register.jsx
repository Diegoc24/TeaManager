import React, { useEffect } from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { clearRegister, postRegister } from "../redux/actions";
import { NavLink } from "react-router-dom";
import style from "./Register.module.css"
import Swal from "sweetalert2"
const Register = () =>{

    
const dispatch = useDispatch()
const navigate = useNavigate()
    const errorRegister = useSelector((state) => state?.errorRegister)
    const [checkTeacher, setCheckTeacher] = useState(false)
    const [checkStudent, setCheckStudent] = useState(false)
    const [condition, setCondition] = useState("")
    const [form, setForm] = useState({
        name: "",
        last_name: "",
        email: "",
        password: "",
        address: "",
        phone: "",
        is_teacher: false
    })
    const comproSend = () =>{
        const nameAndLastRegex = /^[A-Za-z\s]+$/;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const contraseñaRegex = /^(?=.*[A-Z]).{8,16}$/;
        if(!nameAndLastRegex.test(form.name) && !nameAndLastRegex.test(form.last_name)) return {send: false, message: "Debe contener solo letras mayúsculas o minúsculas"}
        else if(!emailRegex.test(form.email)) return {send: false, message: "El email ingresado no es valido"}
        else if(!contraseñaRegex.test(form.password)) return {send: false, message: "La contraseña debe contener en 8 a 16 caracteres y una mayuscula"}
        else return {send: true}
    }
    const handlerSubmit = async (e) =>{
        e.preventDefault()
        
         
          if(!form.name || !form.last_name || !form.email || !form.password){
            setCondition(`Los campos no pueden estar vacios`)
        } else if(!comproSend().send){
            
            setCondition(comproSend().message)
        }else if(checkTeacher === false && checkStudent === false){
            setCondition("Debe seleccionar si es alumno o profesor")
        }
          else{
           
            setCondition("")
            
           
            dispatch(postRegister(form))
            
        }
  
       
        
    }
    useEffect(()=>{
        if(errorRegister === true){
            Swal.fire({
                title: 'Good job!',
                text: 'You clicked the button!',
                icon: 'success',
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(clearRegister())
                    navigate("/login")
                }
              });
        }else if(errorRegister === false){
            Swal.fire({
                title: 'Ocurrio un error al cargar los datos',
                
                icon: 'error',
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(clearRegister())
                }
              });
        }
    },[dispatch, errorRegister])
    const handlerChange = (e) =>{
        const {name, value} = e.target
        if(name !== "is_teacher" && name !== "student"){
            console.log(form);
        setForm({
            ...form,
            [name]: value
        })
    }
        const nameAndLastRegex = /^[A-Za-z\s]+$/;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const contraseñaRegex = /^(?=.*[A-Z]).{8,16}$/;
        switch (name) {
            
            case "name":
            case "last_name":
            
            if (!nameAndLastRegex.test(value)) setCondition("Debe contener solo letras mayúsculas o minúsculas");
            else if(nameAndLastRegex.test(form.name)) setCondition("");
            else if(nameAndLastRegex.test(form.last_name)) setCondition("");
            break;
            case "email":
            
            if(!emailRegex.test(value)) setCondition("El email ingresado no es valido")
            else setCondition("")

            case "password":

                if(!contraseñaRegex.test(value)) setCondition("La contraseña debe contener en 8 a 16 caracteres y una mayuscula")
                else setCondition("")
            
            
            break;
          }
          
       
    }
    const handlerCheck = (e) =>{
        
        if(e.target.name === "is_teacher"){
            
            setForm({
                ...form,
                is_teacher: true
            })
            setCheckTeacher(true)
            setCheckStudent(false)
            
        }
        else if(e.target.name === "student"){
            
            setForm({
                ...form,
                is_teacher: false
            })
            setCheckTeacher(false)
            setCheckStudent(true)
            
        }

        
    }
    return(
        <div>
            <form onSubmit={(e)=>handlerSubmit(e)} className={style.containerForm}>
                <label>Nombre: </label>
                <input onChange={handlerChange} value={form.name} name="name" type="text"/>
                <label>Apellido: </label>
                <input onChange={handlerChange} value={form.last_name} name="last_name" type="text"/>
                <label>Email: </label>
                <input onChange={handlerChange} value={form.email} name="email" type="text"/>
                <label>Contraseña: </label>
                <input onChange={handlerChange} value={form.password} name="password" type="password"/>
                <label>Telefono: </label>
                <input onChange={handlerChange} value={form.phone} name="phone" type="text"/>
                <label>Dirección: </label>
                <input onChange={handlerChange} value={form.address} name="address" type="text"/>
                <label>Usted es profesor o alumno: </label>
                <div style={{display: "flex"}}>
                <label>Alumno:</label><input type="checkbox" name="student" onChange={handlerChange} onClick={handlerCheck} checked={checkStudent}/>
                <label>Profesor:</label><input type="checkbox" name="is_teacher" onChange={handlerChange} onClick={handlerCheck} checked={checkTeacher}/>
                </div>
                <button type="submit">Registrar</button>
                
            </form>
            {condition}
            <NavLink to="/login"><button>Login</button></NavLink>
            <NavLink to="/"><button>Home</button></NavLink>
        </div>
    )

}

export default Register;