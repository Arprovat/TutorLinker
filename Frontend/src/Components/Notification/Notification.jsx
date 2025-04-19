import { FaUser } from "react-icons/fa";

const Notification = () => {
    return (
        <div className="text-black h-screen bg-white px-4">
            <h1 className="text-xl mb-3 font-semibold">Notification</h1>

            <div className="flex border-b-1 py-2 shadow-lg overflow-y-auto mb-1 border-gray-100 gap-2 items-center ">
                <div>
                    <FaUser src="" alt="" className="h-8 w-8 rounded-full" />
                </div>
                <div className=" ">
                    <p className="text-md  text-clip">you just got a notification</p>
                    <p className="text-sm text-gray-500">1 hours</p>
                </div>
            </div>
            <div className="flex border-b-0 border-gray-100 gap-2 items-center ">
                <div>
                    <FaUser src="" alt="" className="h-8 w-8 rounded-full" />
                </div>
                <div className=" ">
                    <p className="text-md text-clip  ">you just got a notification</p>
                    <p className="text-sm text-gray-500">1 hours</p>
                </div>
            </div>
        </div>
    );
};

export default Notification;