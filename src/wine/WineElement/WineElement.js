import './WineElement.css';
import axios from "axios";
import {useEffect, useState} from "react";
import checkImg from "../../utils/DefaultImg";
import { convertType, convertSweetness } from '../../utils/StringConverter'
import {useSelector} from "react-redux";

const ADD_TO_CART_ICON = "https://cdn-icons.flaticon.com/png/512/5412/premium/5412718.png?token=exp=1651882401~hmac=afe6b60da29d5a7347ddadf003c8cb31";

const BASE_PATH = "http://localhost:8080"
const ELEMENT_PATH = BASE_PATH + "/wine/"
const CART_PATH = BASE_PATH + "/cart"

const WineElement = (props) => {
    const token = useSelector(state => state.jwtToken);
    let [state, setState] = useState({
            error: null,
            isLoaded: false,
            item: []
        }
    )

    useEffect(
        () => {
            axios.get(ELEMENT_PATH + props.id)
                .then(
                    (result) => {
                        setState({
                            ...state,
                            isLoaded: true,
                            item: result.data
                        });
                    },
                    (error) => {
                        setState({
                            ...state,
                            isLoaded: true,
                            error
                        });
                    }
                )
        }, [props]
    );


    const getPrice = () => {
        if (state.item.discount === 0) {
            return (
                <div className="price-container">
                    <h4 className="wine-price price">{state.item.price} грн.</h4>
                </div>);
        } else {
            return (
                <div className="price-container">
                    <h3 className="old-price"> {state.item.price}</h3>
                    <h4 className="wine-price sale">{state.item.priceWithSale} грн.</h4>
                </div>
            )
        }
    }

    const addToCart = () => {
        if (token) {
            axios.put(CART_PATH,
                {
                    wineId: props.id,
                    amount: 1
                },
                {
                    headers: {Authorization: 'Bearer ' + token}
                })
                .finally()
        } else {
            alert("Перед покупками потрібна авторизація")
        }
    }

    if (state.error) {
        return (<p> Error {state.error.message}</p>)
    } else if (!state.isLoaded) {
        return (<p> Зaгрузка....</p>)
    } else {
        return (
            <div className="wine-element">
                <div className="wine-element-item">
                    <div className="wine-img-container">
                        <img className="-wine-img" src={checkImg(state.item.img)} alt="wine logo"/>
                    </div>
                    <div className="descriptions">
                        <h3 id="wine-name" className="item-name">{state.item.name}</h3>
                        <p>Тип напою: {convertType(state.item.type)}</p>
                        <p>Бренд: {state.item.brand.name}</p>
                        <p>Країна: {state.item.land.name}</p>
                        <p>Солодкість: {convertSweetness(state.item.sweetness)}</p>
                        <p>Міцність: {state.item.strength}%</p>
                        <div className="wine-element-button" onClick={addToCart}>
                            <img src={ADD_TO_CART_ICON} alt="Add to cart icon"/>
                        </div>
                        {getPrice()}
                    </div>
                </div>
                <div className="additional-info box">
                    <p>Регіон: {state.item.region}</p>
                    <p>Вміст цукру: {state.item.sugarAmount} гр/л</p>
                    <p>Опис: {state.item.descriptions}</p>
                </div>
            </div>
        );
    }
}

export default WineElement;