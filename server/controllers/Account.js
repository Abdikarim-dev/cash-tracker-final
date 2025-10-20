const Account = require("./../models/Account")

const getAccounts = async (_, res) => {
    try {
        const accounts = await Account.findAll()


        res.status(200).json({
            success: true,
            message: "all the accounts ",
            accounts
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "error in the read accounts",
            error: error.message
        })
    }

}

const createAccount = async (req, res) => {
    try {
        const { account_name, account_number, account_type, balance, date } = req.body;
        if (!account_name || !account_number || !account_type || !balance)
            return res.status(404).json({
                message: "All Fields are required!",
                success: false
            });

        // checking availability of Accountname, phone and email
        const checkForAccountNo = await Account.findOne({ where: { account_number } });

        if (checkForAccountNo) return res.status(404).json({ success: false, message: "Account Number Already exists" });

        const newAccount = await Account.create({
            account_name,
            account_number,
            account_type,
            balance,
            date,
            userId: req.user.id
        });

        res.status(201).json({
            success: true,
            message: "Account Created Successfully",
            data: newAccount,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error happened at creating new account!",
            error,
            errorMessage: error.message,
        });
    }
}
const updateAccount = async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        console.log(req.body)

        const { account_name, account_number, account_type, balance, date } = req.body;

        const account = await Account.findByPk(id)

        if (!account) return res.status(404).json({ success: false, message: "Account not found " })


        const updatedAccount = await Account.update({ account_name, account_number, account_type, balance, date, userId: req.user.id },
            {
                where: { id }
            }
        );
        res.status(200).json({
            success: true,
            message: "Account has been updated successfully ",
            data: updatedAccount,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "error in the update Account",
            error: error.message,
        });
    }
}
const deleteAccount = async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        const account = await Account.findByPk(id)

        if (!account) return res.status(404).json({ success: false, message: "Account not found" })

        const deletedAccount = await Account.destroy({ where: { id } })

        res.status(200).json({
            success: true,
            message: "Account has been deleted",
            data: deletedAccount
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "error in the delete Account",
            error: error.message
        })

    }
}

module.exports = {
    getAccounts,
    createAccount,
    updateAccount,
    deleteAccount
}