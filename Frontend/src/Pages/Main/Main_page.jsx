import MainNavbar from "../../Components/Main-Navbar/MainNavbar";
import BottomNavbar from "../../Components/Main-Navbar/BottomNavbar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfile } from "../../Redux/Profileslice";
import { Outlet } from "react-router-dom";
import {io} from 'socket.io-client'
import { setOnlineUser, setSocket } from "../../Redux/AuthSlice";
const Main_page = () => {
    const dispatch=useDispatch()

    useEffect(() => {
        dispatch(getProfile()); 
      },[]);

      useEffect(()=>{
        const newSocket = io('http://localhost/8000')
   
        newSocket.on('onlineUser',(data)=>{
            dispatch(setOnlineUser(data))
        })
        dispatch(setSocket(newSocket))
        return () => newSocket.disconnect();

      },[])

    return (
        <div className="min-h-screen relative bg-gray-100">
            <MainNavbar></MainNavbar>
             <Outlet></Outlet>
            <BottomNavbar></BottomNavbar>
        </div>
    );
};
export default Main_page