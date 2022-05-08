import './Items.css';
import Item from "./item/Item";
import {useEffect, useState} from "react";
import axios from "axios";

const BASE_PATH = "http://localhost:8080"
const ELEMENT_PATH = BASE_PATH + "/wine"

export default ({filters}) => {
    let [items, setItems] = useState([])
    useEffect(
        () => {
            console.log("search")
            axios.get(ELEMENT_PATH + filters)
                .then(
                    (result) => {
                        setItems(result.data);
                    },
                    (error) => {
                        console.log("error")
                    }
                )
        }
        , [filters]);

    return (
        <div className="items">
            {items.map(item =>
                <Item item={item} key={item.id}/>
            )}
        </div>
    );
};