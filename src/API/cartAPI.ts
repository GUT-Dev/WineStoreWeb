import {APIPath, headerWithToken} from "./rootAPI";
import axios from "axios";

const rootPath = APIPath + "/cart";

export const getCart = async () => {
    return await axios.get(rootPath)
        .then(r => r.data)
}

export const putInCart = async (id: bigint, amount: number, token: string) => {
    const requestData = {
        wineId: id,
        amount: amount
    }

    return await axios.put(rootPath, requestData, headerWithToken(token))
        .then(r => r.data)
}