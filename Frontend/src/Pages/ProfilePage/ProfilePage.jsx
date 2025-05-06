import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getAProfile } from "../../Redux/Profileslice";
import { getUserPost } from "../../Redux/PostSlice";
import { fetchUserJobPosts } from "../../Redux/JobSlice";

const ProfilePage = () => {
    const dispatch=useDispatch()
    const param= useParams()
    const userId = localStorage.getItem("userId")
    useEffect(()=>{
        if(userId !=param.id){
            console.log("enter")
         dispatch(getAProfile(param.id))
        }
         dispatch(getUserPost(param.id))
         dispatch(fetchUserJobPosts(param.id))
     },[dispatch, param.id])
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default ProfilePage;