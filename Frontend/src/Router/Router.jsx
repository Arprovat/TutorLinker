import { createBrowserRouter } from "react-router-dom";
import Landing_page from "../Pages/Landing_Page/Landing_page"; 
import Login from "../Components/login/Login";
import Home from "../Pages/Home/Home";
import Signup from "../Components/Signup/Signup";
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
    ]
)

export default router