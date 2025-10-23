import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction, editTransaction } from "../../apicalls/transaction";
import { onCancel } from "../../redux/Transaction/Transaction";
import { getAccounts } from "../../apicalls/Account";

const TransactionForm = ({ getNewData, setGetNewData }) => {
  const dispatch = useDispatch();

  const { editingTransaction: transaction } = useSelector(
    (state) => state.transaction
  );

  const [account, setAccount] = useState(transaction?.account || "");
  const [type, setType] = useState(transaction?.type || "");
  const [amount, setAmount] = useState(transaction?.amount || "");
  const [description, setDescription] = useState(
    transaction?.description || ""
  );

  const [currentItem, setCurrentItem] = useState(null);
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

    const transactionInfo = {
      accountId: Number(account),
      description,
      type,
      amount: Number(amount),
    };

    if (transaction) {
      const updateObj = {
        id: transaction.id,
        transaction: transactionInfo,
      };
      const response = await editTransaction(updateObj);

      if (response.success) {
        setGetNewData(!getNewData);
        toast.success(response.message);
        dispatch(onCancel());
      } else {
        toast.error(response.message);
      }
    } else {
      const response = await addTransaction(transactionInfo);

      if (response.success) {
        setGetNewData(!getNewData);
        toast.success(response.message);
        dispatch(onCancel());
      } else {
        toast.error(response.message);
      }
    }
  };

  const handleAcc = (e) => {
    const selectedId = e.target.value;
    setAccount(selectedId);
    const findAcc = accounts.find((acc) => acc.id == selectedId);
    setCurrentItem(findAcc);
  };
  return (
    <div className="mx-auto bg-white shadow-md rounded-2xl p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2">
        {transaction ? "Edit Transaction" : "Create Transaction"}
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
              Account
            </label>
            <select
              value={account}
              name="acc"
              className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
              onChange={handleAcc}
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

          {/* Balance */}
          {currentItem && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Balance
              </label>
              <input
                value={currentItem && currentItem.balance}
                className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
                type="number"
                name="blnc"
                readOnly
              />
            </div>
          )}

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              value={type}
              name="type"
              className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a type
              </option>
              <option value="DEBIT">Debit</option>
              <option value="CREDIT">Credit</option>
            </select>
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
              type="text"
              name="amou"
              required
            />
          </div>

          {/* Desc */}
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
            {transaction ? "Update Transaction" : "Create Transaction"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
