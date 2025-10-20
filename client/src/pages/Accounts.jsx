import { PlusIcon } from "lucide-react";
import AccountTableView from "../components/accounts/AccountTableView";

import { useEffect, useState } from "react";
import AccountForm from "../components/accounts/AccountForm";

import {
  handleCreateAndEdit,
  handleDeleteModal,
} from "../redux/Account/Account";

import { useDispatch, useSelector } from "react-redux";
import { getAccounts } from "../apicalls/account";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [getNewData, setGetNewData] = useState(false);

  // REDUX STATES
  const { createAndEditForm, deleteModal, editingAccount, deletingAccount } =
    useSelector((state) => state.account);

  const dispatch = useDispatch();

  const [searchParam, setSearchParam] = useState("");

  const filteredAccounts = accounts.filter(
    (account) =>
      account.account_name.toLowerCase().includes(searchParam.toLowerCase()) ||
      account.account_number.toLowerCase().includes(searchParam.toLowerCase())
  );

  useEffect(() => {
    const getAccountsData = async () => {
      const response = await getAccounts();
      if (response.success) setAccounts(response.accounts);
    };
    getAccountsData();
  }, [getNewData]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-gray-800 tracking-tight">
          Accounts
        </h2>

        <button
          onClick={() => dispatch(handleCreateAndEdit())}
          className="flex items-center justify-center gap-2 rounded-lg bg-black text-white px-4 py-2 w-full sm:w-auto text-sm sm:text-base transition-colors hover:bg-gray-900"
        >
          <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Create Account</span>
        </button>
      </div>

      {/* Conditional Form */}
      {(createAndEditForm || editingAccount) && (
        // <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <AccountForm getNewData={getNewData} setGetNewData={setGetNewData} />
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

      {/* Accounts Table */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-x-auto">
        <AccountTableView accounts={filteredAccounts} />
      </div>

      {/* Delete / Edit Modals */}
      {deletingAccount && (
        <DeleteConfirmationModal
          title={"Account"}
          modalState={deleteModal}
          object={deletingAccount}
          onCancel={() => dispatch(handleDeleteModal(false))}
          name={deletingAccount.fullname}
          getNewData={getNewData}
          setGetNewData={setGetNewData}
        />
      )}
    </div>
  );
};

export default Accounts;
