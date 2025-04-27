import { User } from "lucide-react";
import { motion } from 'framer-motion';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const Profile_sidebar = () => {
  const {username, education, Skill, loading, error } = useSelector((state) => state.profile);
  const { Address } = useSelector((state) => state.profile); // Access Address from state

  

  if (loading) {
    return <div className="text-black static h-screen px-4 z-10 bg-white"><p>Loading profile...</p></div>;
  }

  if (error) {
    return <div className="text-black static h-screen px-4 z-10 bg-white"><p>Error loading profile: {error}</p></div>;
  }

  return (
    <div className="text-black static h-screen px-4 z-10 bg-white">
      <div className="flex flex-col pt-6 items-center gap-4 pb-2">
        <div>
          <User className="h-20 w-20 rounded-full" />
        </div >
        <div>
          <h2 className="text-lg font-bold">{username}</h2>
        </div>
      </div>
      <div>
        <div className="space-y-4">
          <p>{Address || 'No location provided'}</p>
          <div>
            <h3 className="font-medium text-gray-500 mb-1">Education</h3>
            {education && education.length > 0 ? (
              education.map((edu, index) => (
                <p key={index}>{edu}</p> 
              ))
            ) : (
              <p>No education information provided.</p>
            )}
          </div>
          <motion.button
            whileTap={{ scale: 1.05 }}
            className="bg-zinc-100 text-black hover:bg-zinc-800 transition-bg duration-300 border-2 border-zinc-800 hover:text-white mx-auto w-full h-10 text-lg font-semibold rounded-lg "
          >
           <Link to='EditProfile'>Edit profile</Link>
          </motion.button>
          <div>
            <h3 className="font-medium text-gray-500 mb-1">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {Skill && Skill.length > 0 ? ( 
                Skill.map((s) => (
                  <span key={s} className="bg-gray-100 px-2 py-1 rounded-full text-sm">{s}</span>
                ))
              ) : (
                <p>No skills provided.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile_sidebar;