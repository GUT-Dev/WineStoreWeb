import {APIPath} from "./rootAPI";
import axios from "axios";

const rootPath = APIPath + "/cart";

export const getCart = async () => {
    return await axios.get(rootPath)
        .then(r => r.data)
}

export const putInCart = async () => {
    return await axios.get(rootPath)
        .then(r => r.data)
}