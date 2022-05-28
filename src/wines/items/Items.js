import './Items.css';
import Item from "./item/Item";
import {useEffect, useState} from "react";
import axios from "axios";

const BASE_PATH = "http://localhost:8080"
const ELEMENT_PATH = BASE_PATH + "/wine"

export default ({filters}) => {
    let [items, setItems] = useState([]);
    let [totalElements, setTotalElements] = useState();
    let [sort, setSort] = useState("id,desc");
    useEffect(
        () => {
            axios.get(ELEMENT_PATH + filters + "&sort=" + sort)
                .then(
                    (result) => {
                        setItems(result.data.content);
                        setTotalElements(result.data.totalElements);
                    },
                    (error) => {
                        console.log("error")
                    }
                )
        }
        , [filters, sort]
    );

    return (
        <div className="items-block">
            <div className="items-header">
                <p>Знайдено товарів: {totalElements}</p>
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
        </div>
    );
};