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
import Job_Post from "../Components/Job_post/Job_post";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import Profile from "../Components/Profile/Profile";
import JobDetailsPage from "../Pages/job_details/job_details";
import ConnectionsPage from "../Pages/connection/Connection";
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
        path: '/main',
        element: <PrivateRoute allowedUser={['student', 'parent', 'teacher']}><Main_page></Main_page></PrivateRoute>,
        children: [
            {
                path: '',
                element: <HomeScreen></HomeScreen>,
                children: [
                    {
                        path: '',
                        element: <PostFeed></PostFeed>
                    }, {
                        path: 'JobFeed',
                        element: <PrivateRoute allowedUser={['teacher','student']}><JobFeed></JobFeed></PrivateRoute>
                    }
                ]
            },
            {
                path: 'EditProfile',
                element: <PrivateRoute allowedUser={['student', 'parent', 'teacher']}><EditProfile></EditProfile></PrivateRoute>
            },

            {
                path: 'profile',
                element: <ProfilePage></ProfilePage>,
                children: [
                    {
                        path:'',
                        element:<Profile></Profile>
                    },
                    {
                        path: 'jobPost',
                        element: <PrivateRoute allowedUser={['student', 'parent']}><Job_Post></Job_Post></PrivateRoute>
                    },

                ]
            },
            {
                path:"connection",
                element:<ConnectionsPage></ConnectionsPage>
            },
            {
                path:'job/:id',
                element:<JobDetailsPage></JobDetailsPage>
            }
            
        ]
    },


    ]
)

export default router