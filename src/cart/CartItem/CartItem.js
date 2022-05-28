import './CartItem.css';
import {Link} from "react-router-dom";
import checkImg from "../../utils/DefaultImg";
import defaultImg from "../../resources/default_img.png";
import removeFromCartIcon from "../../resources/icons/remove_from_cart_icon.png"
import axios from "axios";
import {useSelector} from "react-redux";

const WINE_PATH = "/wine/"
const BASE_PATH = "http://localhost:8080"
const CART_PATH = BASE_PATH + "/cart"

const CartItem  = (props) => {
    const token = useSelector(state => state.jwtToken);

    const checkDiscount = () => {
        if(props.item.wine.discount !== 0) {
            return (
                <p className="cart-item-discount">Знижка: {props.item.wine.discount}%</p>
            );
        }
    }

    const descriptions = () => {
        if(props.item.available) {
            return (
                <div className="cart-item-descriptions">
                    <h4 className="cart-item-name">{props.item.wine.name}</h4>
                    <p className="cart-item-price"> Ціна за 1шт: {props.item.wine.priceWithSale} грн</p>
                    <p>Кількість: {props.item.amount}</p>
                    {checkDiscount()}
                    <p className="cart-item-price">Загальна
                        ціна: {props.item.wine.priceWithSale * props.item.amount} грн</p>
                </div>
            )
        } else {
            return (
                <div className="cart-item-descriptions">
                    <p>Немає в наявності</p>
                </div>
            )
        }
    }

    const removeFromCart = () => {
        axios.delete(CART_PATH + "/" + props.item.id, {
                headers: {Authorization: 'Bearer ' + token}
            }
        )
            .finally()
        props.update();
    }

    function setDefaultImg(event) {
        event.target.src = defaultImg;
    }

    return (
        <div className="cart-item box">
            <div className="cart-item-remove" onClick={removeFromCart}>
                <img src={removeFromCartIcon} alt="Remove icon"/>
            </div>
            <Link to={WINE_PATH + props.item.wine.id}>
                <img onError={setDefaultImg} className="cart-item-img" src={checkImg(props.item.wine.img)} alt="wine icon"/>
            </Link>
            {descriptions()}
        </div>
    )
}

export default CartItem;