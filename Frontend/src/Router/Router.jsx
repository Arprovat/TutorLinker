import { createBrowserRouter } from "react-router-dom";
import Landing_page from "../Pages/Landing_Page/Landing_page"; 
import Login from "../Components/login/Login";
import Home from "../Pages/Home/Home";
import Signup from "../Components/Signup/Signup";
import Main_page from "../Pages/Main/Main_page";
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
        element:<Main_page></Main_page>,
        children:[]
    }

    ]
)

export default router