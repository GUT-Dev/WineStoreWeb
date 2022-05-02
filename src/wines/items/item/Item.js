import './Item.css';
import {Component} from "react";
import {Link} from "react-router-dom";
import checkImg from "../../../util/DefaultImg";
import axios from "axios";

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

    render() {
        return (
            <div className="item-box">
                <Link className="item" to={WINE_PATH + this.state.id}>
                    <img className="item-img" src={checkImg(this.state.img)} alt="wine icon" />
                    <div className="item-descriptions">
                        <h4 className="item-name">{this.state.name}</h4>
                        <p className="price">{this.state.price} грн</p>
                    </div>
                </Link>
                <button className="item-button" onClick={this.addToCart}>Додати в кошик</button>
            </div>
        );
    }
}