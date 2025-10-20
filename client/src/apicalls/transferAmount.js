import axios from "axios"
import { BASE_URL } from "./index"

export const getTransferAmounts = async () => {
    try {
        const response = await axios.get(BASE_URL + "/transfer/read", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const addTransferAmount = async (transferAmount) => {
    try {
        const response = await axios.post(BASE_URL + "/transfer/create", transferAmount, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const editTransferAmount = async (payload) => {
    try {
        const response = await axios.patch(BASE_URL + `/transfer/update/${payload.id}`, payload.transferAmount, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

// addTransferAmount
// editTransferAmount
// getTransferAmounts
// deleteTransferAmount