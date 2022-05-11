import './CartItem.css';
import {Link} from "react-router-dom";
import checkImg from "../../utils/DefaultImg";
import axios from "axios";
import {useSelector} from "react-redux";

const REMOVE_ICON = "https://cdn-icons.flaticon.com/png/512/3156/premium/3156999.png?token=exp=1651946297~hmac=8af074c78fb677dbcab2a21280293907";

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

    return (
        <div className="cart-item box">
            <div className="cart-item-remove" onClick={removeFromCart}>
                <img src={REMOVE_ICON} alt="Remove icon"/>
            </div>
            <Link to={WINE_PATH + props.item.wine.id}>
                <img className="cart-item-img" src={checkImg(props.item.wine.img)} alt="wine icon"/>
            </Link>
            {descriptions()}
        </div>
    )
}

export default CartItem;