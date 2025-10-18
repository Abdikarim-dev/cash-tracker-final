const { Op } = require("sequelize")
const Users = require("../models/User")

const bcrypt = require("bcrypt")

const getUsers = async (_, res) => {
    try {
        const users = await Users.findAll()


        res.status(200).json({
            success: true,
            message: "all the users ",
            users
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "error in the delete user",
            error: error.message
        })
    }
}
const createUser = async (req, res) => {
    try {
        const { fullname, username, phone, email, role, password } = req.body;

        if (!fullname || !username || !phone || !email || !password)
            return res.status(404).json({
                message: "All Fields are required!",
                success: false
            });

        // checking availability of username, phone and email
        const checkForUserOrPhoneOrEmail = await Users.findOne({
            where: {
                [Op.or]: [{ username }, { phone }, { email }],
            },
        });

        if (
            checkForUserOrPhoneOrEmail &&
            checkForUserOrPhoneOrEmail.username === username
        )
            return res.status(404).json({ success: false, message: "Username Already exists" });
        if (
            checkForUserOrPhoneOrEmail &&
            checkForUserOrPhoneOrEmail.phone === phone
        )
            return res.status(404).json({ success: false, message: "Phone Already exists" });
        if (
            checkForUserOrPhoneOrEmail &&
            checkForUserOrPhoneOrEmail.email === email
        )
            return res.status(404).json({ success: false, message: "Email Already exists" });

        //   Hashing the password (bcrypt)

        const hashedPassword = await bcrypt.hash(password, 10);

        // Image uploading technique
        const imagePath = req.file ? req.file.filename : undefined

        const newUser = await Users.create({
            fullname,
            username,
            phone,
            email,
            role,
            image: imagePath,
            password: hashedPassword,
        });

        res.status(201).json({
            success: true,
            message: "User Created Successfully",
            data: newUser,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error happened at creating new user",
            error,
            errorMessage: error.message,
        });
    }
}
const updateUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        const { fullname, username, phone, email, role } = req.body;

        const user = await Users.findByPk(id)

        if (!user) return res.status(404).json({ success: false, message: "User not found " })

        const imagePath = req.file ? req.file.filename : undefined

        const updatedUser = await Users.update({
            fullname: fullname,
            username: username,
            phone: phone,
            email: email,
            image: imagePath,
            role: role,
        },
            {
                where: { id }
            }
        );
        res.status(200).json({
            success: true,
            message: "a user has been updated successfully ",
            data: updatedUser,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "error in the update user",
            error: error.message,
        });
    }
}
const deleteUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        const user = await Users.findByPk(id)

        if (!user) return res.status(404).json({ success: false, message: "user not found" })

        const deletedUser = await Users.destroy({ where: { id } })

        res.status(200).json({
            success: true,
            message: "a user has been deleted",
            data: deletedUser
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "error in the delete user",
            error: error.message
        })

    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}