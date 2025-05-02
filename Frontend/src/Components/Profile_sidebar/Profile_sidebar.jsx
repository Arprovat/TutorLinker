import { Code, MapPin, User } from "lucide-react";
import { motion } from 'framer-motion';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Education from "../Education/Education";


const Profile_sidebar = () => {
  const { username, address, education, skill, loading, error } = useSelector((state) => state.profile);



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
          <div className="flex items-center justify-center md:justify-start text-gray-500 mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{address}</span>
          </div>
          <div>
            <h3 className="font-medium text-gray-500 mb-1">Education</h3>
            {education && education.length > 0 ? (
              education.map((edu) => (
                <Education key={edu._id} edu={edu} />
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

              <Code className="h-5 w-5 text-gray-500 mt-1" />
              <div className="flex flex-wrap gap-2">
                {
                  skill ? skill.map((s, inx) => (

                    <span key={inx} className="bg-gray-100 px-2 py-1 rounded-full text-sm">{s}</span>
                  )) : "not Provided yet"
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile_sidebar;