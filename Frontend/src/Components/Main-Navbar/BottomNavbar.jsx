import { Briefcase, Home, Users } from "lucide-react";
import { BiNotification } from "react-icons/bi";
import { Link } from "react-router-dom";

const BottomNavbar = () => {
    return (
        <div className="fixed bottom-8  text-black transform -translate-x-1/2  left-2/5  bg-gray-100 shadow-lg border-2 border-gray-300 rounded-full w-auto px-8 py-3">
            <div className="flex items-center justify-center gap-8">
                <div className=" cursor-pointer">
                  <Link to='/main' className="group flex gap-1 items-center"><Home className="text-gray-600 group-hover:text-blue-500" size={20} />
                  <span className="  text-xs font-semibold    hidden sm:group-hover:block opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">Home</span></Link>
                </div>
                
                <div className=" cursor-pointer">
                   <Link to='/connection' className="group flex gap-1 items-center"> <Users className="text-gray-600 group-hover:text-blue-500" size={20} />
                   <span className="text-xs mt-1 hidden sm:group-hover:block opacity-0 sm:group-hover:opacity-100 font-semibold transition-opacity duration-200">Friends</span></Link>
                </div>
                
                <div className="cursor-pointer">
                   <Link to='JobFeed' className="group flex gap-1 items-center "><Briefcase className="text-gray-600 group-hover:text-blue-500" size={20} />
                   <span className="text-xs mt-1 hidden sm:group-hover:block opacity-0 sm:group-hover:opacity-100 font-semibold transition-opacity duration-200">Jobs</span></Link> 
                </div>
                <div className="cursor-pointer lg:hidden">
                   <Link to='/notification' className="group flex gap-1 items-center "><BiNotification className="text-gray-600 group-hover:text-blue-500" size={20} />
                   </Link> 
                </div>
            </div>
        </div>
    );
};

export default BottomNavbar;