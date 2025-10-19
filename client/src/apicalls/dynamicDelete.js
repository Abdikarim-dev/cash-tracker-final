import axios from "axios";
import { BASE_URL } from ".";

const deleteObject = async (payload) => {
    try {
        const response = await axios.delete(BASE_URL + `/${payload.title}/delete/${payload.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export default deleteObject



// http://localhost:4004/api/?/delete/?