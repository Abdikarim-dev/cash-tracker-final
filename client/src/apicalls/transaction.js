import axios from "axios"
import { BASE_URL } from "./index"

export const getTransactions = async () => {
    try {
        const response = await axios.get(BASE_URL + "/transaction/read", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const addTransaction = async (transaction) => {
    try {
        const response = await axios.post(BASE_URL + "/transaction/create", transaction, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const editTransaction = async (payload) => {
    try {
        const response = await axios.patch(BASE_URL + `/transaction/update/${payload.id}`, payload.transaction, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

// addTransaction
// editTransaction
// getTransactions
// deleteTransaction