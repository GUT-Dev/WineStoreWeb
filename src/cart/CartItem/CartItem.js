import './CartItem.css';
import {Component} from "react";
import {Link} from "react-router-dom";
import checkImg from "../../util/DefaultImg";
import axios from "axios";

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
            <div>
                <Link className="cart-item" to={WINE_PATH + this.state.wine.id}>
                    <img className="cart-item-img" src={checkImg(this.state.wine.img)} alt="wine icon"/>
                    <div className="cart-item-descriptions">
                        <h4 className="cart-item-name">{this.state.wine.name}</h4>
                        <p className="cart-item-price"> Ціна за 1шт: {this.state.wine.priceWithSale} грн</p>
                        <p>Кількість: {this.state.amount}</p>
                        {this.buy()}
                        <p className="cart-item-price">Загальна ціна: {this.state.wine.priceWithSale * this.state.amount} грн</p>
                    </div>
                </Link>
                <button className="cart-item-remove" onClick={this.removeFromCart}>Видалити</button>
            </div>
        )
    }
}