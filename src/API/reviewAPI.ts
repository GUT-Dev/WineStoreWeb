import {APIPath, headerWithToken} from "./rootAPI";
import axios from "axios";

const rootPath = APIPath + "/review";

export const getReviewsForWine = async (id: bigint) => {
    return await axios.get(rootPath + "?wineId=" + id)
        .then(r => r.data)
}

export const addReViewForWine = async (requestData: {wineId: bigint, message: string, rating: number}, token: string) => {
    return await axios.post(rootPath + "/add", requestData, headerWithToken(token))
        .then(r => r.data)
}