import React, { useEffect, useState } from "react";
import useAuth from "../redux/hooks/useAuth";

function Profile() {
  const { user, handleGetUser, handleUpdateUser, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    handleGetUser();
  }, []);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(user);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    const form = new FormData();
    form.append("name", formData.name);
    form.append("dateOfBirth", formData.dateOfBirth);
    form.append("address", formData.address);
    handleUpdateUser(form);
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }


  return (
    <div className="w-[80vw] mx-auto p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData?.name || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData?.email || ""}
            onChange={handleChange}
            disabled
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Role</label>
          <input
            type="text"
            name="role"
            value={formData?.role || ""}
            disabled
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={formData?.address || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={
              formData?.dateOfBirth
                ? new Date(formData.dateOfBirth).toISOString().split("T")[0]
                : ""
            }
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Created At</label>
          <input
            type="text"
            name="created_at"
            value={new Date(formData?.created_at).toLocaleString() || ""}
            disabled
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Updated At</label>
          <input
            type="text"
            name="updated_at"
            value={new Date(formData?.updated_at).toLocaleString() || ""}
            disabled
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Active</label>
          <input
            type="text"
            name="isActive"
            value={formData?.isActive ? "Yes" : "No"}
            disabled
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>
      <div className="flex justify-end mt-4">
        {isEditing ? (
          <>
            <div
              onClick={handleCancel}
              className="mr-2 px-4 py-2 bg-gray-200 rounded cursor-pointer"
            >
              Cancel
            </div>
            <div
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
            >
              Save
            </div>
          </>
        ) : (
          <div
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
          >
            Edit Profile
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
