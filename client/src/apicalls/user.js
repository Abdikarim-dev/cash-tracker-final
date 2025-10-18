import axios from "axios"
import { BASE_URL } from "./index"

export const getUsers = async () => {
    try {
        const response = await axios.get(BASE_URL + "/user/read", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const addUser = async (user) => {
    try {
        const response = await axios.post(BASE_URL + "/user/create", user, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const editUser = async (payload) => {
    try {
        const response = await axios.patch(BASE_URL + `/user/update/${payload.id}`, payload.user, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

// addUser
// editUser
// getUsers
// deleteUser