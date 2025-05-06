import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotification } from "../../Redux/Notification";
import { Bell, User } from "lucide-react";

const Notification = () => {
    const Dispatch = useDispatch()
    const userId = localStorage.getItem('userId')
    const { notification } = useSelector((state) => state.Notification)
//const {socket} = useSelector(state => state.auth)
    useEffect(() => {
        Dispatch(getNotification())
        /*socket.on('newNotification', (newNotification) => {
        Dispatch(setNotify(newNotification));
      });
      return () => {
        socket.off('notification');
    }*/
    }, [Dispatch,userId])
    return (
        <div className="min-h-screen bg-white py-6">
        <div className="max-w-4xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold text-gray-800">
              Notifications
            </h1>
            <Bell className="h-6 w-6 text-gray-600 " />
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {notification && notification.length > 0 ? (
                notification.map((notify) => (
                  <li
                    key={notify._id}
                    className="px-2 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      {notify.profile_photo ? (
                        <img
                          className="h-10 w-10 rounded-full"
                          src="https://img.daisyui.com/images/profile/demo/1@94.webp" // Replace with actual profile photo URL if available
                          alt="Profile"
                        />
                      ) : (
                        <User className="h-10 w-10 rounded-full text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-600 p-1" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 line-clamp-2">
                          {notify.message}
                        </p>
                        <time
                          dateTime={notify.createdAt.toString()}
                          className="block text-xs text-gray-500 dark:text-gray-400"
                        >
                          {new Date(notify.createdAt).toLocaleString()}
                        </time>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="px-4 py-4 text-center text-gray-500 dark:text-gray-400">
                  {"You don't have any notifications yet"}
                </li>
              )}
            </ul>
          </div>
        </div>
        </div>
    );
};

export default Notification;