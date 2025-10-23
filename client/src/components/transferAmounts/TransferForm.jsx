import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  addTransferAmount,
  editTransferAmount,
} from "../../apicalls/transferAmount";
import { onCancel } from "../../redux/TransferAmount/TransferAmount";
import { getAccounts } from "../../apicalls/Account";

const TransferAmountForm = ({ getNewData, setGetNewData }) => {
  const dispatch = useDispatch();

  const { editingTransferAmount: transferAmount } = useSelector(
    (state) => state.transferAmount
  );

  const [from_account, setFromAccount] = useState(
    transferAmount?.from_account || ""
  );
  const [to_account, setToAccount] = useState(transferAmount?.to_account || "");
  const [description, setDescription] = useState(
    transferAmount?.description || ""
  );
  const [amount, setAmount] = useState(transferAmount?.amount || "");

  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const getAccountsData = async () => {
      const response = await getAccounts();
      if (response.success) setAccounts(response.accounts);
    };
    getAccountsData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const transferAmountInfo = {
      from_account,
      to_account,
      description,
      amount,
    };

    if (transferAmount) {
      const updateObj = {
        id: transferAmount.id,
        transferAmount: transferAmountInfo,
      };
      const response = await editTransferAmount(updateObj);

      if (response.success) {
        setGetNewData(!getNewData);
        toast.success(response.message);
        dispatch(onCancel());
      } else {
        toast.error(response.message);
      }
    } else {
      const response = await addTransferAmount(transferAmountInfo);

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
        {transferAmount ? "Edit TransferAmount" : "Create TransferAmount"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
        encType="multipart/form-data"
      >
        {/* Form Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* FROM ACCOUNT */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              From Account
            </label>
            <select
              value={from_account}
              name="role"
              className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => setFromAccount(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Account
              </option>
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.account_name} ({acc.account_number})
                </option>
              ))}
            </select>
          </div>
          {/* TO ACCOUNT */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              To Account
            </label>
            <select
              value={to_account}
              name="role"
              className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => setToAccount(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Account
              </option>
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.account_name} ({acc.account_number})
                </option>
              ))}
            </select>
          </div>

          {/* DESC */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
              type="text"
              name="desc"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Balance
            </label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
              type="number"
              name="amou"
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
            {transferAmount ? "Update TransferAmount" : "Create TransferAmount"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransferAmountForm;
