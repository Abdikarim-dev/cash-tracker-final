import axios from "axios"
import { BASE_URL } from "./index"
export const loginUser = async (payload) => {
    try {
        const response = await axios.post(BASE_URL + "/auth/login", payload);
        return response?.data
    } catch (error) {
        return error?.response?.data
    }
}