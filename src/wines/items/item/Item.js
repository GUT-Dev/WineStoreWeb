import './Item.css';
import {Component} from "react";
import {Link} from "react-router-dom";
import checkImg from "../../../utils/DefaultImg";
import axios from "axios";

const ADD_TO_CART_ICON = "https://cdn-icons.flaticon.com/png/512/5412/premium/5412718.png?token=exp=1651882401~hmac=afe6b60da29d5a7347ddadf003c8cb31";

const WINE_PATH = "/wine/"

const BASE_PATH = "http://localhost:8080"
const ELEMENT_PATH = BASE_PATH + "/cart"

export default class Item extends Component {
    constructor(props) {
        super(props);
        this.state = props.item

        this.addToCart = this.addToCart.bind(this)
    }

    addToCart() {
        axios.put(ELEMENT_PATH,
            {
                wineId: this.state.id,
                amount: 1
            },
            {
                headers: { Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbi50ZXN0QGdtYWlsLmNvbSIsImV4cCI6MTY1MjIxNjQwMH0.WF-4v82ZSQCdq-x4HuSA7BrZWQlGjwFYlYQJZIFjMe6FHgvcmD8a30GxTPz1qIb9au2XLMFYzIDAFFv9GTUrKw`}
            })
            .finally()
    }

    getPrice() {
        if(this.state.discount === 0) {
            return (
                <div className="item-price-container">
                    <p className="item-price price">{this.state.price} грн</p>
                </div>
            );
        } else {
            return (
                <div className="item-price-container">
                    <h3 className="item-old-price"> {this.state.price}</h3>
                    <p className="item-price sale">{this.state.priceWithSale} грн</p>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="item-box">
                <Link className="item" to={WINE_PATH + this.state.id}>
                    <img className="item-img" src={checkImg(this.state.img)} alt="wine icon" />
                    <div className="item-descriptions">
                        <h4 className="item-name">{this.state.name}</h4>
                        {this.getPrice()}
                    </div>
                </Link>
                <div className="item-button" onClick={this.addToCart}>
                    <img src={ADD_TO_CART_ICON} alt="Add to cart icon"/>
                </div>
            </div>
        );
    }
}