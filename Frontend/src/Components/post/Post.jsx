import { Upload, X } from "lucide-react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import UploadFile from "../../Helper/updateFile/UpdateFile";
import { useState } from "react";
import { motion } from "framer-motion";
import { createPost } from "../../Redux/PostSlice";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Post = ({ isOpen, isClose }) => {
  const { username,profile_pic } = useSelector((state) => state.profile.currentUser);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    content: "",
    photoUrl: [],
    videoUrl: []
  });
  const handlePost =async () => {
    const response = await dispatch(createPost(formData))
    if(response.payload.success) {
      navigate(-1)
      toast('post uploaded successfully ')
      setFormData({
        content: "",
        photoUrl: [],
        videoUrl: []
      })
    }

  }
  const handleInput = (e) => {
    setFormData((prev) => ({ ...prev, content: e.target.value }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const result = await UploadFile(file);
    const { url, format } = result;

    if (format === "mp4") {
      setFormData((prev) => ({
        ...prev,
        videoUrl: [...prev.videoUrl, url]
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        photoUrl: [...prev.photoUrl, url]
      }));
    }
  };

  const removeMedia = (type, index) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const canPost = formData.content.trim() || formData.photoUrl.length > 0 || formData.videoUrl.length > 0;

  return (
    <dialog
      id="post_modal"
      className={`modal modal-bottom sm:modal-middle ${isOpen ? "modal-open" : ""}`}
    >
      <ToastContainer></ToastContainer>
      <div className="modal-box relative bg-white p-6 rounded-2xl shadow-lg">
        <button
          onClick={isClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
        >
          <X />
        </button>
        <h1 className="text-2xl font-bold mb-4">Create Post</h1>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full">
            <img src={profile_pic} alt="profile_pic" className="w-10 h-10 rounded-full object-cover" />
          </div>
          <span className="font-semibold">{username}</span>
        </div>

        <textarea
          placeholder="What's on your mind..."
          rows={4}
          value={formData.content}
          onChange={handleInput}
          className="w-full p-4 mb-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <label
          htmlFor="mediaUpload"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 mb-4"
        >
          <Upload className="w-8 h-8 mb-2 text-gray-500" />
          <p className="text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <input
            type="file"
            id="mediaUpload"
            className="hidden"
            accept="image/*,video/mp4"
            onChange={handleFileUpload}
          />
        </label>

        {(formData.photoUrl.length > 0 || formData.videoUrl.length > 0) && (
          <div className="grid grid-cols-4 gap-2 mb-4">
            {formData.photoUrl.map((src, idx) => (
              <div key={idx} className="relative">
                <img src={src} alt="preview" className="w-full h-20 object-cover rounded-lg" />
                <button
                  onClick={() => removeMedia('photoUrl', idx)}
                  className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow"
                >
                  <X className="w-4 h-4 text-red-500" />
                </button>
              </div>
            ))}
            {formData.videoUrl.map((src, idx) => (
              <div key={idx} className="relative">
                <video src={src} controls className="w-full h-20 object-cover rounded-lg" />
                <button
                  onClick={() => removeMedia('videoUrl', idx)}
                  className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow"
                >
                  <X className="w-4 h-4 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!canPost}
          onClick={() => handlePost()}
          className={`w-full py-3 text-white font-semibold rounded-2xl ${canPost ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'
            }`}
        >
          Post
        </motion.button>
      </div>
    </dialog>
  );
};

Post.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isClose: PropTypes.func.isRequired
};

export default Post;
