import { FaUserCircle } from 'react-icons/fa';
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
                <div>content</div>
                <div>image</div>
            </div>
        </div>
    );
};

export default PostCard;