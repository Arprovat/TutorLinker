
import PostCard from './../postCard/PostCard';
import { motion } from 'framer-motion';
const PostFeed = () => {
    return (
        <div className="space-y-4 text-black aut">
            <div className='mb-2 px-4 py-2 bg-white'  >
                <div className="pb-3">
                    <h2 className="text-xl font-semibold">Whats happening</h2>
                </div>
                <div className='py-2'>
                    <input
                        placeholder="Share your thoughts..."
                        className="h-16 w-full rounded-xl border-gray-300 px-4 focus-within::ring-gray-300"
                        type='area'
                    />
                </div>
                <div className="flex justify-end">
<motion.button whileTap={{scale:1.1}}  type='button' className='bg-black flex font-semibold items-center justify-center text-white shadow-2xl h-10 w-20 rounded-2xl'>post</motion.button>
                </div>
            </div>
            <PostCard></PostCard>
        </div>
    );
};

export default PostFeed;