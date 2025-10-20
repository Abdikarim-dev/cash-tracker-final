import { PlusIcon } from "lucide-react";
import TransactionTableView from "../components/transactions/TransactionTableView";

import { useEffect, useState } from "react";
import TransactionForm from "../components/transactions/TransactionForm";

import {
  handleCreateAndEdit,
  handleDeleteModal,
} from "../redux/Transaction/Transaction";

import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../apicalls/transaction";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [getNewData, setGetNewData] = useState(false);

  // REDUX STATES
  const { createAndEditForm, deleteModal, editingTransaction, deletingTransaction } =
    useSelector((state) => state.transaction);

  const dispatch = useDispatch();

  const [searchParam, setSearchParam] = useState("");

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.type.toLowerCase().includes(searchParam.toLowerCase()) 
      // Transaction.Transaction_number.toLowerCase().includes(searchParam.toLowerCase())
  );

  useEffect(() => {
    const getTransactionsData = async () => {
      const response = await getTransactions();
      if (response.success) setTransactions(response.transactions);
    };
    getTransactionsData();
  }, [getNewData]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-gray-800 tracking-tight">
          Transactions
        </h2>

        <button
          onClick={() => dispatch(handleCreateAndEdit())}
          className="flex items-center justify-center gap-2 rounded-lg bg-black text-white px-4 py-2 w-full sm:w-auto text-sm sm:text-base transition-colors hover:bg-gray-900"
        >
          <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Create Transaction</span>
        </button>
      </div>

      {/* Conditional Form */}
      {(createAndEditForm || editingTransaction) && (
        // <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <TransactionForm getNewData={getNewData} setGetNewData={setGetNewData} />
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

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-x-auto">
        <TransactionTableView transactions={filteredTransactions} />
      </div>

      {/* Delete / Edit Modals */}
      {deletingTransaction && (
        <DeleteConfirmationModal
          title={"transaction"}
          modalState={deleteModal}
          object={deletingTransaction}
          onCancel={() => dispatch(handleDeleteModal(false))}
          name={deletingTransaction?.description}
          getNewData={getNewData}
          setGetNewData={setGetNewData}
        />
      )}
    </div>
  );
};

export default Transactions;
