import './Cart.css';
import {Component} from "react";
import axios from "axios";
import CartItem from "./CartItem/CartItem";

const BASE_PATH = "http://localhost:8080"
const ELEMENT_PATH = BASE_PATH + "/cart"

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            item: null
        }
    }

    componentDidMount() {
        this.getCart();
    }

    getCart() {
        axios.get(ELEMENT_PATH, {headers: { Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbi50ZXN0QGdtYWlsLmNvbSIsImV4cCI6MTY1MjIxNjQwMH0.WF-4v82ZSQCdq-x4HuSA7BrZWQlGjwFYlYQJZIFjMe6FHgvcmD8a30GxTPz1qIb9au2XLMFYzIDAFFv9GTUrKw`}})
            .then(res => res.data)
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        item: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    buy() {
    }

    render() {
        console.log("render")
        const {error, isLoaded, item} = this.state;
        if (error) {
            return (<p> Error {error.message}</p>)
        } else if (!isLoaded) {
            return (<p> Зaгрузка....</p>)
        } else {
            return (
                <div className="cart-items">
                    <h1>Корзина</h1>
                    {item.items.map(item =>
                        <CartItem item={item} update={this.getCart.bind(this)} key={item.id}/>
                    )}
                    <div className="cart-total">
                        <p>Сума: {item.totalPrice} грн</p>
                        <p>Сума зі знижкою: {item.totalPriceWithSale} грн</p>
                        <p>Загальна знижка: {item.totalSalePercent}%</p>
                        <button className="cart-button" onClick={this.buy()}>Купити</button>
                    </div>
                </div>
            );
        }
    }
}