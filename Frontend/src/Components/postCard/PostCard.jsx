import { FaUserCircle } from 'react-icons/fa';
import { Heart, MessageCircle, Share } from 'lucide-react';
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom';

const PostCard = () => {
    return (
        <div className="w-full px-4 py-2  bg-white text-black">
            <div className="flex items-center pb-2  justify-between">
                <div className="flex items-center gap-3  justify-between">
                    <div><FaUserCircle className='h-12 w-12 rounded-full'></FaUserCircle> </div>
                    <div> 
                        <h2 className='font-semibold text-xl'>provat</h2>
                        <p className='text-sm text-gray-500'>2 hours</p>
                        </div>
                </div>
                <div>
                edit
            </div>
            </div>
            <div>
                <p>content</p>
                <div className='mt-3'>
                <img src='' alt="" className='w-full object-cover rounded-lg max-h-80'/>

                </div>
                <div className='flex item-center justify-between'>
               <div className='flex gap-12'>
              <motion.button whileTap={{scale:1.3}} className='flex gap-2 hover:cursor-pointer'><Heart className='fill-red-600' />
              <span>3</span></motion.button>
               <motion.button whileTap={{scale:1.3}} className=''><Link to='/postid/comment'><MessageCircle></MessageCircle></Link></motion.button>
              
                </div>
                <Share className='cursor-pointer' />
                </div> 
            </div>
        </div>
    );
};

export default PostCard;