import style from "./listUser.module.css"
import { useDispatch, useSelector } from "react-redux"
import { vSession } from "../../redux/actions"
const ListUser = () =>{
    const dispatch = useDispatch()
    const handlerLogout = () =>{
        dispatch(vSession(false))
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("data")
    }
    return(
        <div className={style.container}>
            <span>
                Perfil
            </span>
            <br></br>
            <span>
                Administración
            </span>
            <br></br>
            <span onClick={handlerLogout}>
                Cerrar Sessión
            </span>
           
        </div>
    )
}

export default ListUser;