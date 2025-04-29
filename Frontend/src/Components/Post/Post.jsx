import { Upload } from "lucide-react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import UploadFile from "../../Helper/updateFile/UpdateFile";
import { useState } from "react";
import {motion} from 'framer-motion'
const Post = ({ isOpen, isClose }) => {
    const { username } = useSelector((state) => state.profile)
    const [formData, setFormData] = useState({
       content:'',
       photoUrl:[],
       videoUrl:[]
      })

      const handleInput=(e)=>{
setFormData((prev)=>({ ...prev, ['content']: e.target.value }))
      }

      const handleFileUpload=async (e)=>{

        const file =e.target.files[0]
        if(!file){
            return
        }
        const result=await UploadFile(file)
     console.log(result)
        setFormData((prev)=>({
            ...prev,
            photoUrl:result.format !=='mp4'? [...prev.photoUrl,result.url]:prev.photoUrl,
            videoUrl:result.format ==='mp4'?[...prev.videoUrl.result.url]:prev.videoUrl
        }))

      }
    return (
        <div >
            <dialog id="my_modal_5" className={`${isOpen ? 'modal-open' : ''} bg-white modal modal-bottom sm:modal-middle`}>
                <div className="modal-box px-3.5 bg-white relative">
                    <div>
                        <h1 className="font-bold pb-3 border-b-1 text-xl">Create Post</h1>
                        <div className="pt-2 flex gap-3">
                            <img src="" className="w-8 h-8 rounded-full object-cover" alt="" />
                            <h3 className="font-semibold text-md">{username}</h3>
                        </div>
                        <form>

                            <textarea
                                id="description"
                                name="description"
                                placeholder="What's on your mind..."
                                rows={4}
                                value={formData.content}
                                onChange={handleInput}
                                className="w-full py-2 h-22 resize-none border-none outline-none px-4 text-clip focus-within::ring-gray-300"
                                required
                            />
                           <label htmlFor="photoFile" 
                             className="flex flex-col items-center justify-center w-full h-22 border-2 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100"
                             >
                           <div className="  flex flex-col items-center justify-center w-full  rounded-2xl">
                                <Upload className="w-8 h-8 mb-2 text-slate-500 dark:text-slate-400" />
                                <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                            </div>
                            <input
                                 type="file"
                                 name="photoFile"
                                    id="photoFile"
                                className="hidden"
                                onChange={handleFileUpload}
                                />
                           </label>
                          
                          <div className="flex h-14 py-2">
                            {
                                formData.photoUrl?.map((photo,index)=>{
                            <div className=" relative " key={index}>
                                <img src={photo} alt=""  />
                                <button className="absolute top[-2%] left[100%]">X</button>
                            </div>
                                })
                            }
                          </div>
                        </form>
                        <motion.button whileHover={{scale:0.95}} whileTap={{scale:1}} className="  cursor-pointer h-10  text-white text-2xl font-semibold rounded-2xl w-full bg-blue-700 hover:bg-blue-800">Post</motion.button>
                    </div>
                    <div className="modal-action">
                        <form method="dialog" className="modal-backdrop">
                            <button onClick={isClose} className="btn btn-sm btn-circle  btn-ghost hover:bg-gray-200 text-black absolute right-2 top-2">✕</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};
Post.propTypes = {
    isOpen: PropTypes.bool,
    isClose: PropTypes.func
}
export default Post;