
import {  useState } from "react"
import { PenLine, MapPin, Languages, Code, Plus, Mail, UserRoundPlus } from "lucide-react"
import PostCard from "../postCard/PostCard";
import Job_card from "../job_card/Job_card";
import {motion} from 'framer-motion'
import { Link, useParams } from "react-router-dom";
import Education from "../Education/Education";
import {  useSelector } from "react-redux";
import Experience from "../Experience/Experience";
import Post from "../Post/Post";

export default function Profile() {
    const userId=localStorage.getItem("userId")
    const param= useParams()
    const [activeTab, setActiveTab] = useState("posts")
    const [OpenModal, setOpenModal] = useState(false)
    const {userPost} = useSelector((state)=>state.post)
    const {UserJobpost} =useSelector((state)=>state.jobPost)
    
    const {otherProfile,currentUser,connectionId} =useSelector(state=>state.profile)
    console.log("user",userPost)
    console.log('profile',otherProfile)
  
    const displayUser = userId == param.id ?currentUser:otherProfile
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <div className="relative w-full h-48 md:h-64 bg-gray-300">
                <img src="/placeholder.svg?height=300&width=1200" alt="Cover" className="w-full h-full object-cover" />
                <label htmlFor="editCover" className="absolute cursor-pointer w-30 p-2 h-8 flex justify-center items-center bottom-4 font-semibold rounded-2xl text-black right-4 bg-white/80">
                    <PenLine className="h-4 w-4 mr-2" />
                    Edit Cover
                    <input type="file" id='editCover' name="editCover" className="hidden" />
                </label>
            </div>

            <div className="container px-4 mx-auto">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3 -mt-16 z-10">
                        <div className="flex flex-col items-center md:items-start">
                            <div className="relative h-32 w-32 rounded-full  border-white shadow-md dark:border-gray-900">
                                <img
                                    src='#'
                                    alt="Profile picture"
                                    className="h-full w-full rounded-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />

                                <div className="absolute">
                                    <img src={displayUser.profile_pic} className="object-cover rounded-full w-32 h-32"  alt="" />
                                </div>
                            </div>

                            <div className="mt-4 text-center md:text-left">
                                <h1 className="text-2xl font-bold text-black">{displayUser.username?displayUser.username:displayUser.AccId.username}</h1>
                                <div className="flex items-center justify-center md:justify-start text-gray-500 mt-1">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    <span>{displayUser.address}</span>
                                </div>
                            </div>

                            <div className="w-full bg-white text-black p-4 rounded-2xl mt-6">
                                <div>
                                    <h1 className="text-2xl font-semibold">Education</h1>
                                </div>
                                { displayUser.education?displayUser.education.map(edu=>(
                                    <Education key={edu._id} edu={edu}></Education>
                                    )):"not provided yet"
                                }
                            </div>

                            <div className="w-full  bg-white text-black p-4 rounded-2xl mt-4">
                                <div>
                                    <h1 className="text-2xl font-semibold">Experience</h1>
                                </div>
                                {
                                   displayUser.experience?displayUser.experience.map(ex=>(
                                        <Experience key={ex._id} experience={ex}></Experience>
                                    )):"Not provided yet"
                                }
                                    
                                </div>
                            

                            <div className="w-full  bg-white text-black p-4 rounded-2xl mt-4">
                                <div>
                                    <h1 className="text-2xl font-semibold">Languages</h1>
                                </div>
                                <div className="space-y-2 mt-4">
                                    <div className="flex gap-3">
                                        <Languages className="h-5 w-5 text-gray-500 mt-1" />
                                        <div className="flex flex-wrap gap-2">
                                         {
                   displayUser.languages?displayUser.languages.map((lan,inx)=>(

                                                <span key={inx} className="bg-gray-100 px-2 py-1 rounded-full text-sm">{lan}</span>
                                            )):"not provided"
                                         }  
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full  bg-white text-black p-4 rounded-2xl mt-4 mb-6">
                                <div>
                                    <h1 className="text-2xl font-semibold">Skills</h1>
                                </div>
                                <div className="space-y-2 mt-4">
                                    <div className="flex gap-3">
                                        <Code className="h-5 w-5 text-gray-500 mt-1" />
                                        <div className="flex flex-wrap gap-2">
                                          {
                                           displayUser.skill?displayUser.skill.map((s,inx)=>(

                                                <span key={inx} className="bg-gray-100 px-2 py-1 rounded-full text-sm">{s}</span>
                                            )):"not Provided yet"
                                          } 


                                        </div>
                                    </div>
                                </div>
                                
                            </div> 
                           { userId == param.id?( <motion.button
            whileTap={{ scale: 1.05 }}
            className="bg-zinc-100 text-black hover:bg-zinc-800 transition-bg duration-300 border-2 border-zinc-800 hover:text-white mx-auto w-full h-10 text-lg font-semibold rounded-lg "
          >
            <Link to='/main/EditProfile'>Edit profile</Link>
          </motion.button>):( 
            <div className="w-full flex">
                <Link to='/mail' className="bg-gradient-to-r from-[#EA4335] via-[#FBBC05] to-[#178d1d]    shadow-md flex items-center justify-center text-black   gap-3   hover:bg-zinc-800 transition-bg duration-300 hover:bg-gradient-to-r hover:to-[#EA4335] hover:via-[#FBBC05] hover:from-[#178d1d] mx-auto w-[40%] h-10 text-lg font-bold rounded-lg "><motion.button
            whileTap={{ scale: 1.05 }} >
            <div className="flex gap-3  items-center my-auto justify-center"><Mail className="text-center"></Mail>
           mail</div>
          </motion.button></Link> 
                <motion.button
            whileTap={{ scale: 1.05 }}
            className="bg-primary w-[40%] flex gap-3 items-baseline justify-center  hover:bg-blue-700 transition-bg duration-300  mx-auto h-10 text-lg font-semibold rounded-lg "
          >
            <div className="flex gap-3 items-center my-auto justify-center"><UserRoundPlus className="text-center" /> 
            <Link to='/mail'>{connectionId.includes(param.id)?connectionId.status:"Request"}</Link></div>
          </motion.button>
            </div>
            )
          
     
                           }
                        </div>
                    </div>

                    <div className="w-full md:w-2/3 mt-6 md:mt-4">
                        <div className="w-full">
                            <div className="grid grid-cols-2 gap-2 w-full">
                                <button
                                    className={`p-2 text-center ${activeTab === 'posts'
                                        ? 'border-b-2 border-blue-600 rounded-xl bg-white text-black'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                    onClick={() => setActiveTab('posts')}
                                >
                                    Posts
                                </button>
                                <button
                                    className={`p-2 text-center ${activeTab === 'tuition'
                                        ? 'border-b-2 border-blue-600 rounded-xl shadow-2xl bg-white text-black'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                    onClick={() => setActiveTab('tuition')}
                                >
                                    Tuition Posts
                                </button>
                            </div>

                            {activeTab === 'posts' && (
                                <div className="mt-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-bold text-black">Recent Posts</h2>
                                        <button onClick={() => setOpenModal(true)} className="flex font-semibold items-center  px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                                            <Plus></Plus>
                                            New Post
                                        </button>
                                    </div>
<div className="text-black">
<Post isOpen={OpenModal} isClose={() => { setOpenModal(false) }} ></Post>

</div>
                                    <div className="space-y-4">
                                      {
                                        userPost?userPost.map(post=>(
                                            
                                            <PostCard key={post._id} post={post} username={displayUser.username}></PostCard>
                                        )):'not provided yet'
                                      }

                                    </div>
                                </div>
                            )}

                            {activeTab === 'tuition' && (
                                <div className="mt-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-bold text-black">Tuition Posts</h2>
                                        <Link to='jobPost' className="flex items-center px-4 py-2 font-semibold bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                                            <Plus></Plus>
                                            New Tuition Post
                                        </Link>
                                    </div>

                                    <div className="space-y-4">
                              {
                                                  UserJobpost.map((post)=>(
                              <Job_card key={post._id} post={post}></Job_card>
                                                  ))
                                              }     
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
