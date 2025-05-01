import { FaEyeSlash, FaUserCircle } from 'react-icons/fa';
import { BookmarkIcon, EllipsisVertical, Heart, MessageCircle, Share } from 'lucide-react';
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment'
const PostCard = ({ post, username }) => {
    console.log("post", post)
    const time = () => {
        console.log(post.createdAt)
        const start = moment(post.createdAt)
        const now = moment()

        const duration = moment.duration(start.diff(now))
        console.log(duration)
        const asMin = Math.abs(duration.asMinutes())
        const asHours = Math.abs(duration.asHours())
        const asDay = Math.abs(duration.asDays())
        console.log(asHours)
        if (asHours < 1) {
            return `${Math.round(asMin)} min`
        }
        else if (asHours < 24) {
            return `${asHours.toFixed(2)} Hours`
        }
        else {
            return `${asDay.toFixed(0)} day${asDay !== 1 ? 's' : ''}`;
        }
    }
    return (
        <div className="w-full px-4 py-2  bg-white text-black">
            <div className="flex items-center pb-2  justify-between">
                <div className="flex items-center gap-3  justify-between">
                    <div><FaUserCircle className='h-12 w-12 rounded-full'></FaUserCircle> </div>
                    <div>
                        <h2 className='font-semibold text-md'>{post.userId.username ? post.userId.username : username}</h2>
                        <p className='text-sm text-gray-500'>{time()} ago</p>
                    </div>
                </div>
                <div>
                <div className="dropdown dropdown-end">
  <div 
    tabIndex={0} 
    role="button" 
    className="btn btn-ghost btn-circle p-2 hover:bg-gray-100 transition-colors"
  >
    <EllipsisVertical className="w-5 h-5 text-gray-600" />
  </div>
  
  <ul 
    tabIndex={0} 
    className="dropdown-content z-20 menu p-2 shadow-lg bg-white rounded-lg w-48 
             border border-gray-100 transform origin-top-right transition-all duration-200"
  >
    <li>
      <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 
                        active:bg-gray-100 rounded-md transition-colors">
        <BookmarkIcon className="w-4 h-4 text-gray-500" />
        Save post
      </button>
    </li>
    
    <li className="my-1">
      <div className="h-px bg-gray-100 mx-2" />
    </li>
    
    <li>
      <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 
                        active:bg-gray-100 rounded-md transition-colors">
        <FaEyeSlash className="w-4 h-4 text-gray-500" />
        Hide post
      </button>
    </li>
  </ul>
</div>
                </div>
            </div>
            <div>
                <p className='text-black'>{post.content}</p>
                <div className='mt-3'>
                    {
                        post.photoUrl && <img src={post.photoUrl[0]} alt="" className='w-full object-cover rounded-lg max-h-80' />

                    }
                </div>
                <div className='flex py-3 item-center justify-between'>
                    <div className='flex  items-center gap-12'>
                        <motion.button whileTap={{ scale: 1.3 }} className='flex gap-2 hover:cursor-pointer'><Heart className='fill-red-600' />
                            <span>{post.likeCount}</span></motion.button>
                        <motion.button whileTap={{ scale: 1.3 }} className=''><Link to='/postid/comment'><MessageCircle></MessageCircle></Link></motion.button>
                    </div>
                    <div className='mr-1'><Share className='cursor-pointer' /></div>
                </div>
            </div>
        </div>
    );
};
PostCard.propTypes = {
    post: PropTypes.object,
    username: PropTypes.string
}
export default PostCard;