import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useGroupChatStore } from "../store/useGroupChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, MessageSquare, Plus } from "lucide-react"; // Added Plus icon for create button

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { getGroups, groups, selectedGroup, setSelectedGroup, isGroupsLoading, createGroup } = useGroupChatStore();
  const { onlineUsers } = useAuthStore();

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [showGroups, setShowGroups] = useState(false);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false); // State for modal visibility
  const [groupName, setGroupName] = useState(""); // State for group name input

  useEffect(() => {
    getUsers();
    getGroups();
  }, [getUsers, getGroups]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  const displayItems = showGroups ? groups : filteredUsers;
  const isLoading = showGroups ? isGroupsLoading : isUsersLoading;

  // Handle group creation
  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      toast.error("Group name is required");
      return;
    }
    try {
      await createGroup({ name: groupName });
      setShowCreateGroupModal(false);
      setGroupName("");
    } catch (error) {
      // Error handling is already managed in createGroup via toast
    }
  };

  if (isLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          {showGroups ? <MessageSquare className="size-6" /> : <Users className="size-6" />}
          <span className="font-medium hidden lg:block">{showGroups ? "Groups" : "Contacts"}</span>
        </div>
        <div className="mt-3 hidden lg:flex items-center gap-2 flex-wrap">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showGroups}
              onChange={(e) => setShowGroups(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show groups</span>
          </label>
          {!showGroups && (
            <label className="cursor-pointer flex items-center gap-2">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="checkbox checkbox-sm"
              />
              <span className="text-sm">Show online only</span>
            </label>
          )}
          <span className="text-xs text-zinc-500">
            {showGroups ? `(${groups.length} groups)` : `(${onlineUsers.length - 1} online)`}
          </span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {/* Create Group Button - Visible only when showing groups */}
        {showGroups && (
          <div className="px-3 pb-2">
            <button
              onClick={() => setShowCreateGroupModal(true)}
              className="w-full flex items-center gap-2 p-2 bg-base-300 rounded-lg hover:bg-base-400 transition-colors"
            >
              <Plus className="size-5" />
              <span className="text-sm hidden lg:block">Create Group</span>
            </button>
          </div>
        )}

        {displayItems.map((item) => (
          <button
            key={item._id}
            onClick={() => {
              showGroups ? setSelectedGroup(item) : setSelectedUser(item);
            }}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${
                (showGroups && selectedGroup?._id === item._id) ||
                (!showGroups && selectedUser?._id === item._id)
                  ? "bg-base-300 ring-1 ring-base-300"
                  : ""
              }
            `}
          >
            <div className="relative">
              <img
                src={item.profilePic || (showGroups ? "/group-avatar.png" : "/avatar.png")}
                alt={showGroups ? item.name : item.fullName}
                className="size-12 object-cover rounded-full"
              />
              {!showGroups && onlineUsers.includes(item._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="font-medium truncate">{showGroups ? item.name : item.fullName}</div>
              <div className="text-sm text-zinc-400">
                {showGroups ? "Group" : onlineUsers.includes(item._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {displayItems.length === 0 && (
          <div className="text-center text-zinc-500 py-4">
            {showGroups ? "No groups available" : "No online users"}
          </div>
        )}
      </div>

      {/* Create Group Modal */}
      {showCreateGroupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-base-200 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-lg font-medium mb-4">Create New Group</h2>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter group name"
              className="input input-bordered w-full mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowCreateGroupModal(false)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateGroup}
                className="btn btn-primary"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;