
import { User } from "lucide-react";
const Profile_sidebar = () => {
    return (
        <div className="text-black bg-white">
        <div className="flex  items-center gap-4 pb-2">
          <div>
              <User className="h-12 w-12" />   
          </div >
          <div>
            <h2 className="text-lg font-bold">John Doe</h2>
          </div>
        </div>
        <div>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-500 mb-1">Education</h3>
              <p>Computer Science, Stanford University</p>
              <p>Computer Science, Stanford University</p>
              <p>Computer Science, Stanford University</p>

            </div>
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
