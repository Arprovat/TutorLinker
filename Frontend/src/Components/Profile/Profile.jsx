
import { useEffect, useState } from "react"
import { PenLine, MapPin, Languages, Code, Plus } from "lucide-react"
import PostCard from "../postCard/PostCard";
import Job_card from "../job_card/Job_card";
import { Link } from "react-router-dom";
import Post from "../post/Post";
import Education from "../Education/Education";
import { useDispatch, useSelector } from "react-redux";
import Experience from "../Experience/Experience";
import { getUserPost } from "../../Redux/PostSlice";

export default function Profile() {
    const [activeTab, setActiveTab] = useState("posts")
    const [OpenModal, setOpenModal] = useState(false)
    const {userPost} = useSelector((state)=>state.post)
    const {username,address,languages,experience, education, skill} = useSelector((state) => state.profile);
    const dispatch=useDispatch()
    console.log("user",userPost)
    useEffect(()=>{
        dispatch(getUserPost())
    },[])
    
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <div className="relative w-full h-48 md:h-64 bg-gray-200">
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
                            <div className="relative h-32 w-32 rounded-full border-4 border-white shadow-md dark:border-gray-900">
                                <img
                                    src="/placeholder.svg?height=128&width=128"
                                    alt="Profile picture"
                                    className="h-full w-full rounded-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />

                                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gray-100 text-4xl font-bold text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                                    JD
                                </div>
                            </div>

                            <div className="mt-4 text-center md:text-left">
                                <h1 className="text-2xl font-bold text-black">{username}</h1>
                                <div className="flex items-center justify-center md:justify-start text-gray-500 mt-1">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    <span>{address}</span>
                                </div>
                            </div>

                            <div className="w-full bg-white text-black p-4 rounded-2xl mt-6">
                                <div>
                                    <h1 className="text-2xl font-semibold">Education</h1>
                                </div>
                                {
                                    education?education.map(edu=>(
                                    <Education key={edu._id} edu={edu}></Education>
                                    )):"not provided yet"
                                }
                            </div>

                            <div className="w-full  bg-white text-black p-4 rounded-2xl mt-4">
                                <div>
                                    <h1 className="text-2xl font-semibold">Experience</h1>
                                </div>
                                {
                                    experience?experience.map(ex=>(
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
                                            languages?languages.map((lan,inx)=>(

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
                                            skill?skill.map((s,inx)=>(

                                                <span key={inx} className="bg-gray-100 px-2 py-1 rounded-full text-sm">{s}</span>
                                            )):"not Provided yet"
                                          } 


                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                            
                                            <PostCard key={post._id} post={post} username={username}></PostCard>
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
                                        <Job_card></Job_card>
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
