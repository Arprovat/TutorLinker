import MainNavbar from "../../Components/Main-Navbar/MainNavbar";
import BottomNavbar from "../../Components/Main-Navbar/BottomNavbar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfile } from "../../Redux/Profileslice";
import { Outlet } from "react-router-dom";
//import {io} from 'socket.io-client'
//import {  setSocket } from "../../Redux/AuthSlice";
const Main_page = () => {
    const dispatch=useDispatch()
   // const userId = localStorage.getItem('userId')
    useEffect(() => {
        dispatch(getProfile()); 
      },[]);

     /* useEffect(()=>{
           let  socket = io('http://localhost:8000', {
              withCredentials: true
            });
        
            socket.on('connect', () => {
              socket.emit('register', userId);
            });
          dispatch(setSocket(socket))

      },[])*/

    return (
        <div className="min-h-screen relative bg-gray-100">
            <MainNavbar></MainNavbar>
             <Outlet></Outlet>
            <BottomNavbar></BottomNavbar>
        </div>
    );
};
export default Main_page