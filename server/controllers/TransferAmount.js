const TransferAmount = require("../models/TransferAmount")

const getTransfers = async (_, res) => {
    try {
        const transferAmounts = await TransferAmount.findAll()


        res.status(200).json({
            success: true,
            message: "all the transferAmounts ",
            transferAmounts
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "error in the read Transfers",
            error: error.message
        })
    }

}

const createTransfer = async (req, res) => {
    try {
        const { to_account, from_account, amount, description, date } = req.body;

        if (!to_account || !from_account || !amount)
            return res.status(404).json({
                message: "All Fields are required!",
                success: false
            });

        const newTransfer = await TransferAmount.create({ from_account, to_account, amount, description, date, userId: req.user.id });

        res.status(201).json({
            success: true,
            message: "new transfer Created Successfully",
            data: newTransfer,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error happened at creating new transfer controller",
            error,
            errorMessage: error.message,
        });
    }
}
const updateTransfer = async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        const { to_account, from_account, amount, description, date } = req.body;

        const transfer = await TransferAmount.findByPk(id)

        if (!transfer) return res.status(404).json({ success: false, message: "Account not found " })

        const updateTransfer = await TransferAmount.update({ from_account, to_account, amount, description, date }, {
            where: { id }
        });
        res.status(201).json({
            success: true,
            message: "Transfer Updated Successfully",
            data: updateTransfer,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error happened at updating new Transfer controller",
            error,
            errorMessage: error.message,
        });
    }
}
const deleteTransfer = async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        const transfer = await TransferAmount.findByPk(id)

        if (!transfer) return res.status(404).json({ success: false, message: "Transfer not found" })

        const deletedTransfer = await TransferAmount.destroy({ where: { id } })

        res.status(200).json({
            success: true,
            message: "Transfer has been deleted",
            data: deletedTransfer
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "error in the delete Transfer controller",
            error: error.message
        })

    }
}

module.exports = {
    getTransfers,
    createTransfer,
    updateTransfer,
    deleteTransfer
}