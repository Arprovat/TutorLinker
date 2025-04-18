import MainNavbar from "../../Components/Main-Navbar/MainNavbar";
import PostFeed from "../../Components/Post-feed/Post-feed";
import Profile_sidebar from "../../Components/Profile_sidebar/Profile_sidebar";
import Notification from "../../Components/Notification/Notification";
const Main_page = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <MainNavbar></MainNavbar>
            <div className=" grid grid-cols-2 mx-2 md:grid-cols-4 gap-4">
                <div>
                    <Profile_sidebar></Profile_sidebar>
                </div>
                <div className="col-span-2">
                    <PostFeed></PostFeed>
                </div>
                <div>
                    <Notification></Notification>
                </div>
            </div>
        </div>
    );
};

export default Main_page;