import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addAccount, editAccount } from "../../apicalls/Account";
import { onCancel } from "../../redux/Account/Account";

const AccountForm = ({ getNewData, setGetNewData }) => {
  const dispatch = useDispatch();

  const { editingAccount: account } = useSelector((state) => state.account);

  const [account_name, setAccountname] = useState(account?.account_name || "");
  const [account_number, setAccountNumber] = useState(account?.account_number || "");
  const [account_type, setAccountType] = useState(account?.account_type || "");
  const [balance, setBalance] = useState(account?.balance || "");


  const handleSubmit = async (event) => {
    event.preventDefault();

    const accountInfo = { account_name, account_number, account_type, balance };

    if (account) {
      const updateObj = {
        id: account.id,
        account: accountInfo,
      };
      const response = await editAccount(updateObj);

      if (response.success) {
        setGetNewData(!getNewData);
        toast.success(response.message);
        dispatch(onCancel());
      } else {
        toast.error(response.message);
      }
    } else {


      const response = await addAccount(accountInfo);

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
        {account ? "Edit Account" : "Create Account"}
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
              Account Name
            </label>
            <input
              value={account_name}
              onChange={(e) => setAccountname(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
              type="text"
              name="name"
              required
            />
          </div>

          {/* Accountname */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Account Number
            </label>
            <input
              value={account_number}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
              type="text"
              name="account_number"
              required
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Account Type
            </label>
            <input
              value={account_type}
              onChange={(e) => setAccountType(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
              type="text"
              name="account_type"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Balance
            </label>
            <input
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
              type="number"
              name="balance"
              required
            />
          </div>
        </div>

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
            {account ? "Update Account" : "Create Account"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountForm;
