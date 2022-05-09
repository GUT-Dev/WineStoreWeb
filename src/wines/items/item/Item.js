import './Item.css';
import {Link} from "react-router-dom";
import checkImg from "../../../utils/DefaultImg";
import axios from "axios";
import {useSelector} from "react-redux";

const ADD_TO_CART_ICON = "https://cdn-icons.flaticon.com/png/512/5412/premium/5412718.png?token=exp=1651882401~hmac=afe6b60da29d5a7347ddadf003c8cb31";

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

        return (
            <div className="item-box">
                <Link className="item" to={WINE_PATH + props.item.id}>
                    <img className="item-img" src={checkImg(props.item.img)} alt="wine icon" />
                    <div className="item-descriptions">
                        <h4 className="item-name">{props.item.name}</h4>
                        {getPrice()}
                    </div>
                </Link>
                <div className="item-button" onClick={addToCart}>
                    <img src={ADD_TO_CART_ICON} alt="Add to cart icon"/>
                </div>
            </div>
        );
}

export default Item;