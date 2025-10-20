import { PlusIcon } from "lucide-react";
import TransferAmountTableView from "../components/transferAmounts/TransferTableView";

import { useEffect, useState } from "react";
import TransferAmountForm from "../components/transferAmounts/TransferForm";

import {
  handleCreateAndEdit,
  handleDeleteModal,
} from "../redux/TransferAmount/TransferAmount";

import { useDispatch, useSelector } from "react-redux";
import { getTransferAmounts } from "../apicalls/transferAmount";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

const TransferAmounts = () => {
  const [transferAmounts, setTransferAmounts] = useState([]);
  const [getNewData, setGetNewData] = useState(false);

  // REDUX STATES
  const {
    createAndEditForm,
    deleteModal,
    editingTransferAmount,
    deletingTransferAmount,
  } = useSelector((state) => state.transferAmount);

  const dispatch = useDispatch();

  const [searchParam, setSearchParam] = useState("");

  // const filteredTransferAmounts = transferAmounts.filter(
  //   (TransferAmount) =>
  //     TransferAmount?.from_account.toLowerCase()
  //       .includes(searchParam.toLowerCase()) ||
  //     TransferAmount?.to_account.toLowerCase()
  //       .includes(searchParam.toLowerCase())
  // );

  useEffect(() => {
    const getTransferAmountsData = async () => {
      const response = await getTransferAmounts();
      if (response.success) setTransferAmounts(response.transferAmounts);
    };
    getTransferAmountsData();
  }, [getNewData]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-gray-800 tracking-tight">
          TransferAmounts
        </h2>

        <button
          onClick={() => dispatch(handleCreateAndEdit())}
          className="flex items-center justify-center gap-2 rounded-lg bg-black text-white px-4 py-2 w-full sm:w-auto text-sm sm:text-base transition-colors hover:bg-gray-900"
        >
          <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Create TransferAmount</span>
        </button>
      </div>

      {/* Conditional Form */}
      {(createAndEditForm || editingTransferAmount) && (
        // <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <TransferAmountForm
          getNewData={getNewData}
          setGetNewData={setGetNewData}
        />
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

      {/* TransferAmounts Table */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-x-auto">
        <TransferAmountTableView transfers={transferAmounts} />
      </div>

      {/* Delete / Edit Modals */}
      {deletingTransferAmount && (
        <DeleteConfirmationModal
          title={"TransferAmount"}
          modalState={deleteModal}
          object={deletingTransferAmount}
          onCancel={() => dispatch(handleDeleteModal(false))}
          name={deletingTransferAmount?.description}
          getNewData={getNewData}
          setGetNewData={setGetNewData}
        />
      )}
    </div>
  );
};

export default TransferAmounts;
