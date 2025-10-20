import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  addTransferAmount,
  editTransferAmount,
} from "../../apicalls/transaction";
import { onCancel } from "../../redux/TransferAmount/TransferAmount";

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
        TransferAmount: transferAmountInfo,
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
        {TransferAmount ? "Edit TransferAmount" : "Create TransferAmount"}
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
              TransferAmount Name
            </label>
            <input
              value={TransferAmount_name}
              onChange={(e) => setTransferAmountname(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
              type="text"
              name="name"
              required
            />
          </div>

          {/* TransferAmountname */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              TransferAmount Number
            </label>
            <input
              value={TransferAmount_number}
              onChange={(e) => setTransferAmountNumber(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
              type="text"
              name="TransferAmount_number"
              required
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              TransferAmount Type
            </label>
            <input
              value={TransferAmount_type}
              onChange={(e) => setTransferAmountType(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
              type="text"
              name="TransferAmount_type"
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
            {TransferAmount ? "Update TransferAmount" : "Create TransferAmount"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransferAmountForm;
