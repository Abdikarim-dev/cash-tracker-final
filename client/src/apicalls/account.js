import axios from "axios"
import { BASE_URL } from "./index"

export const getAccounts = async () => {
    try {
        const response = await axios.get(BASE_URL + "/account/read", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const addAccount = async (account) => {
    try {
        const response = await axios.post(BASE_URL + "/account/create", account, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const editAccount = async (payload) => {
    try {
        const response = await axios.patch(BASE_URL + `/account/update/${payload.id}`, payload.account, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

// addAccount
// editAccount
// getAccounts
// deleteAccount