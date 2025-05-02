import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotification } from "../../Redux/Notification";
import { User } from "lucide-react";

const Notification = () => {
    const Dispatch = useDispatch()
    const { notification } = useSelector((state) => state.Notification)
    useEffect(() => {
        Dispatch(getNotification())
    }, [])
    return (
        <div className="text-black h-screen bg-white px-4">
            <h1 className="text-xl mb-3 font-semibold">Notification</h1>
            <ul className="list  bg-white rounded-box shadow-md">
                {
                    notification.map(notify => (
                        <li key={notify._id} className="list-row border-b border-gray-200">
                            <div>
                                {
                                    notify.profile_photo?<img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp" />:<User className="h-8 w-8 rounded-2xl"></User>
                                }
                            </div>
                            <div>
                                <p className="text-md line-clamp-2 overflow-hidden font-semibold opacity-80">{notify.message}</p>
                            </div>

                        </li>
                    ))
                }


            </ul>

        </div>
    );
};

export default Notification;