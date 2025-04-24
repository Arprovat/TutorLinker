import { useSelector } from "react-redux";

const EditProfile = () => {
    const {username}=useSelector((state)=>state.profile)
    return (
        <div className="text-black max-w-7xl mx-auto">
            <p>{username}</p>
            <img src="" alt="" />
            <img src="" alt="" />
           
        </div>
    );
};

export default EditProfile;