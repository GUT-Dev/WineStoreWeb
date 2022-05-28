import './Item.css';
import {Link} from "react-router-dom";
import checkImg from "../../../utils/DefaultImg";
import defaultImg from "../../../resources/default_img.png"
import addToCartIcon from '../../../resources/icons/add_to_cart.png'
import axios from "axios";
import {useSelector} from "react-redux";
import {convertAvailableStatus} from "../../../utils/StringConverter";

const WINE_PATH = "/wine/"

const BASE_PATH = "http://localhost:8080"
const ELEMENT_PATH = BASE_PATH + "/cart"

const Item = (props) => {
    const token = useSelector(state => state.jwtToken);

    const addToCart = () => {
        if(token) {
            axios.put(ELEMENT_PATH,
                {
                    wineId: props.item.id,
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
        if(!props.item.available) {
            return (
                <div className="item-price-container">
                    <p className="item-price-unavailable">{convertAvailableStatus(props.item.availableStatus)}</p>
                </div>
            );
        }
        if(props.item.discount === 0) {
            return (
                <div className="item-price-container">
                    <p className="item-price price">{props.item.price} грн</p>
                </div>
            );
        } else {
            return (
                <div className="item-price-container">
                    <h3 className="item-old-price"> {props.item.price}</h3>
                    <p className="item-price sale">{props.item.priceWithSale} грн</p>
                </div>
            );
        }
    }

    const getButton = () => {
        if(props.item.available) {
            return (
                <div className="item-button" onClick={addToCart}>
                    <img src={addToCartIcon} alt="Add to cart icon"/>
                </div>
            );
        }
    }

    const getRating = () => {
        const rating = props.item.rating;
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

    const getStar = (isChecked) => {
        if (isChecked) {
            return (<span className="fa fa-star checked-star"/>);
        } else {
            return (<span className="fa fa-star unchecked-star"/>);
        }
    }

    function setDefaultImg(event) {
        event.target.src = defaultImg;
    }

    return (
        <div className="item-box">
            <Link className="item" to={WINE_PATH + props.item.id}>
                {getRating()}
                <img onError={setDefaultImg} className="item-img" src={checkImg(props.item.img)} alt="wine icon"/>
                <div className="item-descriptions">
                    <h4 className="item-name">{props.item.name}</h4>
                    {getPrice()}
                </div>
            </Link>
            {getButton()}
        </div>
    );
}

export default Item;