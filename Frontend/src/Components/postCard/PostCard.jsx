import { FaUserCircle } from 'react-icons/fa';
import { Heart, MessageCircle, Share } from 'lucide-react';
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PostCard = ({post,username}) => {
    console.log("post",post)
    return (
        <div className="w-full px-4 py-2  bg-white text-black">
            <div className="flex items-center pb-2  justify-between">
                <div className="flex items-center gap-3  justify-between">
                    <div><FaUserCircle className='h-12 w-12 rounded-full'></FaUserCircle> </div>
                    <div> 
                        <h2 className='font-semibold text-xl'>{post.userId.username?post.userId.username:username}</h2>
                        <p className='text-sm text-gray-500'>2 hours</p>
                        </div>
                </div>
                <div>
                edit
            </div>
            </div>
            <div>
                <p className='text-black'>{post.content}</p>
                <div className='mt-3'>
                {
                    post.photoUrl&&<img src={post.photoUrl[0]} alt="" className='w-full object-cover rounded-lg max-h-80'/>

                }
                </div>
                <div className='flex py-3 item-center justify-between'>
               <div className='flex  items-center gap-12'>
              <motion.button whileTap={{scale:1.3}} className='flex gap-2 hover:cursor-pointer'><Heart className='fill-red-600' />
              <span>{post.likeCount}</span></motion.button>
               <motion.button whileTap={{scale:1.3}} className=''><Link to='/postid/comment'><MessageCircle></MessageCircle></Link></motion.button>
                </div>
                <div><Share className='cursor-pointer' /></div>
                </div> 
            </div>
        </div>
    );
};
PostCard.propTypes={
    post:PropTypes.object,
    username:PropTypes.string
}
export default PostCard;