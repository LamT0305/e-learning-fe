import React, { useEffect, useState, memo, useCallback } from "react";
import avt from "../../../assets/avt.jpg";
import useMessage from "../../../redux/hooks/useMessage";
import useUser from "../../../redux/hooks/useUser";

const SearchResult = memo(({ user, onSelect }) => (
  <div
    onClick={() => onSelect(user)}
    className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
  >
    <img
      src={avt}
      alt={user.name}
      className="w-8 h-8 rounded-full object-cover"
    />
    <span className="font-medium text-gray-700">{user.name}</span>
    <p className="font-medium text-gray-700">{`[${user.role}]`}</p>
  </div>
));

const ChatUser = memo(({ user, isActive, onClick }) => (
  <li
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
      isActive ? "bg-blue-50" : ""
    }`}
  >
    <div className="flex-shrink-0">
      <img
        src={avt}
        alt={user.name}
        className="w-12 h-12 rounded-full object-cover"
      />
    </div>
    <div className="flex-1 min-w-0">
      <div className="font-semibold text-gray-900">{user.name}</div>
      <div className="text-xs text-gray-500 truncate">{user.lastMessage}</div>
    </div>
  </li>
));

const ListUserMessage = memo(({ messageId, onUserSelect }) => {
  const { usersMessage, handleGetUsers } = useMessage();
  const { userList, searchResults, handleGetAllUsers, handleSearchUsers } =
    useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    handleGetUsers();
    handleGetAllUsers();
  }, []);

  useEffect(() => {
    if (usersMessage?.length > 0 && !messageId) {
      const firstUser = usersMessage[0];
      onUserSelect(firstUser.id, firstUser.name);
    }
  }, [usersMessage, messageId]);

  const handleChangeUsers = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearchUsers(value);
    setShowDropdown(true);
  };

  const handleSelectUser = (user) => {
    onUserSelect(user._id, user.name);
    setSearchTerm("");
    setShowDropdown(false);
  };

  return (
    <div className="w-[20%] h-full border-r border-gray-200 bg-white">
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleChangeUsers}
            placeholder="Search users..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {showDropdown && searchTerm && (
            <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto z-50">
              {searchResults?.map((user) => (
                <SearchResult
                  key={user._id}
                  user={user}
                  onSelect={handleSelectUser}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="px-4 py-2 text-lg font-semibold text-gray-700">Chats</h3>
        <ul className="space-y-2">
          {usersMessage?.map((user) => (
            <ChatUser
              key={user.id}
              user={user}
              isActive={user.id === messageId}
              onClick={() => onUserSelect(user.id, user.name)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
});

export default ListUserMessage;
