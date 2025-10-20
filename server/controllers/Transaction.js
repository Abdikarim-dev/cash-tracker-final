const Transaction = require("../models/Transaction")

const getTransactions = async (_, res) => {
    try {
        const transactions = await Transaction.findAll()


        res.status(200).json({
            success: true,
            message: "all the Transactions ",
            transactions
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "error in the read Transactions",
            error: error.message
        })
    }

}

const createTransaction = async (req, res) => {
    try {
        const { type, account, amount, description, date } = req.body;

        if (!type || !account || !amount)
            return res.status(404).json({
                message: "All Fields are required!",
                success: false
            });

        const newTransaction = await Transaction.create({ type, account, amount, description, date, userId: req.user.id });

        res.status(201).json({
            success: true,
            message: "Transaction Created Successfully",
            data: newTransaction,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error happened at creating new Transaction",
            error,
            errorMessage: error.message,
        });
    }
}
const updateTransaction = async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        const { type, account, amount, description, date } = req.body;

        const transaction = await Transaction.findByPk(id)

        if (!transaction) return res.status(404).json({ success: false, message: "Account not found " })

        const updateTransaction = await Transaction.update({ type, account, amount, description, date }, {
            where: { id }
        });
        res.status(201).json({
            success: true,
            message: "Transaction Updated Successfully",
            data: updateTransaction,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error happened at updating new Transaction",
            error,
            errorMessage: error.message,
        });
    }
}
const deleteTransaction = async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        const transaction = await Transaction.findByPk(id)

        if (!transaction) return res.status(404).json({ success: false, message: "Transaction not found" })

        const deletedTransaction = await Transaction.destroy({ where: { id } })

        res.status(200).json({
            success: true,
            message: "Transaction has been deleted",
            data: deletedTransaction
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "error in the delete Transaction",
            error: error.message
        })

    }
}

module.exports = {
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction
}