
import { User } from "lucide-react";
import {motion} from 'framer-motion'
const Profile_sidebar = () => {
    return (
        <div className="text-black static h-screen px-4 z-10 bg-white">
        <div className="flex flex-col pt-6  items-center gap-4 pb-2">
          <div>
              <User className="h-20 w-20 rounded-full" />   
          </div >
          <div>
            <h2 className="text-lg font-bold">John Doe</h2>
          </div>
        </div>
        <div>
          <div className="space-y-4">
            <p>location</p>
            <div>
              <h3 className="font-medium text-gray-500 mb-1">Education</h3>
              <p>Computer Science, Stanford University</p>
              <p>Computer Science, Stanford University</p>
              <p>Computer Science, Stanford University</p>

            </div>
            <motion.button whileTap={{scale:1.05}}className="bg-zinc-100 text-black hover:bg-zinc-800 transition-bg duration-300 border-2 border-zinc-800 hover:text-white mx-auto w-full h-10 text-lg font-semibold rounded-lg ">Edit profile</motion.button>
            <div>
              <h3 className="font-medium text-gray-500 mb-1">Skills</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-100 px-2 py-1 rounded-full text-sm">JavaScript</span>
                <span className="bg-gray-100 px-2 py-1 rounded-full text-sm">React</span>
                <span className="bg-gray-100 px-2 py-1 rounded-full text-sm">Node.js</span>
                <span className="bg-gray-100 px-2 py-1 rounded-full text-sm">UI/UX</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
    
};

export default Profile_sidebar;
