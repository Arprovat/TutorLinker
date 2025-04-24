import { createBrowserRouter } from "react-router-dom";
import Landing_page from "../Pages/Landing_Page/Landing_page"; 
import Login from "../Components/login/Login";
import Home from "../Pages/Home/Home";
import Signup from "../Components/Signup/Signup";
import Main_page from "../Pages/Main/Main_page";
import PrivateRoute from "./PrivateRoute";
import EditProfile from "../Components/EditProfile/EditProfile";
import HomeScreen from "../Components/HomeScreen/HomeScreen";
import PostFeed from "../Components/Post-feed/Post-feed";
import JobFeed from "../Components/Job-Feed/Job-Feed";
const router = createBrowserRouter(
    [{
        path: '/',
        element: <Home />,
        children: [
            {
                path: '',
                element: <Landing_page />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'signup',
                element: <Signup />
            }
        ]

    },
    {
        path:'/main',
        element:<PrivateRoute><Main_page></Main_page></PrivateRoute>,
        children:[
            {
                path:'',
                element:<HomeScreen></HomeScreen>,
                children:[
                   {path:'',
                    element:<PostFeed></PostFeed>
                   },{
                    path:'JobFeed',
                    element:<JobFeed></JobFeed>
                   }
                ]
            },
            {
                    path:'EditProfile',
                    element:<EditProfile></EditProfile>
            }
        ]
    },
    

    ]
)

export default router