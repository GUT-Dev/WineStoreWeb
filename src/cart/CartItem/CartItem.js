import './CartItem.css';
import {Component} from "react";
import {Link} from "react-router-dom";
import checkImg from "../../utils/DefaultImg";
import axios from "axios";

const REMOVE_ICON = "https://cdn-icons.flaticon.com/png/512/3156/premium/3156999.png?token=exp=1651946297~hmac=8af074c78fb677dbcab2a21280293907";

const WINE_PATH = "/wine/"
const BASE_PATH = "http://localhost:8080"
const CART_PATH = BASE_PATH + "/cart"

export default class CartItem extends Component {
    constructor(props) {
        super(props);
        this.state = props.item;

        this.removeFromCart = this.removeFromCart.bind(this);
    }

    buy() {
        if(this.state.wine.discount !== 0) {
            return (
                <p className="cart-item-discount">Знижка: {this.state.wine.discount}%</p>
            );
        }
    }

    removeFromCart() {
        axios.delete(CART_PATH + "/" + this.state.id, {
                headers: {Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbi50ZXN0QGdtYWlsLmNvbSIsImV4cCI6MTY1MjIxNjQwMH0.WF-4v82ZSQCdq-x4HuSA7BrZWQlGjwFYlYQJZIFjMe6FHgvcmD8a30GxTPz1qIb9au2XLMFYzIDAFFv9GTUrKw`}
            }
        )
            .finally()
        this.props.update();
    }

    render() {
        return (
            <div className="cart-item box">
                <div className="cart-item-remove" onClick={this.removeFromCart}>
                    <img src={REMOVE_ICON} alt="Remove icon"/>
                </div>
                <Link to={WINE_PATH + this.state.wine.id}>
                    <img className="cart-item-img" src={checkImg(this.state.wine.img)} alt="wine icon"/>
                </Link>
                <div className="cart-item-descriptions">
                    <h4 className="cart-item-name">{this.state.wine.name}</h4>
                    <p className="cart-item-price"> Ціна за 1шт: {this.state.wine.priceWithSale} грн</p>
                    <p>Кількість: {this.state.amount}</p>
                    {this.buy()}
                    <p className="cart-item-price">Загальна ціна: {this.state.wine.priceWithSale * this.state.amount} грн</p>
                </div>
            </div>
        )
    }
}