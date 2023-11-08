import { useSelector } from "react-redux";

const Profile = () =>{
    const session = useSelector((state) => state?.session)
    return(
        <div>
            {session ? <div>Profile</div> : <div>Debe iniciar session</div>}
            
            
            
        </div>
    )
}

export default Profile;