import './Item.css';
import {Link} from "react-router-dom";
import checkImg from "../../../utils/DefaultImg";
// @ts-ignore
import defaultImg from "../../../resources/default_img.png"
// @ts-ignore
import addToCartIcon from '../../../resources/icons/add_to_cart.png'
import axios from "axios";
import {useSelector} from "react-redux";
import {convertAvailableStatus} from "../../../utils/StringConverter";
import React, {SyntheticEvent} from "react";
import {WineTable} from "../../../model/wine/Products";

const WINE_PATH = "/wine/"

const BASE_PATH = "http://localhost:8080"
const ELEMENT_PATH = BASE_PATH + "/cart"

// @ts-ignore
const Item = ({item}: {item : WineTable}) => {
    // @ts-ignore
    const token = useSelector(state => state.jwtToken);

    const addToCart = () => {
        if(token) {
            axios.put(ELEMENT_PATH,
                {
                    wineId: item.id,
                    amount: 1
                },
                {
                    headers: { Authorization: 'Bearer ' + token}
                })
                .finally()
        } else {
            alert("Перед покупками потрібна авторизація")
        }
    }

    const getPrice = () => {
        if(!item.available) {
            return (
                <div className="item-price-container">
                    <p className="item-price-unavailable">{convertAvailableStatus(item.availableStatus)}</p>
                </div>
            );
        }
        if(item.discount === 0) {
            return (
                <div className="item-price-container">
                    <p className="item-price price">{item.price} грн</p>
                </div>
            );
        } else {
            return (
                <div className="item-price-container">
                    <h3 className="item-old-price"> {item.price}</h3>
                    <p className="item-price sale">{item.priceWithSale} грн</p>
                </div>
            );
        }
    }

    const getButton = () => {
        if(item.available) {
            return (
                <div className="item-button" onClick={addToCart}>
                    <img src={addToCartIcon} alt="Add to cart icon"/>
                </div>
            );
        }
    }

    const getRating = () => {
        const rating = item.rating;
        return (
            <div className="item-rating">
                {getStar(rating > 0)}
                {getStar(rating > 1)}
                {getStar(rating > 2)}
                {getStar(rating > 3)}
                {getStar(rating > 4)}
            </div>
        )
    }

    const getStar = (isChecked: boolean) => {
        if (isChecked) {
            return (<span className="fa fa-star checked-star"/>);
        } else {
            return (<span className="fa fa-star unchecked-star"/>);
        }
    }

    const setDefaultImg = (event : SyntheticEvent<HTMLImageElement, Event>) => {
        // @ts-ignore
        event.target.src = defaultImg;
    }

    return (
        <div className="item-container box" style={item.visible ? undefined : {border: "red 2px solid"}}>
            {item.visible ? null : (
                <div className="not-available label">
                    <p>Приховано</p>
                </div>
            )}
            <Link className="item" to={WINE_PATH + item.id}>
                {getRating()}
                <img onError={setDefaultImg} className="item-img" src={checkImg(item.img)} alt="wine icon"/>
                <div className="item-descriptions">
                    <h4 className="item-name">{item.name}</h4>
                    {getPrice()}
                </div>
            </Link>
            {getButton()}
        </div>
    );
}

export default Item;