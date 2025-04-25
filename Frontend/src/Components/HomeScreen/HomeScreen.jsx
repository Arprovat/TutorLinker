import { Outlet } from "react-router-dom";
import Profiler_sidebar from '../Profile_sidebar/Profile_sidebar'
import Notification from '../Notification/Notification'
const HomeScreen=()=>{

return(
<div className="grid grid-cols-1 mx-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <div className="hidden md:block">
        <Profiler_sidebar />
    </div>

    <div className="col-span-1 md:col-span-2">
        <Outlet></Outlet>
    </div>

    <div className="hidden lg:block">
        <Notification />
    </div>
</div>
);
}
export default HomeScreen