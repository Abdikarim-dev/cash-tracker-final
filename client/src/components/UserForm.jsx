import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addUser, editUser } from "../apicalls/user";
import { onCancel } from "../redux/User/User";

const UserForm = ({ getNewData, setGetNewData }) => {
  const dispatch = useDispatch();

  const { editingUser: user } = useSelector((state) => state.user);

  const [changePass, setChangePass] = useState(false);
  const [username, setUsername] = useState(user?.username || "");
  const [name, setName] = useState(user?.fullname || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [image, setImage] = useState(user?.image || "");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [role, setRole] = useState(user?.role || "");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // const userInfo = { username, fullname: name, email, phone, image, role };

    const userFormData = new FormData();

    userFormData.append("fullname", name);
    userFormData.append("username", username);
    userFormData.append("email", email);
    userFormData.append("phone", phone);
    userFormData.append("role", role);
    if (image instanceof File) userFormData.append("image", image);

    if (user) {
      const updateObj = {
        id: user.id,
        user: userFormData,
      };
      const response = await editUser(updateObj);

      if (response.success) {
        setGetNewData(!getNewData);
        toast.success(response.message);
        dispatch(onCancel());
      } else {
        toast.error(response.message);
      }
    } else {
      // Password here
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      if (password.length < 6 || password.length > 20) {
        toast.error("Password must be between 6 and 20 characters");
        return;
      }

      userFormData.append("password", password);

      const response = await addUser(userFormData);

      if (response.success) {
        setGetNewData(!getNewData);
        toast.success(response.message);
        dispatch(onCancel());
      } else {
        toast.error(response.message);
      }
    }
  };
  return (
    <div className="mx-auto bg-white shadow-md rounded-2xl p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2">
        {user ? "Edit User" : "Create User"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
        encType="multipart/form-data"
      >
        {/* Form Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
              type="text"
              name="name"
              required
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
              type="text"
              name="username"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
              type="email"
              name="email"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
              type="tel"
              name="phone"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              value={role}
              name="role"
              className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a role
              </option>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Profile Image
            </label>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
              type="file"
              name="image"
            />
          </div>
        </div>

        {/* Image Preview Section */}
        {image && (
          <div className="flex justify-center">
            <div className="relative w-48 h-48 rounded-xl overflow-hidden border-2 border-indigo-200 bg-gray-50 shadow-md">
              <img
                src={
                  image instanceof File
                    ? URL.createObjectURL(image)
                    : image
                    ? `${import.meta.env.VITE_BACKEND_URL}/upload/${image}`
                    : "/placeholder.svg"
                }
                alt="User profile preview"
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        )}

        {/* Password Section */}
        {(!user || changePass) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
                type="password"
                name="password"
                placeholder="********"
                required={user ? !changePass : true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
                type="password"
                name="confirm-password"
                placeholder="********"
                required={!changePass}
              />
            </div>
          </div>
        )}

        {/* Change Password Link */}
        {user && (
          <div className="text-sm text-gray-600">
            I{changePass ? " don't" : ""} want to change my password —{" "}
            <span
              className="text-indigo-600 cursor-pointer hover:underline"
              onClick={() => {
                setChangePass(!changePass);
                setPassword("");
                setConfirmPassword("");
              }}
            >
              Click here
            </span>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => dispatch(onCancel())}
            className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            {user ? "Update User" : "Create User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
