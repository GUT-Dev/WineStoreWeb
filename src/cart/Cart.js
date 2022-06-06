import './Cart.css';
import axios from "axios";
import CartItem from "./CartItem/CartItem";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import SuccessModal from "../modals/SuccessModal/SuccessModal";
import ErrorModal from "../modals/ErrorModal/ErrorModal";

const BASE_PATH = "http://localhost:8080"
const ELEMENT_PATH = BASE_PATH + "/cart"
const BUY_PATH = ELEMENT_PATH + "/buy"

const Cart = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [state, setState] = useState({
        error: null,
        isLoaded: false,
        item: null,
        changed: false
    });
    const token = useSelector(state => state.jwtToken);

    useEffect(
        () => {
            if (token != null) {
                axios.get(ELEMENT_PATH, {headers: {Authorization: 'Bearer ' + token}})
                    .then(res => res.data)
                    .then(
                        (result) => {
                            setState({
                                ...state,
                                isLoaded: true,
                                item: result
                            });
                        },
                        (error) => {
                            setState({
                                ...state,
                                isLoaded: true,
                                error
                            });
                        }
                    )
            }
        }, [state.changed]
    );

    const update = () => {
        if (state.changed) {
            setState({...state, changed: false})
        } else {
            setState({...state, changed: true})
        }
    }

    const buy = () => {
        axios.put(BUY_PATH, {}, {headers: {Authorization: 'Bearer ' + token}})
            .then(res => {
                    if (res.status === 200 || res.status === 200) {
                        setModalOpen(true)
                        update();
                    } else {
                        setErrorModalOpen(true)
                    }
                }
            )
    }

    if (state.error) {
        return (<p> Error {state.error.message}</p>)
    } else if (!state.isLoaded) {
        return (<p> Зaгрузка....</p>)
    } else {
        return (
            <div className="cart-items">
                <h1>Корзина</h1>
                {state.item.items.map(item =>
                    <CartItem item={item} update={update.bind(this)} key={item.id}/>
                )}
                <div hidden={state.item.items.length === 0} className="cart-total">
                    <p>Сума: {state.item.totalPrice} грн</p>
                    <p>Сума зі знижкою: {state.item.totalPriceWithSale} грн</p>
                    <p>Загальна знижка: {state.item.totalSalePercent}%</p>
                    <button className="cart-button" onClick={buy}>Купити</button>
                </div>
                <SuccessModal text="Покупка успішна" open={modalOpen} setOpen={setModalOpen}/>
                <ErrorModal open={errorModalOpen} setOpen={setErrorModalOpen}/>
            </div>
        );
    }
}

export default Cart;