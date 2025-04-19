import MainNavbar from "../../Components/Main-Navbar/MainNavbar";
import PostFeed from "../../Components/Post-feed/Post-feed";
import Profile_sidebar from "../../Components/Profile_sidebar/Profile_sidebar";
import Notification from "../../Components/Notification/Notification";
import BottomNavbar from "../../Components/Main-Navbar/BottomNavbar";
const Main_page = () => {
    return (
        <div className="min-h-screen relative bg-gray-100">
            <MainNavbar></MainNavbar>
            <div className="grid grid-cols-1 mx-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="hidden md:block">
                    <Profile_sidebar />
                </div>
                
                <div className="col-span-1 md:col-span-2">
                    <PostFeed />
                </div>
                
                <div className="hidden lg:block">
                    <Notification />
                </div>
            </div>
            <BottomNavbar></BottomNavbar>
        </div>
    );
};

export default Main_page;