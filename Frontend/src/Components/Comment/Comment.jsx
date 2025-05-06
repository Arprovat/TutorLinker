import { Send, X } from "lucide-react";
import PropTypes from "prop-types";
import PostCard from "../postCard/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { commentPost } from "../../Redux/PostSlice";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";

const Comment = ({ isOpen, isClose }) => {
    const [value, setValue] = useState('');
    const { singlePost, loading, error } = useSelector((state) => state.post);
    const dispatch = useDispatch();
    
    const handleOnClick = () => {
        if (value.trim()) {
            dispatch(commentPost({ 
                postId: singlePost._id, 
                comment: value 
            }));
            setValue('');
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="loading loading-spinner text-primary"></div>
        </div>
    );

    return (
        <dialog id="post_modal" className={`modal modal-bottom sm:modal-middle ${isOpen ? "modal-open" : ""}`}>
            <div className="modal-box relative bg-white p-0 overflow-hidden max-h-[90vh]">
                <div className="sticky top-0 bg-white z-20 p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold">Comments</h3>
                        <button
                            onClick={isClose}
                            className="btn btn-sm btn-circle btn-ghost"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <PostCard post={singlePost} />
                </div>

                <div className="px-4 pb-8 bg-white h-[calc(90vh-260px)] overflow-y-auto">
                    {singlePost.comments?.length === 0 && (
                        <div className="text-center bg-white text-gray-500 py-8">
                            No comments yet. Be the first to comment!
                        </div>
                    )}

                    {singlePost.comments?.map((com,) => (
                        <motion.div
                            key={com._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="py-4 group"
                            style={{ transition: 'all 0.2s ease' }}
                        >
                            <div className="flex gap-3">
                                {com.userId?.profilePicture ? (
                                    <img
                                        src={com.userId.profilePicture}
                                        alt="Profile"
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <FaUserCircle className="w-10 h-10 text-gray-400" />
                                )}
                                <div className="flex-1">
                                    <div className="bg-white p-3 rounded-xl">
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="font-semibold text-sm">{com.userId?.username}</p>
                                            <span className="text-xs text-gray-500">
                                                {new Date(com.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-sm">{com.text}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="sticky bottom-0  bg-white border-t border-gray-200 p-4">
                    <div className="flex items-center gap-2 w-full">
                        <input
                            type="text"
                            className="input input-bordered w-full bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            placeholder="Write a comment..."
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleOnClick()}
                            autoFocus
                        />
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={handleOnClick}
                            className="btn btn-circle btn-primary btn-sm"
                            disabled={!value.trim()}
                        >
                            <Send className="w-6 h-6 text-blue-900" />
                        </motion.button>
                    </div>
                    {error && (
                        <div className="text-error text-sm mt-2">
                            Failed to post comment: {error}
                        </div>
                    )}
                </div>
            </div>
        </dialog>
    );
};

Comment.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    isClose: PropTypes.func.isRequired
};

export default Comment;