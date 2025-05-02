import { Outlet } from "react-router-dom";
import Profile_sidebar from '../Profile_sidebar/Profile_sidebar'; // Fixed component name (likely typo)
import Notification from '../Notification/Notification';

const HomeScreen = () => {
  return (
    <div className="grid h-screen grid-cols-1 mx-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div className="hidden md:block h-[calc(100vh-2rem)]"> 
        <Profile_sidebar />
      </div>

      <div className="col-span-1 h-[calc(100vh-2rem)] overflow-y-auto md:col-span-2">
        <Outlet />
      </div>

      <div className="hidden lg:block h-[calc(100vh-2rem)] overflow-y-auto">
        <Notification />
      </div>
    </div>
  );
};

export default HomeScreen;