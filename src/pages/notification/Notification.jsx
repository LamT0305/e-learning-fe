import React, { useEffect } from "react";
import img from "../../assets/avt.jpg";
import useNotification from "../../redux/hooks/useNotification";

function Notification() {
  const { isLoading, notifications, handleGetNotifications, handleDeleteNoti } =
    useNotification();

  useEffect(() => {
    handleGetNotifications();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-indigo-300 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">
            Notifications
            <span className="ml-2 text-indigo-200">
              ({notifications.length})
            </span>
          </h1>
        </div>
        <ul className="divide-y divide-gray-100 max-h-[70vh] overflow-y-auto">
          {notifications.map((noti) => (
            <li
              key={noti._id}
              className={`p-5 hover:bg-gray-50 transition-all duration-200 ${
                !noti.isRead ? "bg-indigo-50" : ""
              }`}
            >
              <div className="flex items-start">
                <img
                  src={img}
                  alt="Profile"
                  className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-indigo-100"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-800">
                      {noti.title}
                    </h4>
                    <span className="text-xs text-gray-400">
                      {new Date(noti.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-1">{noti.message}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(noti.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteNoti(noti._id)}
                  className="text-gray-400 hover:text-red-500 transition-colors duration-200 ml-4"
                  aria-label="Delete notification"
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Notification;
