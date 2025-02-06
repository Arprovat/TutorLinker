import { createBrowserRouter } from "react-router-dom";
import Landing_page from "../Pages/Landing_Page/Landing_page";
import Login from "../Pages/login/Login";
import Registration from "../Pages/Registration/Registration";


const router = createBrowserRouter(
[{
    path:'/',
    element:<Landing_page/>,
    children:[
        {
            path:'login',
            element:<Login/>
        },
        {
            path:"register",
            element:<Registration></Registration>
        }
    ]
}

]
)

export default router