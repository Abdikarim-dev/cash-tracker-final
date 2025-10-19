import { PlusIcon } from "lucide-react";
import UserTableView from "../components/UserTableView";

import { useEffect, useState } from "react";
import UserForm from "../components/UserForm";

import { handleCreateAndEdit, handleDeleteModal } from "../redux/User/User";

import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../apicalls/user";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [getNewData, setGetNewData] = useState(false);

  // REDUX STATES
  const { createAndEditForm, deleteModal, editingUser, deletingUser } =
    useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [searchParam, setSearchParam] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.fullname.toLowerCase().includes(searchParam.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchParam.toLowerCase())
  );

  useEffect(() => {
    const getUsersData = async () => {
      const response = await getUsers();
      if (response.success) setUsers(response.users);
    };
    getUsersData();
  }, [getNewData]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-3xl font-poppins font-bold text-gray-800 tracking-tight">
          Users
        </h2>
        <button onClick={() => dispatch(handleCreateAndEdit())} className="flex items-center gap-0.5 rounded bg-black text-white px-4 py-2 cursor-pointer " > <PlusIcon className={"mr-2"} /> Create User </button>
      </div>

      {/* Conditional Form */}
      {(createAndEditForm || editingUser) && (
        // <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <UserForm getNewData={getNewData} setGetNewData={setGetNewData} />
        // </div>
      )}

      {/* Search */}
      <div className="max-w-md">
        <input
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
          type="text"
          name="name"
          placeholder="Search by Name or Phone..."
          className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
        />
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-x-auto">
        <UserTableView users={filteredUsers} />
      </div>

      {/* Delete / Edit Modals */}
      {/* Uncomment when needed */}
      {deletingUser && (
    <DeleteConfirmationModal
      title={"user"}
      modalState={deleteModal}
      object={deletingUser}
      onCancel={() => dispatch(handleDeleteModal(false))}
      name={deletingUser.fullname}
      getNewData={getNewData}
      setGetNewData={setGetNewData}
    />
  )}
    </div>
  );
};

export default Users;
