import {APIPath} from "./rootAPI";
import axios from "axios";

const rootPath = APIPath + "/review";

export const getReviewsForWine = async ({id}: {id: bigint}) => {
    return await axios.get(rootPath + "?wineId=" + id)
        .then(r => r.data)
}