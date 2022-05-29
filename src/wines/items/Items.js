import './Items.css';
import Item from "./item/Item";
import {useEffect, useState} from "react";
import axios from "axios";
import Pagination from "../../common/Pagination";

const BASE_PATH = "http://localhost:8080"
const ELEMENT_PATH = BASE_PATH + "/wine"

export default ({filters}) => {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [sort, setSort] = useState("id,desc");
    const [offset, setOffset] = useState(15);
    const [pageInfo, setPageInfo] = useState({
        totalPages: null,
        totalElements: null,
        currentPage: null,
    });

    useEffect(
        () => {
            axios.get(ELEMENT_PATH + filters + "&page=" + currentPage + "&size=" + offset + "&sort=" + sort)
                .then(
                    (result) => {
                        setItems(result.data.content);
                        setPageInfo({
                            totalPages: result.data.totalPages,
                            totalElements: result.data.totalElements,
                            currentPage: result.data.number
                        })
                    },
                    (error) => {
                        console.log("error")
                    }
                )
        }
        , [filters, sort, currentPage]
    );

    return (
        <div className="items-block">
            <div className="items-header">
                <p>Знайдено товарів: {pageInfo.totalElements}</p>
                <div>
                    Сортування по:
                    <select value={sort} onChange={(event) => setSort(event.target.value)}>
                        <option selected value="id,desc">Новинки</option>
                        <option value="price,asc">Ціна: за зростанням</option>
                        <option value="price,desc">Ціна: по спаданню</option>
                        <option value="soldAmount,asc">Популярність: за зростанням</option>
                        <option value="soldAmount,desc">Популярність: по спаданню</option>
                    </select>
                </div>
            </div>
            <div className="items">
                {items.map(item =>
                    <Item item={item} key={item.id}/>
                )}
            </div>
            <Pagination pageInfo={pageInfo} setPage={setCurrentPage}/>
        </div>
    );
};