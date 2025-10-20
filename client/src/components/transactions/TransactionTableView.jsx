import { useDispatch } from "react-redux";
import {
  handleDeleteModal,
  handleDeletingTransaction,
  handleEditingTransaction,
} from "../../redux/Transaction/Transaction";
import { FaEdit, FaTrash } from "react-icons/fa";

const TransactionTableView = ({ transactions }) => {
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto py-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table Header */}
          <thead className="bg-gradient-to-r from-primary/30 to-primary/10">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Account
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions?.map((transaction, index) => (
              <tr
                key={transaction.id}
                className={`transition duration-200 ${
                  index % 2 === 0
                    ? "bg-white hover:bg-gray-100"
                    : "bg-gray-50 hover:bg-gray-200"
                }`}
              >
                {/* Transaction Name */}
                <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">
                  {transaction.account}
                </td>
                {/* Transaction Number */}
                <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">
                  {transaction.type}
                </td>
                {/* Transaction Type */}
                <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">
                  {transaction.amount}
                </td>
                {/* Balance */}
                <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">
                  {transaction.description}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                  {/* Edit Button */}
                  <button
                    onClick={() => dispatch(handleEditingTransaction(transaction))}
                    className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700 transition-colors duration-200 shadow-sm"
                    title="Edit User"
                  >
                    <FaEdit className="w-4 h-4" />
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => {
                      dispatch(handleDeletingTransaction(transaction));
                      dispatch(handleDeleteModal(true));
                    }}
                    className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 transition-colors duration-200 shadow-sm"
                    title="Delete User"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTableView;
