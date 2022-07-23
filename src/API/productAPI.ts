import {APIPath} from "./rootAPI";
import axios from "axios";

const rootPath = APIPath + "/wine";

export const getMaxPrice = async () => {
    return await axios.get(rootPath + "/max-price")
        .then(r => r.data);
}

export const getMinPrice = async () => {
    return await axios.get(rootPath + "/min-price")
        .then(r => r.data);
}

export const getWine = async (id: bigint) => {
    return await axios.get(rootPath + "/" + id)
        .then(r => r.data)
}

export const getWinesPage = async (filters: string) => {
    return await axios.get(rootPath + filters)
        .then(r => r.data)
}