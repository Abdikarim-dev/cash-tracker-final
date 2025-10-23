const Account = require("../models/Account")
const Audit = require("../models/Audit")
const Transaction = require("../models/Transaction")
const generateCustomId = require("../utils/generateCustomId")

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
        console.log(req.body)
        const { type, accountId, amount, description, date } = req.body;

        amount = Number(amount)

        if (!type || !accountId || !amount)
            return res.status(404).json({
                message: "All Fields are required!",
                success: false
            });

        const accountInfo = await Account.findOne({ where: { id: accountId } })


        if (!["CREDIT", "DEBIT"].includes(type.toUpperCase())) {
            return res.status(400).json({
                success: false,
                message: "Type must be either CREDIT or DEBIT.",
            });
        }

        if (amount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Amount must be a positive number.",
            });
        }

        // Find account
        const account = await Account.findByPk(accountId);
        if (!account) {
            return res.status(404).json({
                success: false,
                message: "Account not found.",
            });
        }

        // Handle balance update
        let newBalance = account.balance;

        if (type.toUpperCase() === "CREDIT") {
            newBalance += amount;
        } else if (type.toUpperCase() === "DEBIT") {
            if (account.balance < amount) {
                return res.status(400).json({
                    success: false,
                    message: "Insufficient balance for debit transaction.",
                });
            }
            newBalance -= amount;
        }

        // Update account balance
        const newBal = await account.update({ balance: newBalance });

        const newTransaction = await Transaction.create({ type, account: accountId, amount, description, date, userId: req.user.id });

        const auditId = await generateCustomId("AUD");
        const txnId = await generateCustomId("TXN");
        await Audit.create({
            id: auditId,
            action: "CREATE",
            tableName: "Transactions",
            recordId: txnId,
            description: `Created transaction Account:${accountInfo.account_name}, Amount:${amount ? amount : 0}`,
            userId: req.user.id,
        });

        res.status(201).json({
            success: true,
            message: "Transaction Created Successfully",
            newBal,
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

        const { type, accountId, amount, description, date } = req.body;

        const transaction = await Transaction.findByPk(id)


        if (!transaction) return res.status(404).json({ success: false, message: "Transaction not found " })


        const oldAccountInfo = await Account.findByPk(transaction.account)
        const newAccountInfo = await Account.findByPk(accountId)

        const updateTransaction = await Transaction.update({ type, account: accountId, amount, description, date }, {
            where: { id }
        });
        // 4️⃣ Optional: adjust balances if needed
        if (oldAccountInfo && newAccountInfo) {
            // If account changed
            if (oldAccountInfo.id !== newAccountInfo.id) {
                // Revert old account balance
                oldAccountInfo.balance +=
                    transaction.type === "DEBIT" ? Number(transaction.amount) : -Number(transaction.amount);
                await oldAccountInfo.save();

                // Apply to new account
                newAccountInfo.balance += type === "DEBIT" ? -Number(amount) : Number(amount);
                await newAccountInfo.save();
            } else if (Number(amount) !== Number(transaction.amount)) {
                // Adjust same account balance difference
                const diff = Number(amount) - Number(transaction.amount);
                newAccountInfo.balance += type === "DEBIT" ? -diff : diff;
                await newAccountInfo.save();
            }
            else if (type !== transaction.type) {
                // Type changed (e.g. DEBIT → CREDIT or CREDIT → DEBIT)
                if (type === "DEBIT") {
                    // New type is DEBIT → revert old CREDIT and apply DEBIT
                    newAccountInfo.balance -= Number(amount) * 2;
                } else {
                    // New type is CREDIT → revert old DEBIT and apply CREDIT
                    newAccountInfo.balance += Number(amount) * 2;
                }
                await newAccountInfo.save();
            }
        }

        const auditId = await generateCustomId("AUD");
        const txnId = await generateCustomId("TXN");
        await Audit.create({
            id: auditId,
            action: "UPDATE",
            tableName: "Transactions",
            recordId: txnId,
            description: `Updated transaction Account:${newAccountInfo ? newAccountInfo.account_name : oldAccountInfo.account_name}, Amount:${amount ? amount : transaction.amount}`,
            userId: req.user.id,
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

        const auditId = await generateCustomId("AUD");
        await Audit.create({
            id: auditId,
            action: "DELETE",
            tableName: "Transactions",
            recordId: transaction.id,
            description: `Deleted transaction "${transaction.id}"`,
            userId: req.user.id,
        });


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